import Reveal from "./Reveal";

const stats = [
  { value: "$45", label: "30 min foot + 30 min body, all-in" },
  { value: "9:30–10", label: "Open every day, seven days a week" },
  { value: "10% off", label: "Active duty & veterans, with valid ID" },
  { value: "Walk-ins", label: "Almost always an opening — try us" },
];

export default function TrustBar() {
  return (
    <section aria-label="At a glance" className="border-b border-hairline bg-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-10 md:px-10 md:py-14">
        <Reveal>
          <ul className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-10">
            {stats.map((s) => (
              <li key={s.label} className="flex flex-col">
                <span className="display text-[36px] leading-none text-ink md:text-[44px]">{s.value}</span>
                <span className="mt-3 max-w-[20ch] text-[13px] leading-[1.5] text-mid">{s.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
