import type { ReactNode } from "react";

// Sidebar-anchored section shell — a sticky left rail for the section label
// and a wide right column for the body. Used across every long-form section
// to lock the page into the new architectural layout.
type Props = {
  id?: string;
  eyebrow: string;
  index?: string;
  className?: string;
  bg?: string;
  labelledBy?: string;
  children: ReactNode;
  rail?: ReactNode;
};

export default function SectionRail({
  id,
  eyebrow,
  index,
  className = "",
  bg = "bg-cream",
  labelledBy,
  children,
  rail,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${bg} py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-x-10">
          <aside className="col-span-12 md:col-span-3">
            <div className="rail-sticky flex flex-col gap-6">
              <div className="flex items-center gap-4">
                {index ? <span className="index-badge">{index}</span> : null}
                <span aria-hidden className="h-px w-10 bg-hairline" />
              </div>
              <p className="eyebrow">{eyebrow}</p>
              {rail ? <div className="mt-4 text-[12px] leading-[1.6] text-mid">{rail}</div> : null}
            </div>
          </aside>
          <div className="col-span-12 md:col-span-9">{children}</div>
        </div>
      </div>
    </section>
  );
}
