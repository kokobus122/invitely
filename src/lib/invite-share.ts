import type { Fields, Template } from "#/components/InvitelyBuilder.types";

const INVITE_STORAGE_PREFIX = "invitely:invite:";

export type StoredInvite = {
  template: Template;
  fields: Fields;
  createdAt: string;
};

const validTemplates: Template[] = [
  "elegant",
  "minimal",
  "bold",
  "whimsy",
  "botanical",
  "editorial",
];

function encodeBase64(value: string) {
  if (typeof window === "undefined" || typeof window.btoa !== "function") {
    return null;
  }

  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window.btoa(binary);
}

function decodeBase64(value: string) {
  if (typeof window === "undefined" || typeof window.atob !== "function") {
    return null;
  }

  const binary = window.atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new TextDecoder().decode(bytes);
}

function isFields(value: unknown): value is Fields {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.title === "string" &&
    typeof record.host === "string" &&
    typeof record.subtitle === "string" &&
    typeof record.date === "string" &&
    typeof record.time === "string" &&
    typeof record.location === "string" &&
    typeof record.dress === "string" &&
    typeof record.rsvp === "string"
  );
}

function isStoredInvite(value: unknown): value is StoredInvite {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.createdAt === "string" &&
    typeof record.template === "string" &&
    validTemplates.includes(record.template as Template) &&
    isFields(record.fields)
  );
}

export function createInviteId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `invite-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getStorageKey(inviteId: string) {
  return `${INVITE_STORAGE_PREFIX}${inviteId}`;
}

export function saveInvite(inviteId: string, invite: StoredInvite) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      getStorageKey(inviteId),
      JSON.stringify(invite),
    );
  } catch {
    return;
  }
}

export function serializeInvite(invite: StoredInvite) {
  try {
    const json = JSON.stringify(invite);

    return encodeBase64(json);
  } catch {
    return null;
  }
}

export function deserializeInvite(serializedInvite: string) {
  try {
    const json = decodeBase64(serializedInvite);

    if (!json) {
      return null;
    }

    const parsedValue = JSON.parse(json);

    if (!isStoredInvite(parsedValue)) {
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
}

export function getInvite(inviteId: string) {
  if (typeof window === "undefined") {
    return null;
  }

  let rawValue: string | null = null;

  try {
    rawValue = window.localStorage.getItem(getStorageKey(inviteId));
  } catch {
    return null;
  }

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue);

    if (!isStoredInvite(parsedValue)) {
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
}

export function getInviteUrl(
  inviteId: string,
  serializedInvite?: string | null,
) {
  const pathname = `/invite/${inviteId}`;
  const search = serializedInvite
    ? `?data=${encodeURIComponent(serializedInvite)}`
    : "";

  if (typeof window === "undefined") {
    return `${pathname}${search}`;
  }

  return `${window.location.origin}${pathname}${search}`;
}
