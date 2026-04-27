import Reveal from "./Reveal";
import SectionRail from "./SectionRail";

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
    <SectionRail
      id="process"
      eyebrow="How it works"
      index="02"
      labelledBy="process-heading"
      bg="bg-cream-deep"
      heading={
        <h2 id="process-heading" className="display text-center text-[44px] leading-[1.02] md:text-[68px]">
          Four steps.<br />
          <span className="display-italic text-ink-soft">Mostly the same as</span><br />
          your last good massage.
        </h2>
      }
      rail={<>The same four steps every time. No paperwork at the door, no upsell on the way out.</>}
    >
      <ol className="mx-auto grid max-w-[960px] grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
        {steps.map((s, i) => (
          <Reveal key={s.n} as="li" delay={i * 80}>
            <div className="flex flex-col items-start">
              <span className="display text-[64px] leading-none text-eucalyptus md:text-[80px]">{s.n}</span>
              <span aria-hidden className="mt-4 h-px w-12 bg-hairline" />
              <h3 className="display mt-6 text-[26px] leading-[1.15] md:text-[32px]">{s.title}</h3>
              <p className="mt-5 measure-tight text-[16px] leading-[1.85] text-ink-soft">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </SectionRail>
  );
}
