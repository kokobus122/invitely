import { Link } from "@tanstack/react-router";

const riseIn = (delayMs = 0) => ({
  animation: "rise-in 650ms cubic-bezier(0.22, 1, 0.36, 1) both",
  animationDelay: `${delayMs}ms`,
});

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#f5f0e8] text-[#1a1612]">
      <div className="mx-auto max-w-[1300px] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.06fr]">
          <div className="max-w-[620px]">
            <h1
              style={riseIn()}
              className="font-['Playfair_Display'] text-[clamp(2.25rem,5.8vw,4.2rem)] leading-[1.02] font-bold tracking-[-0.02em] text-[#1a1612]"
            >
              Celebrate life’s moments
              <br />
              with an <span className="text-[#b85c38]">invitation</span>
            </h1>

            <p
              style={riseIn(100)}
              className="mt-5 max-w-[560px] text-[clamp(1rem,1.9vw,1.28rem)] leading-[1.6] font-light text-[#8c7b6b]"
            >
              Design beautiful invite cards in minutes. Pick a style for
              birthdays, weddings, dinners, baby showers, and more, then edit
              every detail and share instantly.
            </p>

            <div style={riseIn(180)} className="mt-8 flex flex-wrap gap-3">
              <Link to="/builder">
                <button
                  type="button"
                  className="bg-[#1a1612] px-6 py-3 text-[0.86rem] font-medium tracking-[0.05em] text-[#f5f0e8] transition hover:bg-[#4a3728]"
                >
                  Start Designing Invites
                </button>
              </Link>
              <Link to="/builder">
                <button
                  type="button"
                  className="border border-[rgba(74,55,40,0.25)] bg-transparent px-6 py-3 text-[0.86rem] font-medium tracking-[0.05em] text-[#8c7b6b] transition hover:border-[#4a3728] hover:text-[#4a3728]"
                >
                  Explore Templates
                </button>
              </Link>
            </div>
          </div>

          <div style={riseIn(120)} className="relative">
            <div className="overflow-hidden border border-[rgba(74,55,40,0.14)] bg-[#ead9c5] shadow-[0_12px_30px_rgba(26,22,18,0.12)]">
              <img
                src="/hero-invite-scene.svg"
                alt="Illustration of invitations being shared between homes at sunset"
                className="block h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div
          style={riseIn(260)}
          className="mt-10 flex flex-wrap items-center gap-6 border-t border-[rgba(74,55,40,0.12)] pt-6"
        >
          {[
            { value: "6", label: "Invite Styles" },
            { value: "6", label: "Occasion Types" },
            { value: "Live", label: "Real-Time Preview" },
          ].map((item) => (
            <div
              key={item.label}
              className="pr-6 sm:border-r sm:border-[rgba(74,55,40,0.12)] last:sm:border-r-0"
            >
              <div className="font-['DM_Sans'] text-3xl leading-none font-bold tracking-[-0.02em] text-[#1a1612] sm:text-4xl">
                {item.value}
              </div>
              <div className="mt-1 text-[0.95rem] font-light text-[#8c7b6b] sm:text-base">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
