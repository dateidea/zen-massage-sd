import Reveal from "./Reveal";

const stats = [
  { value: "10+", label: "Years on El Cajon Boulevard" },
  { value: "60 min", label: "Sessions, by default" },
  { value: "9–10:30", label: "Open every day, no exceptions" },
  { value: "$60", label: "Standard hour, no surprise add-ons" },
];

export default function TrustBar() {
  return (
    <section
      aria-label="At a glance"
      className="border-b border-hairline bg-cream"
    >
      <div className="mx-auto max-w-[1320px] px-6 py-10 md:px-10 md:py-14">
        <Reveal>
          <ul className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-10">
            {stats.map((s) => (
              <li key={s.label} className="flex flex-col">
                <span className="display text-[36px] leading-none text-ink md:text-[44px]">
                  {s.value}
                </span>
                <span className="mt-3 max-w-[18ch] text-[13px] leading-[1.5] text-mid">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
