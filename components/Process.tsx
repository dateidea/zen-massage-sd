import Reveal from "./Reveal";

const steps = [
  {
    n: "I",
    title: "Tell us what's tired.",
    body:
      "Two minutes in the front room. We ask what you do for work, where you carry stress, whether you've been on your feet all day. No forms with twelve checkboxes — just a conversation.",
  },
  {
    n: "II",
    title: "We choose the pressure together.",
    body:
      "Light, medium, deep — and the right answer changes by week. We'll check in once at the ten-minute mark and then leave you alone unless you say otherwise.",
  },
  {
    n: "III",
    title: "An hour of quiet work.",
    body:
      "Warm room, weighted blanket on the table, hot towel for the feet. Hot stones, if you'd like them. The clock isn't on the wall on purpose. We'll tell you when there are five minutes left.",
  },
  {
    n: "IV",
    title: "Walk out lighter than you came in.",
    body:
      "A glass of water, a stretch we want you to try at home, and the door. No package pitch. Most people rebook by text the same week — that's the whole sales process.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="bg-cream-deep py-28 md:py-36"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <Reveal variant="fade" className="col-span-12 md:col-span-4">
            <p className="eyebrow">How it works</p>
          </Reveal>
          <Reveal variant="curtain-up" className="col-span-12 md:col-span-8">
            <h2
              id="process-heading"
              className="display text-[44px] leading-[1.04] md:text-[72px]"
            >
              Four steps.
              <br />
              <span className="italic font-light text-ink/55">
                Mostly the same as
              </span>
              <br />
              your last good massage.
            </h2>
          </Reveal>
        </div>

        <ol className="mt-24 grid grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              variant="curtain"
              delay={i * 90}
              className="col-span-12 md:col-span-6"
            >
              <div className="flex flex-col">
                <div className="flex items-baseline gap-6">
                  <span className="display text-[88px] leading-none text-clay md:text-[124px]">
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-hairline" />
                </div>
                <h3 className="display mt-6 text-[28px] leading-[1.15] md:text-[36px]">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.8] text-ink/70">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
