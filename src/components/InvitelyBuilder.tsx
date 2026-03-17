import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  cardClasses,
  occasionDefaults,
  occasionTabs,
  templates,
  thumbClasses,
} from "./InvitelyBuilder.constants";
import { CardContent } from "./InvitelyBuilder.CardContent";
import { TextField } from "./InvitelyBuilder.TextField";
import {
  createInviteId,
  getInviteUrl,
  saveInvite,
  serializeInvite,
} from "#/lib/invite-share";
import { saveCurrentUserCard } from "#/lib/card";
import type { CurrentUserCardResult } from "#/lib/card";
import type { Fields, Occasion, Template } from "./InvitelyBuilder.types";

const TOAST_DURATION_MS = 2800;
const CARD_AUTOSAVE_DELAY_MS = 700;
const CARD_AUTOSAVE_RETRY_MS = 3000;

type InvitelyBuilderProps = {
  initialUserCard: CurrentUserCardResult;
};

export default function InvitelyBuilder({
  initialUserCard,
}: InvitelyBuilderProps) {
  const navigate = useNavigate();
  const persistCurrentUserCard = useServerFn(saveCurrentUserCard);
  const [currentTpl, setCurrentTpl] = useState<Template>(
    initialUserCard.card?.template ?? "elegant",
  );
  const [currentOccasion, setCurrentOccasion] = useState<Occasion>(
    initialUserCard.card?.occasion ?? "birthday",
  );
  const [fields, setFields] = useState<Fields>(
    initialUserCard.card?.fields ?? occasionDefaults.birthday,
  );
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);
  const canSaveCard = initialUserCard.canSave;
  const [cardSaveStatus, setCardSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >(initialUserCard.card ? "saved" : "idle");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(
    initialUserCard.card?.updatedAt ?? null,
  );
  const toastTimeoutRef = useRef<number | null>(null);

  const saveCardDraft = useCallback(() => {
    setCardSaveStatus("saving");

    return persistCurrentUserCard({
      data: {
        template: currentTpl,
        occasion: currentOccasion,
        fields,
      },
    })
      .then((result) => {
        if (result.saved && result.card?.updatedAt) {
          setLastSavedAt(result.card.updatedAt);
          setCardSaveStatus("saved");
          return;
        }

        if (
          result.reason === "no-session" ||
          result.reason === "db-write-failed"
        ) {
          setCardSaveStatus("idle");
          return;
        }

        setCardSaveStatus("error");
      })
      .catch(() => {
        setCardSaveStatus("error");
      });
  }, [currentOccasion, currentTpl, fields, persistCurrentUserCard]);

  const clearToastTimer = () => {
    if (!toastTimeoutRef.current) {
      return;
    }

    window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = null;
  };

  useEffect(() => {
    return () => {
      clearToastTimer();
    };
  }, []);

  useEffect(() => {
    if (!canSaveCard) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveCardDraft();
    }, CARD_AUTOSAVE_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [canSaveCard, saveCardDraft]);

  useEffect(() => {
    if (!canSaveCard || cardSaveStatus !== "error") {
      return;
    }

    const retryTimeoutId = window.setTimeout(() => {
      void saveCardDraft();
    }, CARD_AUTOSAVE_RETRY_MS);

    return () => {
      window.clearTimeout(retryTimeoutId);
    };
  }, [canSaveCard, cardSaveStatus, saveCardDraft]);

  const onFieldChange = (field: keyof Fields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const onOccasionSelect = (occasion: Occasion) => {
    setCurrentOccasion(occasion);
    setFields(occasionDefaults[occasion]);
  };

  const presentToast = (message: string) => {
    clearToastTimer();

    setToast(message);
    setShowToast(true);
    toastTimeoutRef.current = window.setTimeout(() => {
      setShowToast(false);
    }, TOAST_DURATION_MS);
  };

  const persistCurrentInvite = () => {
    const inviteId = createInviteId();
    const invitePayload = {
      template: currentTpl,
      fields,
      createdAt: new Date().toISOString(),
    };

    saveInvite(inviteId, invitePayload);

    return {
      inviteId,
      serializedInvite: serializeInvite(invitePayload),
    };
  };

  const openPrintView = () => {
    const { inviteId, serializedInvite } = persistCurrentInvite();

    navigate({
      to: "/invite/$inviteId",
      params: { inviteId },
      search: { data: serializedInvite ?? undefined },
    });
  };

  const copyInviteLink = async () => {
    const { inviteId, serializedInvite } = persistCurrentInvite();
    const inviteUrl = getInviteUrl(inviteId, serializedInvite);

    try {
      await navigator.clipboard.writeText(inviteUrl);
      presentToast("Invite link copied — open it to print or save as PDF");
    } catch {
      presentToast(
        "Could not copy automatically. Open print view and copy URL.",
      );
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f0e8] font-['DM_Sans'] text-[#1a1612]">
      {/* <section className="px-4 pb-10 pt-14 text-center sm:px-8">
        <div className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#c9a84c]">
          Free · No account needed · Instant download
        </div>
        <h1 className="mx-auto mb-4 max-w-[700px] font-['Playfair_Display'] text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] font-black text-[#1a1612]">
          Invites that set
          <br />
          the <em className="italic text-[#b85c38]">tone</em>
        </h1>
        <p className="mx-auto max-w-[420px] text-base leading-[1.6] font-light text-[#8c7b6b]">
          Beautiful invite cards for any occasion. Pick a template, fill in your
          details, done.
        </p>
      </section> */}

      <div className="mt-2 flex justify-center overflow-x-auto border-b border-[rgba(74,55,40,0.15)] px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8">
        {occasionTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`mb-[-1px] whitespace-nowrap border-b-2 px-5 py-3.5 text-[0.78rem] tracking-[0.05em] transition ${
              currentOccasion === tab.key
                ? "border-b-[#b85c38] font-medium text-[#b85c38]"
                : "border-b-transparent text-[#8c7b6b] hover:text-[#4a3728]"
            }`}
            onClick={() => onOccasionSelect(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mx-auto grid min-h-[70vh] max-w-[1400px] grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[300px_1fr_280px]">
        <aside className="border-b border-[rgba(74,55,40,0.12)] p-6 md:border-b-0 md:border-r">
          <div className="mb-4 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#8c7b6b]">
            Choose a style
          </div>
          <div className="flex flex-col gap-2.5">
            {templates.map((tpl) => (
              <button
                key={tpl.key}
                type="button"
                onClick={() => setCurrentTpl(tpl.key)}
                className={`relative overflow-hidden border-2 bg-white text-left transition ${
                  currentTpl === tpl.key
                    ? "border-[#b85c38]"
                    : "border-[rgba(74,55,40,0.12)] hover:border-[rgba(201,168,76,0.5)]"
                }`}
              >
                {currentTpl === tpl.key ? (
                  <span className="absolute right-[7px] top-[6px] z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#b85c38] text-[0.55rem] font-bold text-white">
                    ✓
                  </span>
                ) : null}
                <div
                  className={`flex h-[72px] items-center justify-center px-3 text-center text-[0.72rem] font-medium tracking-[0.06em] ${thumbClasses[tpl.key]}`}
                >
                  {tpl.thumb}
                </div>
                <div className="flex items-center justify-between bg-white px-3 py-2 text-[0.68rem] font-medium text-[#8c7b6b]">
                  {tpl.name}
                  {tpl.tag ? (
                    <span className="bg-[rgba(201,168,76,0.12)] px-1.5 py-0.5 text-[0.52rem] uppercase tracking-[0.1em] text-[#c9a84c]">
                      {tpl.tag}
                    </span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="flex flex-col items-center justify-center bg-[linear-gradient(0deg,transparent,transparent_39px,rgba(74,55,40,0.04)_39px,rgba(74,55,40,0.04)_40px),linear-gradient(90deg,transparent,transparent_39px,rgba(74,55,40,0.04)_39px,rgba(74,55,40,0.04)_40px)] p-6 md:p-8">
          <div
            key={currentTpl}
            className="drop-shadow-[0_20px_60px_rgba(26,22,18,0.2)]"
          >
            <div className={`${cardClasses[currentTpl]} max-w-[92vw]`}>
              <CardContent currentTpl={currentTpl} fields={fields} />
            </div>
          </div>
          {canSaveCard && (
            <div className="mt-4 text-center text-[0.65rem] tracking-[0.08em] text-[#8c7b6b]/70">
            Your card updates live as you type
          </div>
          )}
          {canSaveCard ? (
            <div className="mt-2 text-center text-[0.68rem] text-[#8c7b6b]">
              {cardSaveStatus === "saving"
                ? "Saving changes..."
                : cardSaveStatus === "saved"
                  ? `Saved${lastSavedAt ? ` · ${new Date(lastSavedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : ""}`
                  : cardSaveStatus === "error"
                    ? "Syncing your progress..."
                    : "Signed in: your progress saves automatically."}
            </div>
          ) : null}
        </section>

        <aside className="border-t border-[rgba(74,55,40,0.12)] p-6 md:col-span-2 lg:col-span-1 lg:border-l lg:border-t-0">
          <div className="mb-3 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#8c7b6b]">
            Event
          </div>
          <TextField
            id="f-title"
            label="Event Title"
            value={fields.title}
            maxLength={40}
            onChange={(value) => onFieldChange("title", value)}
          />
          <TextField
            id="f-host"
            label="Hosted by"
            value={fields.host}
            maxLength={50}
            onChange={(value) => onFieldChange("host", value)}
          />

          <div className="mb-3">
            <label
              htmlFor="f-subtitle"
              className="mb-1 block text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[#8c7b6b]"
            >
              Subtitle
            </label>
            <textarea
              id="f-subtitle"
              value={fields.subtitle}
              maxLength={80}
              onChange={(event) =>
                onFieldChange("subtitle", event.target.value)
              }
              className="h-[58px] w-full resize-none border border-[rgba(74,55,40,0.2)] bg-white px-3 py-2 text-[0.88rem] leading-[1.5] text-[#1a1612] outline-none transition focus:border-[#c9a84c]"
            />
          </div>

          <div className="my-5 h-px bg-[rgba(74,55,40,0.1)]" />
          <div className="mb-3 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#8c7b6b]">
            Details
          </div>
          <TextField
            id="f-date"
            label="Date"
            value={fields.date}
            maxLength={40}
            onChange={(value) => onFieldChange("date", value)}
          />
          <TextField
            id="f-time"
            label="Time"
            value={fields.time}
            maxLength={30}
            onChange={(value) => onFieldChange("time", value)}
          />
          <TextField
            id="f-location"
            label="Location"
            value={fields.location}
            maxLength={50}
            onChange={(value) => onFieldChange("location", value)}
          />
          <TextField
            id="f-dress"
            label="Dress Code"
            value={fields.dress}
            maxLength={30}
            onChange={(value) => onFieldChange("dress", value)}
          />

          <div className="my-5 h-px bg-[rgba(74,55,40,0.1)]" />
          <div className="mb-3 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#8c7b6b]">
            RSVP
          </div>
          <TextField
            id="f-rsvp"
            label="RSVP to"
            value={fields.rsvp}
            maxLength={60}
            onChange={(value) => onFieldChange("rsvp", value)}
          />

          <button
            type="button"
            onClick={openPrintView}
            className="mt-5 w-full bg-[#b85c38] px-3 py-3.5 text-[0.82rem] font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[#9a4a28]"
          >
            Open Print View
          </button>
          <button
            type="button"
            onClick={copyInviteLink}
            className="mt-2 w-full border border-[rgba(74,55,40,0.3)] bg-transparent px-3 py-3.5 text-[0.82rem] font-medium uppercase tracking-[0.08em] text-[#4a3728] transition hover:border-[#4a3728] hover:bg-[rgba(74,55,40,0.04)]"
          >
            ⤢ Copy invite link
          </button>
        </aside>
      </div>

      <div
        className={`pointer-events-none fixed bottom-8 left-1/2 z-[999] -translate-x-1/2 bg-[#1a1612] px-6 py-2.5 text-[0.78rem] tracking-[0.05em] text-[#f5f0e8] transition-all duration-300 ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {toast}
      </div>
    </main>
  );
}
