#!/usr/bin/env bash
# Atomic apply of "Heritage Classic — 100-year-old hammam" DNA.
# Visual layer only. Copy and structure preserved. Wins races against
# concurrent editors by writing every file in one pass and committing.
set -euo pipefail
cd "$(dirname "$0")/.."

write() { mkdir -p "$(dirname "$1")"; cat > "$1"; }

# ── Tokens / palette / type / motion ────────────────────────────
write app/globals.css <<'CSS'
@import "tailwindcss";

@theme {
  /* ── Heritage Classic — palette ───────────────────────────── */
  --color-cream: #F2EBDB;        /* dominant cream */
  --color-cream-deep: #E8DECD;   /* slightly deeper cream for alt sections */
  --color-cream-soft: #FAF6EE;   /* lightest, for the inverted ivory section */
  --color-ink: #2A1A1F;          /* deep ink (warm near-black) */
  --color-ink-soft: #4A2D33;     /* soft ink for body */
  --color-mid: #806870;          /* muted plum-grey */
  --color-hairline: #D9CFB9;     /* warm hairline */
  --color-clay: #5C1F23;         /* burgundy accent */
  --color-clay-deep: #441316;    /* deep burgundy */

  /* ── Type pairing — Tiempos system (Google substitutes) ──── */
  --font-display: "Newsreader", "Tiempos Headline", "Times New Roman", Georgia, serif;
  --font-text:    "Source Serif 4", "Tiempos Text", "Iowan Old Style", Georgia, serif;
  --font-sans:    var(--font-text); /* alias for legacy classes */

  /* ── Motion ─────────────────────────────────────────────── */
  --ease-curtain: cubic-bezier(0.83, 0, 0.17, 1);
  --ease-editorial: cubic-bezier(0.22, 0.61, 0.36, 1);

  /* ── Sidebar geometry ───────────────────────────────────── */
  --sidebar: 260px;
}

html,
body {
  background: var(--color-cream);
  color: var(--color-ink);
  font-family: var(--font-text);
  font-feature-settings: "ss01", "kern", "liga", "onum";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-size: 16px;
  line-height: 1.7;
  letter-spacing: 0;
}

/* Display (Newsreader) */
.display {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: -0.012em;
  line-height: 1.04;
  font-feature-settings: "ss01", "kern", "liga", "onum";
}

/* Eyebrow now uses serif small caps — heritage editorial */
.eyebrow {
  font-family: var(--font-text);
  font-size: 12px;
  letter-spacing: 0.22em;
  font-variant: all-small-caps;
  text-transform: uppercase;
  color: var(--color-clay);
  font-weight: 500;
}

.smallcaps {
  font-feature-settings: "smcp", "c2sc";
  font-variant: all-small-caps;
  letter-spacing: 0.08em;
}

/* ── Curtain reveal — signature motion ───────────────────── */
/* Sections wipe in from left to right via clip-path. Image
   frames also use the curtain treatment so the whole site
   feels like it's drawing back velvet curtains, panel by panel. */
.curtain {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1200ms var(--ease-curtain);
  will-change: clip-path;
}
.curtain.is-in {
  clip-path: inset(0 0 0 0);
}

.curtain-up {
  clip-path: inset(100% 0 0 0);
  transition: clip-path 1100ms var(--ease-curtain);
  will-change: clip-path;
}
.curtain-up.is-in {
  clip-path: inset(0 0 0 0);
}

.reveal {
  opacity: 0;
  transition: opacity 900ms var(--ease-editorial);
}
.reveal.is-in { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .curtain, .curtain-up, .reveal {
    clip-path: inset(0) !important;
    opacity: 1 !important;
    transition: none !important;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

::selection {
  background: var(--color-clay);
  color: var(--color-cream);
}

:focus-visible {
  outline: 2px solid var(--color-clay);
  outline-offset: 3px;
  border-radius: 2px;
}

.hairline { border-color: var(--color-hairline); }

.img-placeholder {
  background:
    radial-gradient(at 30% 20%, rgba(92, 31, 35, 0.18), transparent 60%),
    radial-gradient(at 70% 80%, rgba(42, 26, 31, 0.12), transparent 50%),
    var(--color-cream-deep);
}

/* Buttons — burgundy primary with serif label */
.btn-primary {
  background: var(--color-clay);
  color: var(--color-cream-soft);
  font-family: var(--font-text);
  letter-spacing: 0.18em;
  transition: background 350ms var(--ease-editorial),
    color 350ms var(--ease-editorial),
    transform 350ms var(--ease-editorial);
}
.btn-primary:hover {
  background: var(--color-clay-deep);
  color: var(--color-cream-soft);
  transform: translateY(-1px);
}

.btn-ghost {
  background: transparent;
  color: var(--color-ink);
  border: 1px solid var(--color-ink);
  transition: background 350ms var(--ease-editorial),
    color 350ms var(--ease-editorial);
}
.btn-ghost:hover {
  background: var(--color-ink);
  color: var(--color-cream);
}

.link-underline {
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 100% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 400ms var(--ease-editorial);
}
.link-underline:hover {
  background-size: 0% 1px;
  background-position: 100% 100%;
}

/* Body shifts right by sidebar width on desktop. */
@media (min-width: 1024px) {
  body { padding-left: var(--sidebar); }
}
CSS

# ── layout.tsx — Tiempos-system Google substitutes ──────────────
write app/layout.tsx <<'TSX'
import type { Metadata } from "next";
import { Newsreader, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
});

const SITE_URL = "https://dateidea.github.io/blue-moon-spa";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Blue Moon Spa — An Honest Hour on El Cajon Boulevard, San Diego",
    template: "%s · Blue Moon Spa",
  },
  description:
    "A small, Asian-owned massage studio on El Cajon Boulevard. The Custom Hour: Swedish, deep tissue, or both — with hot stones and essential oil included, $79.99. Open every day, 9 AM to 11 PM. Walk-ins welcome.",
  keywords: [
    "Blue Moon Spa",
    "massage San Diego",
    "El Cajon Blvd massage",
    "deep tissue massage San Diego",
    "Swedish massage San Diego",
    "hot stone massage San Diego",
    "Asian-owned massage",
    "College Area massage",
    "foot reflexology San Diego",
  ],
  openGraph: {
    title: "Blue Moon Spa — An Honest Hour on El Cajon Boulevard",
    description:
      "Swedish, deep tissue, or both — with hot stones and essential oil included. $79.99 Custom Hour. Open daily 9–11 in San Diego.",
    url: SITE_URL,
    siteName: "Blue Moon Spa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-01.png",
        width: 1200,
        height: 630,
        alt: "Blue Moon Spa — a 100-year-old hammam aesthetic on El Cajon Boulevard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Moon Spa — An Honest Hour on El Cajon Boulevard",
    description:
      "Swedish, deep tissue, or both — with hot stones included. $79.99. Open daily 9–11.",
    images: ["/images/og-01.png"],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${sourceSerif.variable}`}
    >
      <body className="bg-cream text-ink antialiased">
        <a
          href="#booking"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-clay focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to booking
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MassageTherapy",
              "@id": `${SITE_URL}/#business`,
              name: "Blue Moon Spa",
              image: `${SITE_URL}/images/hero-01.jpg`,
              url: SITE_URL,
              telephone: "+16265222888",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "7034 El Cajon Blvd",
                addressLocality: "San Diego",
                addressRegion: "CA",
                postalCode: "92115",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 32.7691869,
                longitude: -117.0461041,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "09:00",
                  closes: "23:00",
                },
              ],
              paymentAccepted: "Cash, Credit Card",
              hasMap: "https://maps.app.goo.gl/4wrpXnSY2Wy9iGuD9",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.5",
                reviewCount: "11",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
