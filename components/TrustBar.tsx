import Reveal from "./Reveal";

const stats = [
  { value: "$45", label: "30 min foot + 30 min body, all-in" },
  { value: "10–9:30", label: "Open every day, seven days a week" },
  { value: "10% off", label: "Active duty & veterans, with valid ID" },
  { value: "Walk-ins", label: "Almost always an opening — try us" },
];

export default function TrustBar() {
  return (
    <section aria-label="At a glance" className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((s) => (
              <li key={s.label} className="card flex flex-col p-6 md:p-8">
                <span className="display text-[34px] leading-none text-ink font-medium md:text-[42px]">{s.value}</span>
                <span className="mt-3 max-w-[20ch] text-[13px] leading-[1.5] text-ink-soft">{s.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
