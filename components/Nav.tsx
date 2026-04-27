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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,backdrop-filter,border-color] duration-500 ${
        scrolled || open
          ? "bg-cream/85 backdrop-blur-md border-b border-hairline"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 md:px-10 md:py-6" aria-label="Primary">
        <a href="#top" className={`transition-colors ${scrolled || open ? "text-ink" : "text-cream md:text-cream"}`}>
          <Logo />
        </a>
        <ul className={`hidden items-center gap-10 md:flex ${scrolled ? "text-ink" : "text-cream"}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline text-[14px] tracking-[0.01em]">{l.label}</a>
            </li>
          ))}
          <li>
            <a href="tel:+16194396708" className={`text-[14px] tracking-[0.01em] ${scrolled ? "text-ink-soft" : "text-cream/85"}`}>
              (619) 439-6708
            </a>
          </li>
          <li>
            <a href="#booking" className="btn-primary inline-flex items-center rounded-full px-5 py-2.5 text-[13px] tracking-[0.04em] uppercase">
              Book a session
            </a>
          </li>
        </ul>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className={`relative z-50 flex h-10 w-10 items-center justify-center md:hidden ${scrolled || open ? "text-ink" : "text-cream"}`}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`absolute left-0 bottom-0 block h-px w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>
      <div className={`fixed inset-0 z-40 bg-cream md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
        <div className={`flex h-full flex-col justify-between px-6 pt-28 pb-12 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}>
          <ul className="flex flex-col gap-7">
            {links.map((l, i) => (
              <li key={l.href} style={{ transition: "all 600ms var(--ease-editorial)", transitionDelay: open ? `${100 + i * 60}ms` : "0ms", transform: open ? "translateY(0)" : "translateY(20px)", opacity: open ? 1 : 0 }}>
                <a href={l.href} onClick={() => setOpen(false)} className="display block text-[44px] tracking-[-0.02em] text-ink">{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <a href="tel:+16194396708" className="display text-[28px] text-ink">(619) 439-6708</a>
            <a href="#booking" onClick={() => setOpen(false)} className="btn-primary inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-[13px] tracking-[0.04em] uppercase">Book a session</a>
            <p className="text-[12px] text-mid">7900 El Cajon Blvd, Ste C &middot; La Mesa &middot; Daily, 10 AM &ndash; 9:30 PM</p>
          </div>
        </div>
      </div>
    </header>
  );
}
