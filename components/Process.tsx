import Reveal from "./Reveal";

const steps = [
  { n: "01", title: "Tell us what is tired.",
    body: "Two minutes in the front room. We ask what you do for work, where you carry stress, whether you have been on your feet all day. No forms with twelve checkboxes — just a conversation." },
  { n: "02", title: "We choose the pressure together.",
    body: "Light, medium, deep — and the right answer changes by week. We will check in once at the ten-minute mark and then leave you alone unless you say otherwise." },
  { n: "03", title: "An hour of quiet work.",
    body: "Warm room, weighted blanket on the table, hot towel for the feet. The clock is not on the wall on purpose. We will tell you when there are five minutes left." },
  { n: "04", title: "Walk out lighter than you came in.",
    body: "A glass of water, a stretch we want you to try at home, and the door. No package pitch. Most people rebook by text the same week — that is the whole sales process." },
];

export default function Process() {
  return (
    <section id="process" className="bg-night-soft py-28 md:py-40" aria-labelledby="process-heading">
      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">How it works</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 id="process-heading" className="display mt-6 text-[44px] leading-[1.0] md:text-[80px]">
            Four steps.
            <br />
            <span className="italic font-light text-brass">Mostly the same as</span>
            <br />
            your last good massage.
          </h2>
        </Reveal>

        <ol className="mt-20 flex flex-col divide-y divide-hairline border-y border-hairline">
          {steps.map((s, i) => (
            <Reveal key={s.n} as="li" delay={i * 80}>
              <div className="grid grid-cols-1 gap-y-4 py-12 md:grid-cols-12 md:gap-x-10 md:py-14">
                <div className="md:col-span-2">
                  <span className="display text-brass text-[56px] leading-none md:text-[80px]">{s.n}</span>
                </div>
                <div className="md:col-span-10">
                  <h3 className="display text-[28px] leading-[1.1] md:text-[40px]">{s.title}</h3>
                  <p className="mt-4 max-w-[58ch] text-[16px] leading-[1.75] text-cream/75">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
