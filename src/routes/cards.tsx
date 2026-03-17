import { CardContent } from "#/components/InvitelyBuilder.CardContent";
import { cardClasses } from "#/components/InvitelyBuilder.constants";
import { getCurrentUserCard } from "#/lib/card";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cards")({
  component: CardsPage,
  loader: async () => {
    return await getCurrentUserCard();
  },
});

function CardsPage() {
  const { canSave, card } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-[#f5f0e8] px-4 py-10 text-[#1a1612] sm:px-8">
      <section className="mx-auto w-full max-w-[980px]">
        <p className="mb-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#c9a84c]">
          Account cards
        </p>
        <h1 className="font-['Playfair_Display'] text-4xl font-black sm:text-5xl">
          My saved card
        </h1>
        <p className="mt-3 max-w-[560px] text-sm leading-6 text-[#8c7b6b]">
          This page shows the latest card draft saved to your account while you
          edit in the builder.
        </p>

        {!canSave ? (
          <div className="mt-8 border border-[rgba(74,55,40,0.15)] bg-white p-6">
            <p className="text-sm text-[#4a3728]">
              Sign in to view cards saved to your account.
            </p>
            <div className="mt-4 flex gap-3">
              <Link to="/login">
                <button
                  className="bg-[#1a1612] px-4 py-2 text-[0.8rem] font-medium tracking-[0.05em] text-[#f5f0e8] transition hover:bg-[#4a3728]"
                  type="button"
                >
                  Sign in
                </button>
              </Link>
              <Link to="/">
                <button
                  className="border border-[rgba(74,55,40,0.25)] bg-transparent px-4 py-2 text-[0.8rem] font-medium tracking-[0.05em] text-[#8c7b6b] transition hover:border-[#4a3728] hover:text-[#4a3728]"
                  type="button"
                >
                  Back to builder
                </button>
              </Link>
            </div>
          </div>
        ) : !card ? (
          <div className="mt-8 border border-[rgba(74,55,40,0.15)] bg-white p-6">
            <p className="text-sm text-[#4a3728]">
              You don’t have a saved card yet. Start editing and your progress
              will appear here automatically.
            </p>
            <div className="mt-4">
              <Link to="/">
                <button
                  className="bg-[#1a1612] px-4 py-2 text-[0.8rem] font-medium tracking-[0.05em] text-[#f5f0e8] transition hover:bg-[#4a3728]"
                  type="button"
                >
                  Open builder
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <div className="mb-4 text-[0.76rem] font-medium uppercase tracking-[0.1em] text-[#8c7b6b]">
              Last saved: {new Date(card.updatedAt).toLocaleString()}
            </div>
            <div className="max-w-[92vw] drop-shadow-[0_20px_60px_rgba(26,22,18,0.2)]">
              <div className={cardClasses[card.template]}>
                <CardContent currentTpl={card.template} fields={card.fields} />
              </div>
            </div>
            <div className="mt-6">
              <Link to="/builder">
                <button
                  className="bg-[#b85c38] px-4 py-2 text-[0.8rem] font-medium tracking-[0.05em] text-white transition hover:bg-[#9a4a28]"
                  type="button"
                >
                  Continue editing
                </button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
