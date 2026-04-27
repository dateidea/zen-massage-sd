import type { ReactNode } from "react";
import Reveal from "./Reveal";

// Editorial Minimal section shell — a centered eyebrow + heading lockup,
// followed by a wide centered body. No sidebar rails. Generous padding.
type Props = {
  id?: string;
  eyebrow: string;
  index?: string;
  className?: string;
  bg?: string;
  labelledBy?: string;
  children: ReactNode;
  rail?: ReactNode;          // accepted for back-compat; rendered as supporting text
  heading?: ReactNode;       // optional supplied lockup
};

export default function SectionRail({
  id, eyebrow, index, className = "", bg = "bg-cream", labelledBy, children, rail, heading,
}: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${bg} py-32 md:py-40 ${className}`}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 text-mid">
              {index ? <span className="index-badge">{index}</span> : null}
              {index ? <span aria-hidden className="h-px w-10 bg-hairline" /> : null}
              <span className="eyebrow">{eyebrow}</span>
            </div>
            {heading ? <div className="mt-10">{heading}</div> : null}
            {rail ? <p className="mt-8 measure-prose text-[16px] leading-[1.85] text-ink-soft">{rail}</p> : null}
          </div>
        </Reveal>
        <div className="mt-20 md:mt-28">{children}</div>
      </div>
    </section>
  );
}
