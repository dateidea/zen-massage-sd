"use client";

import Logo from "./Logo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How it works" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export default function Sidebar() {
  return (
    <aside
      aria-label="ZEN Massage primary"
      className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-[260px] flex-col justify-between border-r border-hairline bg-cream-deep px-8 py-12"
    >
      <div>
        <a href="#top" className="text-ink">
          <Logo />
        </a>
        <p className="mt-3 text-[12px] text-ink/55 leading-[1.7]">
          A small, Asian-owned massage studio. Est. on El Cajon Boulevard,
          San Diego.
        </p>
      </div>

      <nav className="flex flex-col gap-7" aria-label="Section">
        <ul className="flex flex-col gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="smallcaps text-[12px] tracking-[0.22em] text-ink hover:text-clay"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="border-t border-hairline pt-7">
          <p className="eyebrow">Reserve</p>
          <a
            href="tel:+16195480773"
            className="display mt-2 block text-[28px] leading-none text-clay hover:text-clay-deep"
          >
            (626) 522&#x2011;2888
          </a>
          <p className="mt-2 text-[12px] text-ink/55">
            Daily, 9 AM – 11 PM
          </p>
          <a
            href="#booking"
            className="btn-primary mt-6 inline-flex items-center rounded-none px-5 py-3 text-[11px] tracking-[0.22em] uppercase"
          >
            Book a session
          </a>
        </div>
      </nav>

      <div className="text-[11px] text-ink/45 leading-[1.7]">
        7086 El Cajon Blvd<br />
        San Diego, CA 92115
        <br />
        <span className="text-clay">— established neighborhood —</span>
      </div>
    </aside>
  );
}
