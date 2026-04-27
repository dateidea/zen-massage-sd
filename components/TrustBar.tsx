import Reveal from "./Reveal";

const stats = [
  { value: "$45", label: "30 min foot + 30 min body, all-in" },
  { value: "9:30–10", label: "Open every day, seven days a week" },
  { value: "10% off", label: "Active duty & veterans, with valid ID" },
  { value: "Walk-ins", label: "Almost always an opening — try us" },
];

export default function TrustBar() {
  return (
    <section
      aria-label="At a glance"
      className="bg-night-soft border-y border-hairline"
    >
      <div className="mx-auto max-w-[1080px] px-6 py-14 md:px-10 md:py-20">
        <Reveal>
          <ul className="grid grid-cols-1 divide-y divide-hairline md:grid-cols-2 md:divide-y-0 md:divide-x lg:grid-cols-4">
            {stats.map((s) => (
              <li
                key={s.label}
                className="flex flex-col gap-3 py-8 md:py-2 md:px-8 first:md:pl-0 last:md:pr-0"
              >
                <span className="display text-[44px] leading-none text-cream md:text-[56px]">
                  {s.value}
                </span>
                <span className="max-w-[24ch] text-[12px] leading-[1.55] tracking-[0.04em] uppercase text-cream/60">
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
