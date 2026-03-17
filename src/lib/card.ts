import type {
  Fields,
  Occasion,
  Template,
} from "#/components/InvitelyBuilder.types";
import { db } from "#/db/index";
import { user } from "#/db/schema";
import { auth } from "#/lib/auth";
import { eq } from "drizzle-orm";
import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";

const templateSchema = z.enum([
  "elegant",
  "minimal",
  "bold",
  "whimsy",
  "botanical",
  "editorial",
]);

const occasionSchema = z.enum([
  "birthday",
  "wedding",
  "dinner",
  "baby",
  "corporate",
  "graduation",
]);

const fieldsSchema = z.object({
  title: z.string(),
  host: z.string(),
  subtitle: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  dress: z.string(),
  rsvp: z.string(),
});

const cardDraftSchema = z.object({
  template: templateSchema,
  occasion: occasionSchema,
  fields: fieldsSchema,
});

const savedCardSchema = cardDraftSchema.extend({
  updatedAt: z.string(),
});

export type CardDraft = {
  template: Template;
  occasion: Occasion;
  fields: Fields;
};

export type SavedCard = CardDraft & {
  updatedAt: string;
};

export type CurrentUserCardResult = {
  card: SavedCard | null;
  canSave: boolean;
};

async function getCurrentSession() {
  try {
    const request = getRequest();
    const headers =
      request?.headers ?? new Headers(getRequestHeaders() as HeadersInit);

    return await auth.api.getSession({
      headers,
    });
  } catch {
    return null;
  }
}

async function getCurrentUserRecord() {
  const session = await getCurrentSession();

  if (!session?.user?.id || !session.user.email) {
    return null;
  }

  let currentUser = await db.query.user.findFirst({
    columns: {
      id: true,
      card: true,
    },
    where: (table, { eq, or }) =>
      or(eq(table.id, session.user.id), eq(table.email, session.user.email)),
  });

  if (!currentUser) {
    await db
      .insert(user)
      .values({
        id: session.user.id,
        name: session.user.name ?? session.user.email,
        email: session.user.email,
        emailVerified: Boolean(session.user.emailVerified),
        image: session.user.image,
        card: null,
      })
      .onConflictDoNothing({
        target: user.id,
      });

    currentUser = await db.query.user.findFirst({
      columns: {
        id: true,
        card: true,
      },
      where: (table, { eq, or }) =>
        or(eq(table.id, session.user.id), eq(table.email, session.user.email)),
    });

    if (!currentUser) {
      return null;
    }
  }

  return {
    session,
    currentUser,
  };
}

export const getCurrentUserCard = createServerFn({
  method: "GET",
}).handler(async (ctx) => {
  void ctx;
  const userRecord = await getCurrentUserRecord();

  if (!userRecord) {
    return {
      card: null,
      canSave: false,
    } satisfies CurrentUserCardResult;
  }

  const parsedCard = savedCardSchema.safeParse(userRecord.currentUser.card);

  return {
    card: parsedCard.success ? parsedCard.data : null,
    canSave: true,
  } satisfies CurrentUserCardResult;
});

export const saveCurrentUserCard = createServerFn({
  method: "POST",
})
  .inputValidator((data: CardDraft) => cardDraftSchema.parse(data))
  .handler(async (ctx) => {
    const userRecord = await getCurrentUserRecord();

    if (!userRecord) {
      return {
        saved: false,
        card: null,
        reason: "no-session",
      } as const;
    }

    const nextCard = {
      ...ctx.data,
      updatedAt: new Date().toISOString(),
    } satisfies SavedCard;

    let updatedRows: Array<{ id: string }> = [];

    try {
      updatedRows = await db
        .update(user)
        .set({
          card: nextCard,
        })
        .where(eq(user.id, userRecord.currentUser.id))
        .returning({
          id: user.id,
        });
    } catch {
      return {
        saved: false,
        card: null,
        reason: "db-write-failed",
      } as const;
    }

    if (updatedRows.length === 0) {
      return {
        saved: false,
        card: null,
        reason: "no-row-updated",
      } as const;
    }

    return {
      saved: true,
      card: nextCard,
      reason: null,
    } as const;
  });
