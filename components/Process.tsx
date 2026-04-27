import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Tell us what's tired.",
    body:
      "Two minutes in the front room. We ask what you do for work, where you carry stress, whether you've been on your feet all day. No forms with twelve checkboxes — just a conversation.",
  },
  {
    n: "02",
    title: "We choose the pressure together.",
    body:
      "Light, medium, deep — and the right answer changes by week. We'll check in once at the ten-minute mark and then leave you alone unless you say otherwise.",
  },
  {
    n: "03",
    title: "An hour of quiet work.",
    body:
      "Warm room, weighted blanket on the table, hot towel for the feet. The clock isn't on the wall on purpose. We'll tell you when there are five minutes left.",
  },
  {
    n: "04",
    title: "Walk out lighter than you came in.",
    body:
      "A glass of water, a stretch we want you to try at home, and the door. No package pitch. Most people rebook by text the same week — that's the whole sales process.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="bg-cream-deep py-24 md:py-32"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow">How it works</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2
                id="process-heading"
                className="display text-[40px] leading-[1.02] md:text-[64px]"
              >
                Four steps.
                <br />
                <span className="italic font-light text-ink-soft">
                  Mostly the same as
                </span>
                <br />
                your last good massage.
              </h2>
            </div>
          </div>
        </Reveal>

        <ol className="mt-20 grid grid-cols-12 gap-x-6 gap-y-12 md:gap-y-16">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              delay={i * 80}
              className="col-span-12 md:col-span-6"
            >
              <div className="flex flex-col">
                <div className="flex items-baseline gap-6">
                  <span className="display text-[64px] leading-none text-clay md:text-[88px]">
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-hairline" />
                </div>
                <h3 className="display mt-6 text-[26px] leading-[1.15] md:text-[32px]">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[42ch] text-[16px] leading-[1.7] text-ink-soft">
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