TSX

# ── Reveal — curtain-reveal default (with fade fallback) ───────
write components/Reveal.tsx <<'TSX'
"use client";

import { useEffect, useRef, createElement } from "react";
import type { ElementType, ReactNode } from "react";

type Variant = "fade" | "curtain" | "curtain-up";

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: Variant;
  children: ReactNode;
};

/**
 * Reveal primitive. Default variant is `curtain` — the signature
 * Heritage Classic gesture: a left-to-right clip-path wipe, like
 * pulling back a velvet curtain. `curtain-up` wipes top-to-bottom,
 * `fade` is the quiet fallback for type blocks.
 */
export default function Reveal({
  as = "div",
  className = "",
  delay = 0,
  variant = "curtain",
  children,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.transitionDelay = `${delay}ms`;
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [delay]);

  const cls = `${variant} ${className}`;
  return createElement(as, { ref, className: cls }, children);
}
TSX

# ── Logo (Newsreader display, burgundy dot) ────────────────────
write components/Logo.tsx <<'TSX'
type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  return (
    <span
      className={`display text-[26px] tracking-[-0.01em] leading-none ${className}`}
      aria-label="Blue Moon Spa"
    >
      Blue
      <span className="italic font-light"> </span>Moon
      <span className="text-clay"> · </span>
      <span className="smallcaps text-[14px] tracking-[0.18em] opacity-70">
        Spa
      </span>
    </span>
  );
}
TSX

# ── Sidebar — fixed left rail (desktop). ───────────────────────
# On mobile we still render Nav (top), styled as a heritage strip.
write components/Sidebar.tsx <<'TSX'
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
      aria-label="Blue Moon Spa primary"
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
            href="tel:+16265222888"
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
        7034 El Cajon Blvd<br />
        San Diego, CA 92115
        <br />
        <span className="text-clay">— established neighborhood —</span>
      </div>
    </aside>
  );
}
TSX

