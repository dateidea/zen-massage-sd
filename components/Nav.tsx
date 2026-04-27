"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How it works" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Mobile top bar ─────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-hairline bg-cream/90 px-6 py-4 backdrop-blur-md lg:hidden">
        <a href="#top" className="text-ink">
          <Logo />
        </a>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="relative z-50 flex h-10 w-10 items-center justify-center text-ink"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 bottom-0 block h-px w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </header>

      {/* ── Desktop sidebar (≥lg) ──────────────────────────── */}
      <aside
        className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col justify-between border-r border-hairline bg-cream px-8 py-10 lg:flex"
        aria-label="Primary"
      >
        <div>
          <a href="#top" className="text-ink">
            <Logo />
          </a>
          <p className="mt-6 max-w-[28ch] text-[13px] leading-[1.55] text-ink-soft">
            A small, family-run massage spa inside Baltimore Plaza, La Mesa.
          </p>

          <nav className="mt-12 flex flex-col gap-5" aria-label="Sections">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] tracking-[0.04em] text-ink hover:text-clay"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="rule mt-10" />

          <p className="eyebrow mt-10">Reserve</p>
          <a
            href="tel:+16196395282"
            className="mt-3 block text-[20px] tracking-[-0.01em] text-clay hover:text-clay-deep"
          >
            (619) 639-5282
          </a>
          <p className="mt-2 text-[12px] text-mid">Daily, 9 AM – 10 PM</p>

          <a
            href="#booking"
            className="btn-primary mt-8 inline-flex items-center px-6 py-3 text-[11px] uppercase"
          >
            Book a session
          </a>
        </div>

        <div className="text-[12px] leading-[1.6] text-mid">
          <p>5575 Baltimore Dr #106-107</p>
          <p>La Mesa, CA 91942</p>
          <a
            href="https://maps.app.goo.gl/3bFERDjYsj1cpB3c6"
            target="_blank"
            rel="noreferrer"
            className="link-underline mt-3 inline-block text-clay"
          >
            Open in Google Maps →
          </a>
        </div>
      </aside>

      {/* ── Mobile fullscreen overlay menu ─────────────────── */}
      {open ? (
        <div className="fixed inset-0 z-40 bg-cream lg:hidden">
          <div className="flex h-full flex-col justify-between px-6 pt-24 pb-10">
            <ul className="flex flex-col gap-6">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block text-[40px] leading-[1.04] text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4">
              <a href="tel:+16196395282" className="display text-[26px] text-clay">
                (619) 639-5282
              </a>
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="btn-primary inline-flex w-full items-center justify-center px-6 py-4 text-[11px] uppercase"
              >
                Book a session
              </a>
              <p className="text-[12px] text-mid">
                5575 Baltimore Dr #106-107 · La Mesa · Daily, 9 AM – 10 PM
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
