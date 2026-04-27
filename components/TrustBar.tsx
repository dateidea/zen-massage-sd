import Reveal from "./Reveal";

const stats = [
  { value: "$50", label: "One full hour, all-in pricing" },
  { value: "9–11", label: "Open every day, last booking at 10" },
  { value: "4.2★", label: "Across 17 Google reviews" },
  { value: "$10 off", label: "First-visit welcome, no code needed" },
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
                <span className="mt-3 max-w-[20ch] text-[13px] leading-[1.5] text-mid">
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
