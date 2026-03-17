import { CardContent } from "#/components/InvitelyBuilder.CardContent";
import { cardClasses } from "#/components/InvitelyBuilder.constants";
import { deserializeInvite, getInvite, saveInvite } from "#/lib/invite-share";
import { createFileRoute, Link } from "@tanstack/react-router";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/invite/$inviteId")({
  component: InvitePage,
  errorComponent: InviteRouteError,
  validateSearch: (search: Record<string, unknown>) => ({
    data: typeof search.data === "string" ? search.data : undefined,
  }),
});

function InvitePage() {
  const { inviteId } = Route.useParams();
  const { data } = Route.useSearch();
  const [invite, setInvite] = useState<
    ReturnType<typeof getInvite> | undefined
  >(undefined);
  const [isDownloading, setIsDownloading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const cardRef = useRef<HTMLDivElement | null>(null);

  const triggerDownload = (dataUrl: string) => {
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = `invitely-${inviteId}.png`;
    anchor.click();
  };

  const exportWithHtml2Canvas = async (element: HTMLDivElement) => {
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    const rect = element.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    const sandbox = document.createElement("div");
    sandbox.style.position = "fixed";
    sandbox.style.left = "-10000px";
    sandbox.style.top = "0";
    sandbox.style.margin = "0";
    sandbox.style.padding = "0";

    const clone = element.cloneNode(true) as HTMLDivElement;
    clone.style.margin = "0";
    clone.style.maxWidth = "none";
    clone.style.width = `${width}px`;
    clone.style.minHeight = `${height}px`;
    clone.style.boxShadow = "none";

    sandbox.appendChild(clone);
    document.body.appendChild(sandbox);

    try {
      const canvas = await html2canvas(clone, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
        width,
        height,
      });

      return canvas.toDataURL("image/png");
    } finally {
      sandbox.remove();
    }
  };

  useEffect(() => {
    const storedInvite = getInvite(inviteId);

    if (storedInvite) {
      setInvite(storedInvite);
      return;
    }

    if (!data) {
      setInvite(null);
      return;
    }

    const deserializedInvite = deserializeInvite(data);

    if (!deserializedInvite) {
      setInvite(null);
      return;
    }

    saveInvite(inviteId, deserializedInvite);
    setInvite(deserializedInvite);
  }, [data, inviteId]);

  const downloadPng = async () => {
    if (!cardRef.current || isDownloading || !invite) {
      return;
    }

    setIsDownloading(true);
    setStatusMessage("");

    try {
      if (typeof document !== "undefined" && "fonts" in document) {
        await document.fonts.ready;
      }

      const dataUrl = await exportWithHtml2Canvas(cardRef.current);

      triggerDownload(dataUrl);

      setStatusMessage("PNG downloaded");
    } catch (error) {
      const details = error instanceof Error ? ` (${error.message})` : "";
      setStatusMessage(`Could not generate PNG${details}`);
    } finally {
      setIsDownloading(false);
    }
  };

  if (invite === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f0e8] font-['DM_Sans'] text-[#8c7b6b]">
        Loading invite...
      </main>
    );
  }

  if (!invite) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f5f0e8] px-6 text-center font-['DM_Sans']">
        <h1 className="font-['Playfair_Display'] text-3xl text-[#1a1612]">
          Invite not found
        </h1>
        <p className="max-w-md text-[#8c7b6b]">
          This link may be expired or was created in a different browser.
        </p>
        <Link
          to="/"
          className="bg-[#1a1612] px-5 py-2.5 text-[0.8rem] font-medium tracking-[0.05em] text-[#f5f0e8] transition hover:bg-[#4a3728]"
        >
          Back to Builder
        </Link>
      </main>
    );
  }

  return (
    <main className="invite-print-shell min-h-screen bg-[#f5f0e8] px-4 py-8 font-['DM_Sans'] text-[#1a1612] sm:px-8 print:bg-white print:p-0">
      <div className="mx-auto max-w-[1100px] print:max-w-none">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            to="/"
            className="border border-[rgba(74,55,40,0.25)] bg-transparent px-4 py-2 text-[0.8rem] font-medium tracking-[0.05em] text-[#8c7b6b] transition hover:border-[#4a3728] hover:text-[#4a3728]"
          >
            Back to Builder
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={downloadPng}
              disabled={isDownloading}
              className="border border-[rgba(74,55,40,0.25)] bg-transparent px-4 py-2 text-[0.8rem] font-medium tracking-[0.05em] text-[#8c7b6b] transition hover:border-[#4a3728] hover:text-[#4a3728] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDownloading ? "Generating PNG..." : "Download PNG"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="bg-[#1a1612] px-4 py-2 text-[0.8rem] font-medium tracking-[0.05em] text-[#f5f0e8] transition hover:bg-[#4a3728]"
            >
              Print / Save PDF
            </button>
          </div>
        </div>

        {statusMessage ? (
          <div className="mb-4 text-right text-[0.76rem] uppercase tracking-[0.08em] text-[#8c7b6b] print:hidden">
            {statusMessage}
          </div>
        ) : null}

        <div className="flex justify-center print:min-h-screen print:items-center print:pt-0">
          <div
            ref={cardRef}
            className={`${cardClasses[invite.template]} invite-print-card max-w-[92vw] shadow-[0_20px_60px_rgba(26,22,18,0.2)] print:mx-auto print:shadow-none print:break-inside-avoid print:[page-break-inside:avoid]`}
          >
            <CardContent currentTpl={invite.template} fields={invite.fields} />
          </div>
        </div>
      </div>
    </main>
  );
}

function InviteRouteError() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f5f0e8] px-6 text-center font-['DM_Sans']">
      <h1 className="font-['Playfair_Display'] text-3xl text-[#1a1612]">
        Something went wrong
      </h1>
      <p className="max-w-md text-[#8c7b6b]">
        We couldn&apos;t render this invite. Please return to the builder and
        create a new link.
      </p>
      <Link
        to="/"
        className="bg-[#1a1612] px-5 py-2.5 text-[0.8rem] font-medium tracking-[0.05em] text-[#f5f0e8] transition hover:bg-[#4a3728]"
      >
        Back to Builder
      </Link>
    </main>
  );
}