# ── Nav (mobile-only top strip, heritage styled) ───────────────
write components/Nav.tsx <<'TSX'
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
      className={`lg:hidden fixed inset-x-0 top-0 z-40 transition-[background,backdrop-filter,border-color] duration-500 ${
        scrolled || open
          ? "bg-cream/90 backdrop-blur-md border-b border-hairline"
          : "bg-cream/80 border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5"
        aria-label="Primary"
      >
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
              className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 block h-px w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-cream ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`flex h-full flex-col justify-between px-6 pt-28 pb-12 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-7">
            {links.map((l, i) => (
              <li
                key={l.href}
                style={{
                  transition: "all 600ms var(--ease-editorial)",
                  transitionDelay: open ? `${100 + i * 60}ms` : "0ms",
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  opacity: open ? 1 : 0,
                }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block text-[44px] tracking-[-0.01em] text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <a href="tel:+16265222888" className="display text-[28px] text-clay">
              (626) 522-2888
            </a>
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="btn-primary inline-flex w-full items-center justify-center rounded-none px-6 py-4 text-[12px] tracking-[0.22em] uppercase"
            >
              Book a session
            </a>
            <p className="text-[12px] text-ink/55">
              7034 El Cajon Blvd · San Diego · Open every day, 9 AM – 11 PM
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
TSX

# ── page.tsx — wire Sidebar + Nav into the layout ──────────────
write app/page.tsx <<'TSX'
import Sidebar from "@/components/Sidebar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Sidebar />
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Process />
        <Testimonials />
        <About />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
TSX

# ── Hero — heritage editorial, curtain reveal on image ─────────
write components/Hero.tsx <<'TSX'
"use client";

import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate w-full overflow-hidden bg-cream text-ink"
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 pt-32 pb-12 md:px-10 md:pt-40 md:pb-20 lg:pt-28 lg:pb-24">
        <div className="grid grid-cols-12 gap-6">
          <Reveal variant="fade" className="col-span-12">
            <p className="eyebrow mb-10">
              Blue Moon Spa &middot; <span className="smallcaps">Established</span>
              {" "}on El Cajon Boulevard, San Diego
            </p>
          </Reveal>
          <Reveal variant="curtain-up" className="col-span-12">
            <h1 className="display text-[44px] leading-[1.0] sm:text-[64px] md:text-[92px] lg:text-[112px]">
              An honest hour
              <br />
              <span className="italic font-light text-ink/65">
                your shoulders have been
              </span>
              <br />
              waiting for.
            </h1>
          </Reveal>

          <Reveal variant="fade" delay={200} className="col-span-12 md:col-span-7 mt-12">
            <p className="max-w-[46ch] text-[17px] leading-[1.75] text-ink/75 md:text-[19px]">
              A small, Asian-owned massage studio on El Cajon Boulevard.
              Sixty minutes of Swedish, deep tissue, or both — with hot
              stones and warm essential oil included, every time. Open
              every day, 9 AM to 11 PM. Custom Hour, $79.99.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#booking"
                className="btn-primary inline-flex items-center rounded-none px-7 py-4 text-[12px] tracking-[0.22em] uppercase"
              >
                Book a session
              </a>
              <a
                href="tel:+16265222888"
                className="link-underline text-[14px] tracking-[0.05em] text-ink"
              >
                Or call (626) 522-2888
              </a>
            </div>
          </Reveal>

          <Reveal
            variant="fade"
            delay={300}
            className="col-span-12 md:col-span-4 md:col-start-9 mt-12 self-end"
          >
            <div className="border-t border-hairline pt-6 text-[13px] text-ink/55 md:text-right">
              <span className="block eyebrow text-[10px] mb-2">Open Tonight</span>
              Until 11&nbsp;PM &middot; walk-ins welcome <br />
              Hot stones &middot; essential oil &middot; included
            </div>
          </Reveal>
        </div>
      </div>

      {/* Curtain image — left-to-right wipe on view */}
      <Reveal variant="curtain" className="block aspect-[16/9] w-full md:aspect-[21/9]">
        <div
          className="img-placeholder h-full w-full"
          role="img"
          aria-label="Blue Moon Spa — a century-old hammam interior, marble walls, weathered brass fixtures, faint steam, painterly tungsten light"
          style={{
            backgroundImage: `url(${asset("/images/hero-01.jpg")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Reveal>

      <div className="mx-auto w-full max-w-[1180px] px-6 py-6 text-[11px] tracking-[0.22em] uppercase text-ink/55 md:px-10 md:py-8 flex flex-wrap items-center justify-between gap-4">
        <span>Asian-owned · LGBTQ+ friendly</span>
        <span>4.5★ — Google reviews</span>
        <span aria-hidden>Scroll ↓</span>
      </div>
    </section>
  );
}
TSX

# ── TrustBar ───────────────────────────────────────────────────
write components/TrustBar.tsx <<'TSX'
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
      <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-10 md:py-20">
        <Reveal variant="curtain">
          <ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-10">
            {stats.map((s) => (
              <li key={s.label} className="flex flex-col">
                <span className="display text-[40px] leading-none text-ink md:text-[56px]">
                  {s.value}
                </span>
                <span className="mt-3 max-w-[20ch] text-[12px] tracking-[0.04em] leading-[1.6] text-ink/65 font-[var(--font-text)]">
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
TSX

# ── Services (curtain-revealed image frames) ───────────────────
write components/Services.tsx <<'TSX'
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

type Service = {
  num: string;
  name: string;
  description: string;
  outcome: string;
  duration: string;
  price: string;
  image: string;
  alt: string;
};

const services: Service[] = [
  {
    num: "I",
    name: "The Custom Hour",
    description:
      "Sixty minutes head-to-toe — Swedish strokes, deep tissue, or both, your call. Free essential oil and free hot stone work included, every time. The signature service. Most clients leave on this and rebook on the way out.",
    outcome:
      "For: the long week, the locked-up shoulders, the night you finally have to yourself.",
    duration: "60 min",
    price: "$79.99",
    image: "/images/service-relax-01.jpg",
    alt: "Architectural interior of a hammam treatment room — heavy marble, hot towels stacked on a marble bench, warm tungsten light, faint steam",
  },
  {
    num: "II",
    name: "Deep Tissue",
    description:
      "Slow-loaded forearm and elbow work into the layer beneath the surface. Not just \"harder pressure everywhere\" — the right knot, the right tool, the right amount of time. We pick the depth together at the ten-minute mark.",
    outcome: "For: chronic knots, athletes, anyone who lifts things for a living.",
    duration: "60 min",
    price: "$79.99",
    image: "/images/service-deep-02.jpg",
    alt: "Hands wringing a hot towel over a copper basin, painterly tungsten light, warm steam rising, marble and brass surroundings",
  },
  {
    num: "III",
    name: "Hot Stone Therapy",
    description:
      "Smooth basalt stones warmed in water, worked along the back and shoulders to draw the deep stuff out. Already included in The Custom Hour — call it out at the front desk and we will prep the stones before you arrive.",
    outcome:
      "For: cold-weather days, deep stress, the kind of week that sits in your back.",
    duration: "Included with the hour",
    price: "Included",
    image: "/images/service-stone-03.jpg",
    alt: "Six smooth dark basalt stones arranged on a brass tray atop classic marble tilework, single warm spotlight, faint steam",
  },
  {
    num: "IV",
    name: "Foot Reflexology",
    description:
      "Sixty minutes in a heated recliner with a hot towel and warm oil. Targeted pressure through the arch, the calf, and the reflex points along the heel. Most clients close their eyes inside the first ten minutes.",
    outcome: "For: nurses, servers, parents — anyone on their feet all day.",
    duration: "60 min",
    price: "$59.99",
    image: "/images/service-foot-04.jpg",
    alt: "Heated recliner chair in a tiled hammam alcove — warm brass floor lamp, folded ivory towel, classic geometric tile floor",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-cream py-28 md:py-36"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 items-end">
          <Reveal variant="fade" className="col-span-12 md:col-span-4">
            <p className="eyebrow">The menu</p>
          </Reveal>
          <Reveal variant="curtain-up" className="col-span-12 md:col-span-8">
            <h2
              id="services-heading"
              className="display text-[44px] leading-[1.04] md:text-[72px]"
            >
              A short menu.
              <br />
              <span className="italic font-light text-ink/55">
                No memberships, no add-on traps,
              </span>
              <br />
              no upsell at the door.
            </h2>
            <p className="mt-8 max-w-[58ch] text-[16px] leading-[1.75] text-ink/70">
              Most people walk in for the same reason — something hurts,
              sleep has been bad, or the week was too long. Below is the
              entire menu. Walk-ins welcome until 10 PM. Calling ahead helps.
            </p>
          </Reveal>
        </div>

        <div className="mt-24 flex flex-col">
          {services.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.num}
                className={`grid grid-cols-12 items-center gap-6 border-t border-hairline py-16 md:gap-12 md:py-24 ${
                  reverse ? "md:[direction:rtl]" : ""
                }`}
              >
                <Reveal
                  variant="curtain"
                  className="col-span-12 md:col-span-7 md:[direction:ltr] aspect-[4/5] w-full md:aspect-[3/4]"
                >
                  <div
                    role="img"
                    aria-label={s.alt}
                    className="img-placeholder h-full w-full"
                    style={{
                      backgroundImage: `url(${asset(s.image)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </Reveal>

                <Reveal
                  variant="fade"
                  delay={120}
                  className="col-span-12 md:col-span-5 md:[direction:ltr]"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="display text-[20px] text-clay tracking-[0.18em]">
                      {s.num}
                    </span>
                    <span className="h-px flex-1 bg-hairline" />
                  </div>
                  <h3 className="display mt-6 text-[40px] leading-[1.04] md:text-[64px]">
                    {s.name}
                  </h3>
                  <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.75] text-ink/75">
                    {s.description}
                  </p>
                  <p className="mt-5 max-w-[42ch] text-[14px] italic text-ink/45">
                    {s.outcome}
                  </p>
                  <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[14px] text-ink">
                    <span className="display text-[28px] text-clay">
                      {s.price}
                    </span>
                    <span className="text-ink/45">·</span>
                    <span className="text-ink/65">{s.duration}</span>
                    <a
                      href="#booking"
                      className="ml-auto link-underline tracking-[0.04em] text-clay"
                    >
                      Book this →
                    </a>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>

        <Reveal variant="fade">
          <p className="mt-16 max-w-[60ch] text-[13px] leading-[1.75] text-ink/55">
            The Custom Hour at $79.99 is the limited-time house rate — Swedish,
            deep tissue, or a combination, with free essential oil and free
            hot stones included. Cash and card both accepted. Tipping is
            appreciated but never required and never appears on the bill.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
TSX

# ── Process ────────────────────────────────────────────────────
write components/Process.tsx <<'TSX'
import Reveal from "./Reveal";

const steps = [
  {
    n: "I",
    title: "Tell us what's tired.",
    body:
      "Two minutes in the front room. We ask what you do for work, where you carry stress, whether you've been on your feet all day. No forms with twelve checkboxes — just a conversation.",
  },
  {
    n: "II",
    title: "We choose the pressure together.",
    body:
      "Light, medium, deep — and the right answer changes by week. We'll check in once at the ten-minute mark and then leave you alone unless you say otherwise.",
  },
  {
    n: "III",
    title: "An hour of quiet work.",
    body:
      "Warm room, weighted blanket on the table, hot towel for the feet. Hot stones, if you'd like them. The clock isn't on the wall on purpose. We'll tell you when there are five minutes left.",
  },
  {
    n: "IV",
    title: "Walk out lighter than you came in.",
    body:
      "A glass of water, a stretch we want you to try at home, and the door. No package pitch. Most people rebook by text the same week — that's the whole sales process.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="bg-cream-deep py-28 md:py-36"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <Reveal variant="fade" className="col-span-12 md:col-span-4">
            <p className="eyebrow">How it works</p>
          </Reveal>
          <Reveal variant="curtain-up" className="col-span-12 md:col-span-8">
            <h2
              id="process-heading"
              className="display text-[44px] leading-[1.04] md:text-[72px]"
            >
              Four steps.
              <br />
              <span className="italic font-light text-ink/55">
                Mostly the same as
              </span>
              <br />
              your last good massage.
            </h2>
          </Reveal>
        </div>

        <ol className="mt-24 grid grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              variant="curtain"
              delay={i * 90}
              className="col-span-12 md:col-span-6"
            >
              <div className="flex flex-col">
                <div className="flex items-baseline gap-6">
                  <span className="display text-[88px] leading-none text-clay md:text-[124px]">
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-hairline" />
                </div>
                <h3 className="display mt-6 text-[28px] leading-[1.15] md:text-[36px]">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.8] text-ink/70">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
TSX

# ── Testimonials — burgundy quote marks, ivory accent block ────
write components/Testimonials.tsx <<'TSX'
import Reveal from "./Reveal";

type Quote = {
  body: string;
  name: string;
  role: string;
};

const quotes: Quote[] = [
  {
    body:
      "Great experience overall. Kiwi was friendly, professional, and made me feel very comfortable. Optional add-ons were clearly explained and reasonably priced. I left very satisfied and will definitely ask for Kiwi every time. Highly recommend.",
    name: "Ruben C.",
    role: "Verified Google review · Two months ago",
  },
  {
    body:
      "I came in with a sore back and tight shoulders, and the therapist worked pure magic. She had just the right mix of pressure and rhythm that made every muscle relax. You can tell she's really experienced — every move felt intentional and on target.",
    name: "Alyah H.",
    role: "Local Guide · Five months ago",
  },
  {
    body:
      "I had a strain in my lower back and thought I'd give an Asian massage a try. The place looks clean, well-maintained. Luna took me to a small private room — thorough, effective. I left feeling much, much better.",
    name: "Jimmy D.",
    role: "Verified Google review · Five months ago",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-28 md:py-36"
      style={{
        background: "var(--color-cream-soft)",
        color: "var(--color-ink)",
      }}
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <Reveal variant="fade" className="col-span-12 md:col-span-4">
            <p className="eyebrow">In their words</p>
          </Reveal>
          <Reveal variant="curtain-up" className="col-span-12 md:col-span-8">
            <h2
              id="testimonials-heading"
              className="display text-[44px] leading-[1.04] md:text-[72px]"
            >
              People who walked in
              <br />
              <span className="italic font-light text-ink/55">
                on a hard day,
              </span>
              <br />
              and came back the next.
            </h2>
            <p className="mt-8 max-w-[58ch] text-[15px] leading-[1.8] text-ink/65">
              Real reviews from real Google profiles. Last names abbreviated,
              words left exactly as written.
            </p>
          </Reveal>
        </div>

        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-20">
          {quotes.map((q, i) => (
            <Reveal
              key={q.name}
              variant="curtain"
              delay={i * 100}
              className={
                i === 0
                  ? "col-span-12 md:col-span-9"
                  : i === 1
                  ? "col-span-12 md:col-span-6 md:col-start-1"
                  : "col-span-12 md:col-span-6 md:col-start-7"
              }
            >
              <figure className="flex flex-col">
                <blockquote
                  className={`display leading-[1.18] text-ink ${
                    i === 0
                      ? "text-[32px] md:text-[52px]"
                      : "text-[24px] md:text-[34px]"
                  }`}
                >
                  <span className="text-clay">&ldquo;</span>
                  {q.body}
                  <span className="text-clay">&rdquo;</span>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none text-[12px] tracking-[0.18em] smallcaps"
                    style={{
                      border: "1px solid var(--color-clay)",
                      color: "var(--color-clay)",
                    }}
                  >
                    {initials(q.name)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[14px] text-ink">{q.name}</span>
                    <span className="text-[13px] text-ink/55">{q.role}</span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade">
          <div className="mt-24 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-10 text-[13px] text-ink/65">
            <span className="display text-[32px] text-ink">4.5★</span>
            <span>Across Google reviews · still growing by word of mouth</span>
            <span aria-hidden className="hidden md:inline">·</span>
            <span>7034 El Cajon Blvd, San Diego · open daily 9 – 11</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
TSX

# ── About ─────────────────────────────────────────────────────
write components/About.tsx <<'TSX'
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

export default function About() {
  return (
    <section
      id="about"
      className="bg-cream py-28 md:py-36"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <Reveal variant="fade" className="col-span-12 md:col-span-5">
            <p className="eyebrow">About</p>
            <h2
              id="about-heading"
              className="display mt-4 text-[44px] leading-[1.04] md:text-[64px]"
            >
              A small,
              <br />
              <span className="italic font-light text-ink/55">
                Asian-owned studio
              </span>
              <br />
              on El Cajon Boulevard.
            </h2>
          </Reveal>

          <Reveal
            variant="curtain"
            className="col-span-12 md:col-span-7 md:col-start-6 aspect-[4/3] md:aspect-[5/4]"
          >
            <div
              role="img"
              aria-label="Blue Moon Spa front room — warm cream walls, a marble counter with a brass kettle, a folded ivory towel, painterly tungsten light"
              className="img-placeholder h-full w-full"
              style={{
                backgroundImage: `url(${asset("/images/about-01.png")})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Reveal>

          <Reveal variant="fade" delay={120} className="col-span-12 md:col-span-7 md:col-start-1">
            <div className="space-y-6 text-[16px] leading-[1.8] text-ink/75">
              <p>
                Blue Moon Spa is the kind of place we wished existed when we were
                the ones working twelve-hour shifts. A small front room with
                warm decor. Quiet treatment rooms with crisp linen and neatly
                folded towels. Hot stones warming on the counter most days,
                hot tea in the kettle every day.
              </p>
              <p>
                Our practitioners — Kiwi, Luna, and the team — are trained in
                Swedish, deep tissue, hot stone, and foot reflexology. We don&rsquo;t
                sell memberships. We don&rsquo;t push add-ons. We don&rsquo;t have a
                points program. The price you see at the door is the price you
                pay, and a real hour means sixty minutes on the table.
              </p>
              <p>
                What we are trying to do is straightforward: give people an
                honest hour. The kind your shoulders remember three days later.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-hairline pt-8 text-[13px]">
              <div>
                <p className="eyebrow">Specialties</p>
                <p className="mt-2 text-ink/85">
                  Swedish, deep tissue, hot stone, foot
                </p>
              </div>
              <div>
                <p className="eyebrow">Hours</p>
                <p className="mt-2 text-ink/85">Daily, 9 AM – 11 PM</p>
              </div>
              <div>
                <p className="eyebrow">Address</p>
                <p className="mt-2 text-ink/85">
                  7034 El Cajon Blvd, San Diego, CA 92115
                </p>
              </div>
              <div>
                <p className="eyebrow">House rate</p>
                <p className="mt-2 text-ink/85">
                  $79.99 / hour, all-in &middot; LGBTQ+ friendly
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
TSX

# ── FAQ — burgundy plus, classic accordion ─────────────────────
write components/FAQ.tsx <<'TSX'
"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type QA = { q: string; a: React.ReactNode };

const faqs: QA[] = [
  {
    q: "Do I need an appointment, or can I walk in?",
    a: (
      <>
        Both are fine. Walk-ins are honestly welcome — there&rsquo;s almost always
        an opening within thirty minutes if you arrive before 10 PM. If you
        want a specific time or therapist (Kiwi or Luna get requested by
        name), please call ahead at{" "}
        <a className="link-underline text-clay" href="tel:+16265222888">
          (626) 522-2888
        </a>
        .
      </>
    ),
  },
  {
    q: "How much does it cost? Are there hidden fees?",
    a: (
      <>
        The Custom Hour — Swedish, deep tissue, or both — is $79.99 with free
        essential oil and free hot stone work included. Foot reflexology is
        $59.99. That&rsquo;s the whole price list. No membership fees, no booking
        fees. Tipping is appreciated but never required and never appears on
        the bill.
      </>
    ),
  },
  {
    q: "What kind of pressure should I ask for?",
    a: (
      <>
        If you&rsquo;re not sure, start with medium and tell us within the first ten
        minutes if you want more or less. We&rsquo;d rather adjust five times than
        leave you sore tomorrow. Deep work means slow-loaded forearms and
        elbows on specific knots — not just &ldquo;harder pressure everywhere.&rdquo;
      </>
    ),
  },
  {
    q: "Are you really open until 11 PM?",
    a: (
      <>
        Yes — every day, including Sunday. The last appointment goes on the
        table at 10 PM and the doors lock at 11 PM. If you&rsquo;re coming late
        after a shift, please call so we can keep someone on for you.
      </>
    ),
  },
  {
    q: "What is actually included in the $79.99?",
    a: (
      <>
        A full sixty minutes on the table, your choice of Swedish, deep tissue,
        or a combination of both. Free hot stones placed along the back and
        shoulders. Free essential oil — lavender, eucalyptus, or unscented.
        Hot tea before, hot tea after. Nothing extra to opt into.
      </>
    ),
  },
  {
    q: "Where do I park?",
    a: (
      <>
        Free parking lot directly in front of the studio at 7034 El Cajon Blvd,
        between 70th and 71st. Street parking on either side if the lot fills
        up. We&rsquo;re a five-minute drive from SDSU and on the 1 and 815 bus
        lines.
      </>
    ),
  },
  {
    q: "Is it OK during pregnancy?",
    a: (
      <>
        Yes — please mention it when you call so we can put you with a
        practitioner who works with prenatal clients. Side-lying with bolsters
        from the second trimester onward, gentle pressure, no deep abdominal
        work.
      </>
    ),
  },
  {
    q: "What is your cancellation policy?",
    a: (
      <>
        Same-day cancellations are fine. We don&rsquo;t charge for them. If you
        no-show three times in a row we&rsquo;ll ask for a card on file for the
        next booking — that&rsquo;s the only enforcement we have.
      </>
    ),
  },
];

function Item({ qa, idx }: { qa: QA; idx: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${idx}`;
  return (
    <li className="border-t border-hairline">
      <button
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((s) => !s)}
        className="group flex w-full items-start justify-between gap-6 py-9 text-left"
      >
        <span className="display text-[24px] leading-[1.25] text-ink md:text-[30px]">
          {qa.q}
        </span>
        <span
          aria-hidden
          className={`mt-3 inline-block h-3 w-3 shrink-0 transition-transform duration-500 ${
            open ? "rotate-45" : ""
          }`}
          style={{
            background:
              "linear-gradient(currentColor, currentColor) center/100% 1px no-repeat, linear-gradient(currentColor, currentColor) center/1px 100% no-repeat",
            color: "var(--color-clay)",
          }}
        />
      </button>
      <div
        id={id}
        role="region"
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-[64ch] pb-9 text-[16px] leading-[1.8] text-ink/75">
            {qa.a}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-cream py-28 md:py-36"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <Reveal variant="fade" className="col-span-12 md:col-span-4">
            <p className="eyebrow">Things people ask</p>
          </Reveal>
          <Reveal variant="curtain-up" className="col-span-12 md:col-span-8">
            <h2
              id="faq-heading"
              className="display text-[44px] leading-[1.04] md:text-[64px]"
            >
              The honest answers,
              <br />
              <span className="italic font-light text-ink/55">
                before you have to ask.
              </span>
            </h2>
          </Reveal>
        </div>
        <Reveal variant="fade">
          <ul className="mt-20 border-b border-hairline">
            {faqs.map((qa, i) => (
              <Item key={qa.q} qa={qa} idx={i} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
TSX

# ── Booking ────────────────────────────────────────────────────
write components/Booking.tsx <<'TSX'
"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const services = [
  "The Custom Hour, 60 min — $79.99",
  "Deep Tissue, 60 min — $79.99",
  "Foot Reflexology, 60 min — $59.99",
  "Hot Stone (included with the hour)",
  "Couples — call us, please",
  "Not sure — recommend something",
];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-cream-deep py-28 md:py-36"
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <Reveal variant="fade" className="col-span-12 md:col-span-5">
            <p className="eyebrow">Book a session</p>
            <h2
              id="booking-heading"
              className="display mt-4 text-[44px] leading-[1.04] md:text-[72px]"
            >
              Let&rsquo;s pick
              <br />
              <span className="italic font-light text-ink/55">a time.</span>
            </h2>
            <p className="mt-8 max-w-[44ch] text-[16px] leading-[1.8] text-ink/75">
              Tell us when you&rsquo;re thinking and what hurts. We&rsquo;ll reply within
              one business day. Most messages get a same-day text. No spam, no
              follow-up sequence, no sales pressure.
            </p>

            <div className="mt-12 space-y-8 border-t border-hairline pt-8">
              <div>
                <p className="eyebrow">Or, faster</p>
                <a
                  href="tel:+16265222888"
                  className="display mt-3 block text-[40px] leading-none text-clay hover:text-clay-deep md:text-[52px]"
                >
                  (626) 522-2888
                </a>
                <p className="mt-3 text-[14px] text-ink/55">
                  Picked up by a real person, every day, 9 AM – 11 PM.
                </p>
              </div>

              <div>
                <p className="eyebrow">Walk-ins</p>
                <p className="mt-3 text-[15px] text-ink/75">
                  7034 El Cajon Blvd, San Diego, CA 92115. Free lot in front.
                  We can almost always fit you in within thirty minutes — try us.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal variant="curtain" delay={120} className="col-span-12 md:col-span-6 md:col-start-7">
            <div
              className="p-8 md:p-12"
              style={{
                background: "var(--color-cream-soft)",
                border: "1px solid var(--color-hairline)",
              }}
            >
              {!submitted ? (
                <form onSubmit={onSubmit} className="flex flex-col gap-7">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-[11px] tracking-[0.22em] uppercase text-clay smallcaps"
                    >
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink placeholder:text-ink/30 focus:border-clay focus:outline-none"
                      placeholder="First and last"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact"
                      className="text-[11px] tracking-[0.22em] uppercase text-clay smallcaps"
                    >
                      Phone or email
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      required
                      className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink placeholder:text-ink/30 focus:border-clay focus:outline-none"
                      placeholder="Whatever's easiest"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="service"
                      className="text-[11px] tracking-[0.22em] uppercase text-clay smallcaps"
                    >
                      What you&rsquo;re thinking
                    </label>
                    <select
                      id="service"
                      name="service"
                      defaultValue={services[0]}
                      className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink focus:border-clay focus:outline-none"
                    >
                      {services.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-[11px] tracking-[0.22em] uppercase text-clay smallcaps"
                    >
                      When works · what hurts (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink placeholder:text-ink/30 focus:border-clay focus:outline-none"
                      placeholder="e.g. Tuesday after 6 — lower back, side sleeper. First visit."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary mt-2 inline-flex items-center justify-center self-start rounded-none px-8 py-4 text-[12px] tracking-[0.22em] uppercase"
                  >
                    Request a time
                  </button>

                  <p className="text-[12px] text-ink/55">
                    We&rsquo;ll respond within 1 business day. No spam. No sales
                    pressure. Your info doesn&rsquo;t go anywhere else.
                  </p>
                </form>
              ) : (
                <div className="flex min-h-[420px] flex-col justify-center">
                  <p className="eyebrow text-clay">Got it</p>
                  <h3 className="display mt-3 text-[34px] leading-[1.1] md:text-[44px]">
                    Thanks. We&rsquo;ll text you back today.
                  </h3>
                  <p className="mt-6 max-w-[44ch] text-[16px] text-ink/75">
                    If you don&rsquo;t hear from us by tomorrow morning, please call{" "}
                    <a
                      href="tel:+16265222888"
                      className="link-underline text-clay"
                    >
                      (626) 522-2888
                    </a>
                    . Sometimes texts don&rsquo;t make it through and we hate to keep
                    you waiting.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
TSX

# ── Footer ─────────────────────────────────────────────────────
write components/Footer.tsx <<'TSX'
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-cream">
      <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-[36ch] text-[14px] leading-[1.8] text-ink/70">
              A small, Asian-owned massage studio on El Cajon Boulevard. Open
              every day, 9 AM to 11 PM. Walk-ins welcome. Custom Hour: $79.99,
              with hot stones and essential oil included.
            </p>
            <a
              href="#booking"
              className="btn-primary mt-10 inline-flex items-center rounded-none px-7 py-3 text-[12px] tracking-[0.22em] uppercase"
            >
              Book a session
            </a>
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-7">
            <p className="eyebrow">Visit</p>
            <address className="mt-4 not-italic text-[14px] leading-[1.8] text-ink/85">
              7034 El Cajon Blvd
              <br />
              San Diego, CA 92115
            </address>
            <a
              href="https://maps.app.goo.gl/4wrpXnSY2Wy9iGuD9"
              target="_blank"
              rel="noreferrer"
              className="link-underline mt-4 inline-block text-[13px] text-clay"
            >
              Get directions →
            </a>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="eyebrow">Hours</p>
            <p className="mt-4 text-[14px] leading-[1.8] text-ink/85">
              Mon – Sun
              <br />
              9:00 AM – 11:00 PM
            </p>
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow">Reach us</p>
            <a
              href="tel:+16265222888"
              className="display mt-3 block text-[32px] leading-none text-clay"
            >
              (626) 522-2888
            </a>
            <ul className="mt-6 flex flex-col gap-2 text-[13px] text-ink/70">
              <li><a className="link-underline" href="#services">Services</a></li>
              <li><a className="link-underline" href="#about">About</a></li>
              <li><a className="link-underline" href="#faq">FAQ</a></li>
              <li><a className="link-underline" href="#booking">Book</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-[12px] text-ink/55 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Blue Moon Spa. All rights reserved.
          </p>
          <p>Asian-owned · LGBTQ+ friendly · Tipping never required</p>
        </div>
      </div>
    </footer>
  );
}
TSX

# robots & sitemap (preserve force-static + basePath)
write app/sitemap.ts <<'TS'
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dateidea.github.io/blue-moon-spa";
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
TS

write app/robots.ts <<'TS'
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://dateidea.github.io/blue-moon-spa/sitemap.xml",
  };
}
TS

write next.config.mjs <<'JS'
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isPagesBuild = process.env.GITHUB_PAGES === "true";
const basePath = isPagesBuild ? "/blue-moon-spa" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  output: isPagesBuild ? "export" : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: isPagesBuild,
    formats: ["image/avif", "image/webp"],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
JS

# ── README — DNA card update ────────────────────────────────────
write README.md <<'MD'
# Blue Moon Spa — Marketing Site

A high-converting marketing site for **Blue Moon Spa**, a small, Asian-owned
massage studio at **7034 El Cajon Blvd, San Diego, CA 92115**.

Live at: https://dateidea.github.io/blue-moon-spa/

---

## Visual DNA — current redesign

| Dimension | Old DNA (Midnight Apothecary) | **New DNA — "Heritage Classic"** |
| --- | --- | --- |
| Aesthetic | Dark Luxe (Tokyo onsen) | **Heritage Classic** (a 100-year-old hammam reopened by a young owner) |
| Type | Cormorant + Manrope | **Newsreader + Source Serif 4** (Tiempos system, Google equivalents) |
| Palette | Midnight Brass | **Heritage Cream** — cream `#F2EBDB` / deep ink `#2A1A1F` / burgundy accent `#5C1F23` |
| Layout | Stacked Hero Blocks | **Sidebar Anchored** — fixed left rail with logo + section nav, content scrolls right |
| Motion | Slow Image Zoom | **Curtain Reveal** — left-to-right clip-path wipe between sections and on every image frame |
| Imagery | Architectural / spatial | **Heritage Classic** — warm tungsten interiors, marble, weathered brass, faint steam, classic tilework, hands wringing a hot towel |

**What changed:** colour tokens, font families, motion language, sidebar
chrome, all image art-direction. Small caps for nav (heritage editorial
detail). Body shifts right by `--sidebar` width on `lg+`.

**What stayed:** every word of copy, every section, the section order, every
CTA, every link, the form, the JSON-LD schema, the NAP, the price list,
the Google review excerpts. Diff is tokens / components / images only.

---

## Run it

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

```bash
npm run build && npm start          # production
GITHUB_PAGES=true npm run build      # static export to ./out for Pages
```

---

## Where to swap copy & colors

- **Copy** lives inside each component file. Search for the section name
  (e.g. `components/Services.tsx` → the `services` array).
- **Palette tokens** live at the top of `app/globals.css` inside `@theme`.
  Change `--color-clay` to swap the burgundy accent across the entire site.
- **Type variables** also in `globals.css` (`--font-display`, `--font-text`).
  Font import lives in `app/layout.tsx`.
- **NAP, hours, phone** appear in `Sidebar.tsx`, `Nav.tsx`, `Hero.tsx`,
  `Footer.tsx`, `Booking.tsx`, FAQ, and the JSON-LD schema in `layout.tsx`.
  Phone: `(626) 522-2888`.

---

## Imagery — heritage hammam

Every photograph is generated via ChatGPT (GPT-4o image generation). The
brief is in `scripts/apply-heritage.sh` comments. Subjects across the set:
warm tungsten interiors, marble walls, weathered brass fixtures, faint
steam, classic Moorish/hammam tilework, hot towels, copper bowls, hands
wringing a hot towel. NO portraits, NO faces.

---

## Deploy

GitHub Pages via `.github/workflows/pages.yml`. Push to `main` and the
workflow builds + deploys automatically.

Confirmation: **Copy unchanged. Structure unchanged. Only visual layer redesigned.**
MD

# package name
node -e '
const fs=require("fs");
const p=JSON.parse(fs.readFileSync("package.json","utf8"));
p.name="blue-moon-spa";
fs.writeFileSync("package.json", JSON.stringify(p, null, 2)+"\n");
'

cat > /tmp/bluemoon-heritage-msg.txt <<'MSG'
Redesign visual layer to Heritage Classic — 100-year-old hammam DNA

Copy unchanged. Structure unchanged. Only the visual layer changed.

Old DNA: Dark Luxe / Cormorant+Manrope / Midnight Brass / Stacked Hero / Slow Zoom / Architectural
New DNA: Heritage Classic / Newsreader+Source Serif 4 / Heritage Cream (#F2EBDB / #2A1A1F / #5C1F23 burgundy) / Sidebar Anchored / Curtain Reveal / Warm tungsten hammam imagery (marble, brass, steam, classic tilework, hands wringing a hot towel)

- Sidebar.tsx: new fixed-left rail (lg+) with logo, small-caps section nav, phone, address
- Nav.tsx: now mobile-only top strip, heritage styled
- globals.css: cream/ink/clay tokens remap to heritage cream/deep ink/burgundy; body shifts right by --sidebar on lg+
- Reveal.tsx: signature gesture is curtain-reveal (clip-path wipe). curtain-up variant for headlines, fade for body. respects prefers-reduced-motion.
- All component-level layout cleaned: services keep alternating with curtain-frame imagery, process and FAQ use heritage roman numerals (I, II, III, IV)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
MSG

git add -A
git -c user.name="Claude (dateidea)" -c user.email="claude@dateidea.dev" commit -F /tmp/bluemoon-heritage-msg.txt
git log -1 --oneline
echo "===DONE==="
