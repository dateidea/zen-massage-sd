import Reveal from "./Reveal";

const stats = [
  { value: "$79.99", label: "Custom Hour — Swedish, deep tissue, or both" },
  { value: "9 — 11", label: "Open every day, last booking at 10 PM" },
  { value: "4.5★", label: "Across Google reviews from neighborhood regulars" },
  { value: "Free", label: "Hot stones & essential oil, included every time" },
];

export default function TrustBar() {
  return (
    <section
      aria-label="At a glance"
      className="border-t border-b border-hairline bg-cream-deep"
    >
      <div className="mx-auto max-w-[1320px] px-6 py-12 md:px-10 md:py-16">
        <Reveal>
          <ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-10">
            {stats.map((s) => (
              <li key={s.label} className="flex flex-col">
                <span className="display text-[40px] leading-none text-ink md:text-[52px]">
                  {s.value}
                </span>
                <span className="mt-3 max-w-[20ch] text-[12px] tracking-[0.05em] leading-[1.55] text-ink/55">
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
