import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <main className="min-h-screen bg-[#f5f0e8] px-4 py-14 text-[#1a1612] sm:px-8">
      <section className="mx-auto max-w-[980px] border border-[rgba(74,55,40,0.14)] bg-[#f8f3eb] p-6 sm:p-10">
        <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-[#c9a84c]">
          About Invitely
        </p>
        <h1 className="font-['Playfair_Display'] text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.08] font-black">
          Invitations that feel
          <span className="text-[#b85c38]"> personal</span>,
          <br className="hidden sm:block" />
          polished, and easy to share.
        </h1>
        <p className="mt-5 max-w-[700px] text-[1.02rem] leading-7 text-[#8c7b6b]">
          Invitely helps you design beautiful event cards in minutes. Pick a
          style, tailor every detail, and keep your draft saved to your account
          as you edit.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="border border-[rgba(74,55,40,0.14)] bg-white p-4">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[#8c7b6b]">
              Designed fast
            </p>
            <p className="mt-2 text-sm leading-6 text-[#4a3728]">
              Choose from curated templates for birthdays, weddings, dinners,
              baby showers, corporate events, and graduations.
            </p>
          </div>
          <div className="border border-[rgba(74,55,40,0.14)] bg-white p-4">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[#8c7b6b]">
              Saved for you
            </p>
            <p className="mt-2 text-sm leading-6 text-[#4a3728]">
              When you are signed in, your card progress automatically saves to
              your account so you can pick up where you left off.
            </p>
          </div>
          <div className="border border-[rgba(74,55,40,0.14)] bg-white p-4">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[#8c7b6b]">
              Ready to share
            </p>
            <p className="mt-2 text-sm leading-6 text-[#4a3728]">
              Open print view or copy a shareable invite link and send it to
              guests right away.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/">
            <button
              type="button"
              className="bg-[#1a1612] px-5 py-2.5 text-[0.82rem] font-medium tracking-[0.05em] text-[#f5f0e8] transition hover:bg-[#4a3728]"
            >
              Open Builder
            </button>
          </Link>
          <Link to="/login">
            <button
              type="button"
              className="border border-[rgba(74,55,40,0.25)] bg-transparent px-5 py-2.5 text-[0.82rem] font-medium tracking-[0.05em] text-[#8c7b6b] transition hover:border-[#4a3728] hover:text-[#4a3728]"
            >
              Sign in
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
