import type { Fields, Template } from "./InvitelyBuilder.types";

export function CardContent({
  currentTpl,
  fields,
}: {
  currentTpl: Template;
  fields: Fields;
}) {
  if (currentTpl === "elegant") {
    return (
      <>
        <div className="relative z-[1] mb-5 text-base tracking-[0.5em] text-[rgba(201,168,76,0.5)]">
          ✦ ✦ ✦
        </div>
        <div className="relative z-[1] mb-4 font-['DM_Sans'] text-[0.52rem] uppercase tracking-[0.4em] text-[rgba(201,168,76,0.55)]">
          You are cordially invited
        </div>
        <div className="relative z-[1] mb-1 font-['Cormorant_Garamond'] text-[0.85rem] italic text-[rgba(232,220,190,0.55)]">
          {fields.host}
        </div>
        <div className="relative z-[1] mb-6 font-['Playfair_Display'] text-[2.4rem] leading-[1.1] font-bold italic text-[#e8d8b0]">
          {fields.title}
        </div>
        <div className="relative z-[1] mx-auto mb-6 flex w-40 items-center gap-2.5">
          <div className="h-px flex-1 bg-[rgba(201,168,76,0.3)]" />
          <div className="h-1 w-1 rotate-45 bg-[rgba(201,168,76,0.6)]" />
          <div className="h-px flex-1 bg-[rgba(201,168,76,0.3)]" />
        </div>
        <div className="relative z-[1] flex flex-col gap-2.5">
          {[fields.date, fields.time, fields.location, fields.dress]
            .filter(Boolean)
            .map((value) => (
              <div
                key={value}
                className="flex items-center justify-center gap-2.5 font-['Cormorant_Garamond'] text-[0.9rem] text-[rgba(232,220,190,0.6)]"
              >
                <span className="text-[0.6rem] text-[rgba(201,168,76,0.6)]">
                  ◈
                </span>
                {value}
              </div>
            ))}
        </div>
        <div className="relative z-[1] mt-6 font-['DM_Sans'] text-[0.5rem] uppercase tracking-[0.35em] text-[rgba(201,168,76,0.4)]">
          RSVP
        </div>
        <div className="relative z-[1] mt-1 font-['Cormorant_Garamond'] text-[0.8rem] italic text-[rgba(232,220,190,0.4)]">
          {fields.rsvp}
        </div>
      </>
    );
  }

  if (currentTpl === "minimal") {
    return (
      <>
        <div>
          <div className="mb-8 font-['DM_Sans'] text-[0.58rem] uppercase tracking-[0.28em] text-[#8c7b6b]">
            You&apos;re invited
          </div>
          <div className="mb-1 font-['Cormorant_Garamond'] text-[0.9rem] italic text-[#8c7b6b]">
            {fields.host} invites you to
          </div>
          <div className="mb-10 font-['Playfair_Display'] text-[2.4rem] leading-[1.1] font-bold text-[#1a1612]">
            {fields.title}
          </div>
          <div className="mb-7 h-0.5 w-9 bg-[#b85c38]" />
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 font-['Cormorant_Garamond'] text-[0.95rem] text-[#4a3728]">
              <span className="w-12 shrink-0 pt-[3px] font-['DM_Sans'] text-[0.52rem] uppercase tracking-[0.2em] text-[#8c7b6b]">
                When
              </span>
              {fields.date}, {fields.time}
            </div>
            <div className="flex gap-4 font-['Cormorant_Garamond'] text-[0.95rem] text-[#4a3728]">
              <span className="w-12 shrink-0 pt-[3px] font-['DM_Sans'] text-[0.52rem] uppercase tracking-[0.2em] text-[#8c7b6b]">
                Where
              </span>
              {fields.location}
            </div>
            {fields.dress ? (
              <div className="flex gap-4 font-['Cormorant_Garamond'] text-[0.95rem] text-[#4a3728]">
                <span className="w-12 shrink-0 pt-[3px] font-['DM_Sans'] text-[0.52rem] uppercase tracking-[0.2em] text-[#8c7b6b]">
                  Dress
                </span>
                {fields.dress}
              </div>
            ) : null}
          </div>
        </div>
        <div className="border-t border-[rgba(74,55,40,0.12)] pt-5 font-['DM_Sans'] text-[0.62rem] uppercase tracking-[0.14em] text-[#8c7b6b]">
          RSVP · {fields.rsvp}
        </div>
      </>
    );
  }

  if (currentTpl === "bold") {
    return (
      <>
        <div className="flex items-center justify-between bg-[#1a1612] px-8 py-[1.1rem]">
          <div className="font-['DM_Sans'] text-[0.58rem] uppercase tracking-[0.25em] text-[#c9a84c]">
            You&apos;re invited
          </div>
          <div className="font-['Bebas_Neue'] text-[0.9rem] tracking-[0.15em] text-[rgba(201,168,76,0.5)]">
            {new Date().getFullYear()}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between px-8 py-10">
          <div>
            <div className="mb-1 font-['DM_Sans'] text-xs font-light text-[#8c7b6b]">
              {fields.host} presents
            </div>
            <div className="mb-2 font-['Bebas_Neue'] text-[3.2rem] leading-none tracking-[0.04em] text-[#1a1612]">
              {fields.title}
            </div>
            <div className="mb-8 text-[0.8rem] font-light text-[#8c7b6b]">
              {fields.subtitle}
            </div>
          </div>
          <div className="mb-6 grid grid-cols-2 gap-px border border-[rgba(74,55,40,0.12)] bg-[rgba(74,55,40,0.12)]">
            {[
              ["Date", fields.date],
              ["Time", fields.time],
              ["Venue", fields.location],
              ["Dress", fields.dress || "—"],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#f5f0e8] px-4 py-3.5">
                <div className="mb-1 font-['DM_Sans'] text-[0.48rem] uppercase tracking-[0.2em] text-[#8c7b6b]">
                  {label}
                </div>
                <div className="font-['Cormorant_Garamond'] text-[0.82rem] text-[#4a3728]">
                  {value}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#b85c38] px-2.5 py-1 font-['DM_Sans'] text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-white">
              RSVP
            </span>
            <span className="font-['DM_Sans'] text-xs text-[#8c7b6b]">
              {fields.rsvp}
            </span>
          </div>
        </div>
      </>
    );
  }

  if (currentTpl === "whimsy") {
    return (
      <>
        <div className="mb-4 text-[1.4rem] tracking-[0.3em]">🌸 🎉 🌸</div>
        <div className="mb-2.5 font-['Cormorant_Garamond'] text-base italic text-[#b85c38]">
          You&apos;re warmly invited!
        </div>
        <div className="mb-1 font-['DM_Sans'] text-[0.78rem] font-light text-[#8c7b6b]">
          {fields.host} invites you to their
        </div>
        <div className="mb-6 font-['Playfair_Display'] text-[2.6rem] leading-[1.1] font-bold italic text-[#4a3728]">
          {fields.title}
        </div>
        <div className="mx-auto mb-6 flex w-[140px] items-center gap-2">
          <div className="h-px flex-1 bg-[rgba(74,55,40,0.2)]" />
          <div className="text-[0.6rem] text-[#c9a84c]">✦</div>
          <div className="h-px flex-1 bg-[rgba(74,55,40,0.2)]" />
        </div>
        <div className="mb-5 flex flex-wrap justify-center gap-3">
          {[
            ["When", fields.date],
            ["Time", fields.time],
            ["Where", fields.location],
            fields.dress ? ["Dress", fields.dress] : null,
          ]
            .filter(Boolean)
            .map((entry) => {
              const [label, value] = entry as [string, string];
              return (
                <div
                  key={label}
                  className="flex flex-col items-center border border-[rgba(74,55,40,0.1)] bg-white px-4 py-2 shadow-[0_2px_8px_rgba(74,55,40,0.06)]"
                >
                  <div className="mb-0.5 font-['DM_Sans'] text-[0.48rem] uppercase tracking-[0.2em] text-[#8c7b6b]">
                    {label}
                  </div>
                  <div className="font-['Cormorant_Garamond'] text-[0.9rem] italic text-[#4a3728]">
                    {value}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="font-['DM_Sans'] text-[0.58rem] uppercase tracking-[0.15em] text-[#8c7b6b]">
          Kindly RSVP
        </div>
        <div className="mt-1 font-['Cormorant_Garamond'] text-[0.85rem] italic text-[#8c7b6b]">
          {fields.rsvp}
        </div>
      </>
    );
  }

  if (currentTpl === "botanical") {
    return (
      <>
        <div className="absolute left-3.5 top-2.5 z-[1] text-[2rem] leading-none opacity-20">
          🌿
        </div>
        <div className="absolute bottom-2.5 right-3.5 z-[1] rotate-180 text-[2rem] leading-none opacity-20">
          🌿
        </div>
        <div className="relative z-[1] mb-4 font-['DM_Sans'] text-[0.52rem] uppercase tracking-[0.35em] text-[rgba(200,220,170,0.55)]">
          An invitation
        </div>
        <div className="relative z-[1] mb-1 font-['Cormorant_Garamond'] text-[0.85rem] italic text-[rgba(210,230,180,0.55)]">
          {fields.host}
        </div>
        <div className="relative z-[1] mb-6 font-['Cormorant_Garamond'] text-[2.4rem] leading-[1.15] font-semibold italic text-[#deefc8]">
          {fields.title}
        </div>
        <div className="relative z-[1] mx-auto mb-6 flex w-[150px] items-center gap-2">
          <div className="h-px flex-1 bg-[rgba(200,220,170,0.3)]" />
          <div className="text-[0.65rem] text-[rgba(200,220,170,0.5)]">✦</div>
          <div className="h-px flex-1 bg-[rgba(200,220,170,0.3)]" />
        </div>
        <div className="relative z-[1] flex flex-col gap-2">
          {[fields.date, fields.time, fields.location, fields.dress]
            .filter(Boolean)
            .map((value) => (
              <div
                key={value}
                className="flex items-center justify-center gap-2 font-['Cormorant_Garamond'] text-[0.9rem] text-[rgba(210,230,180,0.6)]"
              >
                <span className="text-[0.6rem] text-[rgba(200,220,144,0.6)]">
                  ◇
                </span>
                {value}
              </div>
            ))}
        </div>
        <div className="relative z-[1] mt-6 font-['DM_Sans'] text-[0.5rem] uppercase tracking-[0.3em] text-[rgba(200,220,170,0.35)]">
          RSVP kindly requested
        </div>
        <div className="relative z-[1] mt-1 font-['Cormorant_Garamond'] text-[0.8rem] italic text-[rgba(210,230,180,0.38)]">
          {fields.rsvp}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="border-b-[3px] border-b-[#1a1612] bg-[#f5f0e8] px-10 pb-6 pt-8">
        <div className="mb-3 font-['DM_Sans'] text-[0.52rem] uppercase tracking-[0.3em] text-[#8c7b6b]">
          You are invited to
        </div>
        <div className="font-['Playfair_Display'] text-[2.8rem] leading-none font-black tracking-[-0.02em] text-[#1a1612]">
          {fields.title}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between px-10 py-8">
        <div>
          <div className="mb-6 font-['Cormorant_Garamond'] text-[0.95rem] italic text-[#8c7b6b]">
            Hosted by {fields.host}
          </div>
          <div className="flex flex-col gap-[1.1rem]">
            {[
              ["Date", fields.date],
              ["Time", fields.time],
              ["Venue", fields.location],
              fields.dress ? ["Dress Code", fields.dress] : null,
            ]
              .filter(Boolean)
              .map((entry) => {
                const [label, value] = entry as [string, string];
                return (
                  <div key={label}>
                    <div className="mb-1 font-['DM_Sans'] text-[0.5rem] uppercase tracking-[0.25em] text-[#8c7b6b]">
                      {label}
                    </div>
                    <div className="font-['Cormorant_Garamond'] text-[0.95rem] text-[#4a3728]">
                      {value}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex items-baseline justify-between border-t border-[rgba(74,55,40,0.12)] pt-4">
          <div className="font-['DM_Sans'] text-[0.5rem] uppercase tracking-[0.2em] text-[#8c7b6b]">
            RSVP
          </div>
          <div className="font-['Cormorant_Garamond'] text-[0.88rem] italic text-[#4a3728]">
            {fields.rsvp}
          </div>
        </div>
      </div>
    </>
  );
}
