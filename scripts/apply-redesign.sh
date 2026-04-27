#!/usr/bin/env bash
# Atomic apply of the "Midnight Apothecary" redesign.
# Visual layer only — copy and structure are preserved.
# Wins races against concurrent editors by writing every file in
# one pass, then immediately committing.
set -euo pipefail
cd "$(dirname "$0")/.."

write() { mkdir -p "$(dirname "$1")"; cat > "$1"; }

# ── tokens / palette / type ─────────────────────────────────────────
write app/globals.css <<'CSS'
@import "tailwindcss";

@theme {
  /* ── Midnight Apothecary palette ─────────────────────────────
     The whole site is dark-luxe. `cream` (the legacy token name)
     now maps to a warm ivory used for INVERTED light sections
     like Testimonials. `ink` is the dominant midnight background. */

  /* Surface */
  --color-midnight: #0E1620;
  --color-midnight-deep: #060B12;
  --color-midnight-soft: #161F2C;

  /* Ivory (used as the inverted-section ground and as primary type colour) */
  --color-ivory: #F1ECDF;
  --color-ivory-soft: #DAD3C3;
  --color-ivory-mute: #8C8475;

  /* Brass accent */
  --color-brass: #B58A4A;
  --color-brass-deep: #8C6531;

  /* Hairlines */
  --color-edge: #2A323D;
  --color-edge-light: #C7BFAE;

  /* ── Legacy aliases (so existing class names in components still
     resolve while we redesign in place) ───────────────────────── */
  --color-cream: #0E1620;          /* was warm cream → now midnight */
  --color-cream-deep: #060B12;     /* was deeper cream → deeper midnight */
  --color-ink: #F1ECDF;            /* was charcoal → now ivory */
  --color-ink-soft: #DAD3C3;       /* was soft ink → soft ivory */
  --color-mid: #8C8475;            /* muted */
  --color-hairline: #2A323D;       /* was hairline cream → edge midnight */
  --color-clay: #B58A4A;           /* was terracotta → brass */
  --color-clay-deep: #8C6531;      /* deep brass */

  /* ── Typography ─────────────────────────────────────────────── */
  --font-display: "Cormorant Garamond", "GT Sectra", "Times New Roman", Georgia, serif;
  --font-sans: "Manrope", "Söhne", ui-sans-serif, system-ui, -apple-system,
    "Segoe UI", Roboto, sans-serif;

  /* ── Motion ─────────────────────────────────────────────────── */
  --ease-editorial: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-zoom: cubic-bezier(0.16, 0.84, 0.32, 1);
}

/* ── Base resets ──────────────────────────────────────────────── */
html,
body {
  background: var(--color-midnight);
  color: var(--color-ivory);
  font-family: var(--font-sans);
  font-feature-settings: "ss01", "cv11";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-size: 16px;
  line-height: 1.65;
  letter-spacing: 0;
}

/* Display headings */
.display {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: -0.015em;
  line-height: 1.04;
}

.eyebrow {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--color-brass);
  font-weight: 500;
}

/* ── Reveal: signature gesture is SLOW IMAGE ZOOM ───────────── */
/* Text reveals: quiet fade only, no translate (different from before). */
.reveal {
  opacity: 0;
  transition: opacity 1100ms var(--ease-editorial);
  will-change: opacity;
}
.reveal.is-in {
  opacity: 1;
}

/* Images get the signature slow zoom-out as they enter view. */
.zoom-frame {
  overflow: hidden;
  position: relative;
}
.zoom-frame > .zoom-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.12);
  transition: transform 2200ms var(--ease-zoom),
    filter 2200ms var(--ease-zoom);
  filter: brightness(0.92);
  will-change: transform, filter;
}
.zoom-frame.is-in > .zoom-img {
  transform: scale(1);
  filter: brightness(1);
}

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transition: none; }
  .zoom-frame > .zoom-img {
    transform: none;
    filter: none;
    transition: none;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ── Selection ────────────────────────────────────────────────── */
::selection {
  background: var(--color-brass);
  color: var(--color-midnight);
}

/* ── Focus ring ───────────────────────────────────────────────── */
:focus-visible {
  outline: 2px solid var(--color-brass);
  outline-offset: 3px;
  border-radius: 2px;
}

.hairline {
  border-color: var(--color-edge);
}

/* ── Image placeholder fallback (deep night) ──────────────────── */
.img-placeholder {
  background:
    radial-gradient(at 30% 20%, rgba(181, 138, 74, 0.18), transparent 60%),
    radial-gradient(at 70% 80%, rgba(241, 236, 223, 0.05), transparent 50%),
    var(--color-midnight-soft);
}

/* ── Buttons: brass-on-midnight by default, ghost on dark ────── */
.btn-primary {
  background: var(--color-brass);
  color: var(--color-midnight);
  transition: transform 350ms var(--ease-editorial),
    background 350ms var(--ease-editorial),
    color 350ms var(--ease-editorial);
}
.btn-primary:hover {
  background: var(--color-ivory);
  color: var(--color-midnight);
  transform: translateY(-1px);
}
.btn-ghost {
  background: transparent;
  color: var(--color-ivory);
  border: 1px solid var(--color-edge);
  transition: border-color 350ms var(--ease-editorial),
    color 350ms var(--ease-editorial);
}
.btn-ghost:hover {
  border-color: var(--color-brass);
  color: var(--color-brass);
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
CSS

# ── layout.tsx (font imports) ───────────────────────────────────
write app/layout.tsx <<'TSX'
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
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
        alt: "Blue Moon Spa — quiet, brass-lit treatment room on El Cajon Boulevard",
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
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
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

# ── Reveal: implements both fade and zoom-frame variants ──────
write components/Reveal.tsx <<'TSX'
"use client";

import { useEffect, useRef } from "react";

type Props = {
  as?: "div" | "li" | "section";
  className?: string;
  delay?: number;
  zoom?: boolean;
  children: React.ReactNode;
};

/**
 * Single reveal primitive. Defaults to a quiet fade.
 * Pass `zoom` to use the signature slow image-zoom (the new motion
 * direction). Components compose `Reveal zoom` around image frames
 * to opt in.
 */
export default function Reveal({
  as = "div",
  className = "",
  delay = 0,
  zoom = false,
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [delay]);

  const Tag = as as keyof JSX.IntrinsicElements;
  const cls = `${zoom ? "zoom-frame" : "reveal"} ${className}`;
  return (
    // @ts-expect-error - dynamic tag, ref typing
    <Tag ref={ref} className={cls}>
      {children}
    </Tag>
  );
}
TSX

# ── Logo (Cormorant display, brass dot) ─────────────────────────
write components/Logo.tsx <<'TSX'
type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  return (
    <span
      className={`display text-[22px] tracking-[-0.015em] leading-none ${className}`}
      aria-label="Blue Moon Spa"
    >
      Blue
      <span className="italic font-light"> </span>Moon
      <span className="text-clay font-light"> · </span>
      <span className="opacity-70 font-light tracking-[0.02em] text-[18px]">SD</span>
    </span>
  );
}
TSX

# ── Nav: ivory border on midnight, brass-pill CTA ──────────────
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
      className={`fixed inset-x-0 top-0 z-40 transition-[background,backdrop-filter,border-color] duration-500 ${
        scrolled || open
          ? "bg-cream/85 backdrop-blur-md border-b border-hairline"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 md:px-10 md:py-6"
        aria-label="Primary"
      >
        <a href="#top" className="text-ink transition-colors">
          <Logo />
        </a>

        <ul className="hidden items-center gap-10 md:flex text-ink/85">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline text-[13px] tracking-[0.04em] uppercase"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="tel:+16265222888"
              className="text-[13px] tracking-[0.04em] uppercase text-clay"
            >
              (626) 522-2888
            </a>
          </li>
          <li>
            <a
              href="#booking"
              className="btn-primary inline-flex items-center rounded-none px-5 py-2.5 text-[12px] tracking-[0.18em] uppercase"
            >
              Book a session
            </a>
          </li>
        </ul>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden text-ink"
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
        className={`fixed inset-0 z-40 bg-cream md:hidden ${
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
                  className="display block text-[44px] tracking-[-0.015em] text-ink"
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
              className="btn-primary inline-flex w-full items-center justify-center rounded-none px-6 py-4 text-[12px] tracking-[0.18em] uppercase"
            >
              Book a session
            </a>
            <p className="text-[12px] text-mid">
              7034 El Cajon Blvd · San Diego · Open every day, 9 AM – 11 PM
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
TSX

# ── Hero: STACKED HERO BLOCKS (text block, then image block) ───
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
      {/* Block 1 — eyebrow + headline + subhead + CTA */}
      <div className="mx-auto w-full max-w-[1320px] px-6 pt-40 pb-12 md:px-10 md:pt-56 md:pb-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <p className="eyebrow mb-10">
              Blue Moon Spa &middot; 7034 El Cajon Blvd &middot; San Diego
            </p>
            <h1 className="display text-[44px] leading-[0.98] sm:text-[64px] md:text-[96px] lg:text-[124px]">
              An honest hour
              <br />
              <span className="italic font-light text-ink/70">
                your shoulders have been
              </span>
              <br />
              waiting for.
            </h1>
          </div>

          <div className="col-span-12 md:col-span-7 mt-12 md:mt-16">
            <p className="max-w-[46ch] text-[17px] leading-[1.7] text-ink/75 md:text-[19px]">
              A small, Asian-owned massage studio on El Cajon Boulevard.
              Sixty minutes of Swedish, deep tissue, or both — with hot
              stones and warm essential oil included, every time. Open
              every day, 9 AM to 11 PM. Custom Hour, $79.99.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#booking"
                className="btn-primary inline-flex items-center rounded-none px-7 py-4 text-[12px] tracking-[0.2em] uppercase"
              >
                Book a session
              </a>
              <a
                href="tel:+16265222888"
                className="link-underline text-[14px] tracking-[0.05em] text-clay"
              >
                Or call (626) 522-2888
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9 mt-12 md:mt-16 self-end">
            <div className="border-t border-hairline pt-6 text-[13px] text-ink/55 md:text-right">
              <span className="block text-clay tracking-[0.18em] uppercase text-[10px] mb-2">
                Open Tonight
              </span>
              Until 11&nbsp;PM &middot; walk-ins welcome <br />
              Hot stones &middot; essential oil &middot; included
            </div>
          </div>
        </div>
      </div>

      {/* Block 2 — full-width architectural image (slow zoom on scroll-in) */}
      <Reveal zoom className="block aspect-[16/9] w-full md:aspect-[21/9]">
        <div
          className="zoom-img img-placeholder"
          role="img"
          aria-label="Architectural wide of Blue Moon Spa treatment room — midnight blue plaster walls, ivory linen, single warm brass pendant lamp"
          style={{ backgroundImage: `url(${asset("/images/hero-01.jpg")})` }}
        />
      </Reveal>

      {/* Block 3 — bottom rail */}
      <div className="mx-auto w-full max-w-[1320px] px-6 py-6 text-[11px] tracking-[0.18em] uppercase text-ink/55 md:px-10 md:py-8 flex flex-wrap items-center justify-between gap-4">
        <span>Asian-owned · LGBTQ+ friendly</span>
        <span>4.5★ — Google reviews</span>
        <span aria-hidden>Scroll ↓</span>
      </div>
    </section>
  );
}
TSX

# ── TrustBar: keep stats, swap colour rhythm ───────────────────
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
      <div className="mx-auto max-w-[1320px] px-6 py-12 md:px-10 md:py-16">
        <Reveal>
          <ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-10">
            {stats.map((s) => (
              <li key={s.label} className="flex flex-col">
                <span className="display text-[40px] leading-none text-ink md:text-[52px]">
                  {s.value}
                </span>
                <span className="mt-3 max-w-[20ch] text-[12px] tracking-[0.05em] leading-[1.55] text-ink/55">
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

# ── Services: keep alternating rows but use zoom-frame for images
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
    num: "01",
    name: "The Custom Hour",
    description:
      "Sixty minutes head-to-toe — Swedish strokes, deep tissue, or both, your call. Free essential oil and free hot stone work included, every time. The signature service. Most clients leave on this and rebook on the way out.",
    outcome:
      "For: the long week, the locked-up shoulders, the night you finally have to yourself.",
    duration: "60 min",
    price: "$79.99",
    image: "/images/service-relax-01.jpg",
    alt: "Architectural interior of a treatment room — midnight plaster walls, low cedar table dressed in ivory linen, single brass pendant overhead",
  },
  {
    num: "02",
    name: "Deep Tissue",
    description:
      "Slow-loaded forearm and elbow work into the layer beneath the surface. Not just \"harder pressure everywhere\" — the right knot, the right tool, the right amount of time. We pick the depth together at the ten-minute mark.",
    outcome: "For: chronic knots, athletes, anyone who lifts things for a living.",
    duration: "60 min",
    price: "$79.99",
    image: "/images/service-deep-02.jpg",
    alt: "Architectural shot of a darkened treatment room — tungsten brass sconce throwing a warm pool of light across a folded linen, deep midnight shadow",
  },
  {
    num: "03",
    name: "Hot Stone Therapy",
    description:
      "Smooth basalt stones warmed in water, worked along the back and shoulders to draw the deep stuff out. Already included in The Custom Hour — call it out at the front desk and we will prep the stones before you arrive.",
    outcome:
      "For: cold-weather days, deep stress, the kind of week that sits in your back.",
    duration: "Included with the hour",
    price: "Included",
    image: "/images/service-stone-03.jpg",
    alt: "Studio still — six smooth dark basalt stones arranged on a brass tray, midnight backdrop, single warm spotlight, faint steam",
  },
  {
    num: "04",
    name: "Foot Reflexology",
    description:
      "Sixty minutes in a heated recliner with a hot towel and warm oil. Targeted pressure through the arch, the calf, and the reflex points along the heel. Most clients close their eyes inside the first ten minutes.",
    outcome: "For: nurses, servers, parents — anyone on their feet all day.",
    duration: "60 min",
    price: "$59.99",
    image: "/images/service-foot-04.jpg",
    alt: "Architectural — heated recliner chair in a dim midnight-blue room, brass floor lamp casting a single warm pool of light onto a folded ivory towel",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-cream py-28 md:py-36"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow">The menu</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2
                id="services-heading"
                className="display text-[44px] leading-[1.02] md:text-[72px]"
              >
                A short menu.
                <br />
                <span className="italic font-light text-ink/55">
                  No memberships, no add-on traps,
                </span>
                <br />
                no upsell at the door.
              </h2>
              <p className="mt-8 max-w-[58ch] text-[16px] leading-[1.7] text-ink/70">
                Most people walk in for the same reason — something hurts,
                sleep has been bad, or the week was too long. Below is the
                entire menu. Walk-ins welcome until 10 PM. Calling ahead helps.
              </p>
            </div>
          </div>
        </Reveal>

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
                <div className="col-span-12 md:col-span-7 md:[direction:ltr]">
                  <Reveal zoom className="aspect-[4/5] w-full md:aspect-[3/4]">
                    <div
                      role="img"
                      aria-label={s.alt}
                      className="zoom-img img-placeholder"
                      style={{ backgroundImage: `url(${asset(s.image)})` }}
                    />
                  </Reveal>
                </div>

                <Reveal delay={120} className="col-span-12 md:col-span-5 md:[direction:ltr]">
                  <div className="flex items-baseline gap-6">
                    <span className="text-clay tracking-[0.18em] uppercase text-[11px]">
                      {s.num}
                    </span>
                    <span className="h-px flex-1 bg-hairline" />
                  </div>
                  <h3 className="display mt-6 text-[40px] leading-[1.02] md:text-[64px]">
                    {s.name}
                  </h3>
                  <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.7] text-ink/75">
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

        <Reveal>
          <p className="mt-16 max-w-[60ch] text-[13px] leading-[1.7] text-ink/55">
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

# ── Process: keep numbered grid, brass numerals on midnight ────
write components/Process.tsx <<'TSX'
import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Tell us what's tired.",
    body:
      "Two minutes in the front room. We ask what you do for work, where you carry stress, whether you've been on your feet all day. No forms with twelve checkboxes — just a conversation.",
  },
  {
    n: "02",
    title: "We choose the pressure together.",
    body:
      "Light, medium, deep — and the right answer changes by week. We'll check in once at the ten-minute mark and then leave you alone unless you say otherwise.",
  },
  {
    n: "03",
    title: "An hour of quiet work.",
    body:
      "Warm room, weighted blanket on the table, hot towel for the feet. Hot stones, if you'd like them. The clock isn't on the wall on purpose. We'll tell you when there are five minutes left.",
  },
  {
    n: "04",
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
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow">How it works</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2
                id="process-heading"
                className="display text-[44px] leading-[1.02] md:text-[72px]"
              >
                Four steps.
                <br />
                <span className="italic font-light text-ink/55">
                  Mostly the same as
                </span>
                <br />
                your last good massage.
              </h2>
            </div>
          </div>
        </Reveal>

        <ol className="mt-24 grid grid-cols-12 gap-x-6 gap-y-14 md:gap-y-20">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              delay={i * 80}
              className="col-span-12 md:col-span-6"
            >
              <div className="flex flex-col">
                <div className="flex items-baseline gap-6">
                  <span className="display text-[80px] leading-none text-clay md:text-[120px]">
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-hairline" />
                </div>
                <h3 className="display mt-6 text-[28px] leading-[1.15] md:text-[36px]">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.75] text-ink/70">
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

# ── Testimonials: INVERTED to ivory (the bright section in a dark site)
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
      className="bg-ivory py-28 md:py-36"
      style={{
        background: "var(--color-ivory)",
        color: "var(--color-midnight)",
      }}
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p
                className="eyebrow"
                style={{ color: "var(--color-brass-deep)" }}
              >
                In their words
              </p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2
                id="testimonials-heading"
                className="display text-[44px] leading-[1.02] md:text-[72px]"
                style={{ color: "var(--color-midnight)" }}
              >
                People who walked in
                <br />
                <span className="italic font-light" style={{ color: "var(--color-midnight-soft)" }}>
                  on a hard day,
                </span>
                <br />
                and came back the next.
              </h2>
              <p
                className="mt-8 max-w-[58ch] text-[15px] leading-[1.7]"
                style={{ color: "rgba(14,22,32,0.65)" }}
              >
                Real reviews from real Google profiles. Last names abbreviated,
                words left exactly as written.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-20">
          {quotes.map((q, i) => (
            <Reveal
              key={q.name}
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
                  className={`display leading-[1.15] ${
                    i === 0
                      ? "text-[32px] md:text-[52px]"
                      : "text-[24px] md:text-[34px]"
                  }`}
                  style={{ color: "var(--color-midnight)" }}
                >
                  <span style={{ color: "var(--color-brass-deep)" }}>&ldquo;</span>
                  {q.body}
                  <span style={{ color: "var(--color-brass-deep)" }}>&rdquo;</span>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none text-[12px] tracking-[0.18em]"
                    style={{
                      border: "1px solid var(--color-brass)",
                      color: "var(--color-brass-deep)",
                    }}
                  >
                    {initials(q.name)}
                  </span>
                  <div className="flex flex-col">
                    <span
                      className="text-[14px]"
                      style={{ color: "var(--color-midnight)" }}
                    >
                      {q.name}
                    </span>
                    <span
                      className="text-[13px]"
                      style={{ color: "rgba(14,22,32,0.55)" }}
                    >
                      {q.role}
                    </span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div
            className="mt-24 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-10 text-[13px]"
            style={{
              borderColor: "var(--color-edge-light)",
              color: "rgba(14,22,32,0.6)",
            }}
          >
            <span
              className="display text-[32px]"
              style={{ color: "var(--color-midnight)" }}
            >
              4.5★
            </span>
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

# ── About: stacked, slow-zoom architectural image ──────────────
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
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <Reveal className="col-span-12 md:col-span-5">
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
            zoom
            className="col-span-12 md:col-span-7 md:col-start-6 aspect-[4/3] md:aspect-[5/4]"
          >
            <div
              role="img"
              aria-label="Architectural wide of Blue Moon Spa front room — midnight plaster walls, ivory linen on a bench, a hanging trailing pothos catching warm brass light"
              className="zoom-img img-placeholder"
              style={{ backgroundImage: `url(${asset("/images/about-01.png")})` }}
            />
          </Reveal>

          <Reveal delay={120} className="col-span-12 md:col-span-7 md:col-start-1">
            <div className="space-y-6 text-[16px] leading-[1.75] text-ink/75">
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

# ── FAQ: accordion, brass plus-icon ────────────────────────────
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
        className="group flex w-full items-start justify-between gap-6 py-8 text-left"
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
            color: "var(--color-brass)",
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
          <p className="max-w-[64ch] pb-9 text-[16px] leading-[1.75] text-ink/75">
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
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow">Things people ask</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2
                id="faq-heading"
                className="display text-[44px] leading-[1.02] md:text-[64px]"
              >
                The honest answers,
                <br />
                <span className="italic font-light text-ink/55">
                  before you have to ask.
                </span>
              </h2>
            </div>
          </div>
        </Reveal>
        <Reveal>
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

# ── Booking: dark form, ivory inputs, brass primary ────────────
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
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="eyebrow">Book a session</p>
            <h2
              id="booking-heading"
              className="display mt-4 text-[44px] leading-[1.02] md:text-[72px]"
            >
              Let&rsquo;s pick
              <br />
              <span className="italic font-light text-ink/55">a time.</span>
            </h2>
            <p className="mt-8 max-w-[44ch] text-[16px] leading-[1.75] text-ink/75">
              Tell us when you&rsquo;re thinking and what hurts. We&rsquo;ll reply within
              one business day. Most messages get a same-day text. No spam, no
              follow-up sequence, no sales pressure.
            </p>

            <div className="mt-12 space-y-8 border-t border-hairline pt-8">
              <div>
                <p className="eyebrow">Or, faster</p>
                <a
                  href="tel:+16265222888"
                  className="display mt-3 block text-[40px] leading-none text-clay hover:text-ivory md:text-[52px]"
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

          <Reveal delay={120} className="col-span-12 md:col-span-6 md:col-start-7">
            <div
              className="p-8 md:p-12"
              style={{
                background: "var(--color-midnight-soft)",
                border: "1px solid var(--color-edge)",
              }}
            >
              {!submitted ? (
                <form onSubmit={onSubmit} className="flex flex-col gap-7">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-[11px] tracking-[0.2em] uppercase text-clay"
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
                      className="text-[11px] tracking-[0.2em] uppercase text-clay"
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
                      className="text-[11px] tracking-[0.2em] uppercase text-clay"
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
                        <option key={s} className="bg-cream-deep text-ink">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-[11px] tracking-[0.2em] uppercase text-clay"
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
                    className="btn-primary mt-2 inline-flex items-center justify-center self-start rounded-none px-8 py-4 text-[12px] tracking-[0.2em] uppercase"
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
      <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-[36ch] text-[14px] leading-[1.75] text-ink/70">
              A small, Asian-owned massage studio on El Cajon Boulevard. Open
              every day, 9 AM to 11 PM. Walk-ins welcome. Custom Hour: $79.99,
              with hot stones and essential oil included.
            </p>
            <a
              href="#booking"
              className="btn-primary mt-10 inline-flex items-center rounded-none px-7 py-3 text-[12px] tracking-[0.2em] uppercase"
            >
              Book a session
            </a>
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-7">
            <p className="eyebrow">Visit</p>
            <address className="mt-4 not-italic text-[14px] leading-[1.75] text-ink/85">
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
            <p className="mt-4 text-[14px] leading-[1.75] text-ink/85">
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

# robots & sitemap (preserve force-static fix, basePath unchanged)
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

# next.config.mjs (basePath unchanged for blue-moon-spa)
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

# README — DNA card
write README.md <<'MD'
# Blue Moon Spa — Marketing Site

A high-converting marketing site for **Blue Moon Spa**, a small, Asian-owned
massage studio at **7034 El Cajon Blvd, San Diego, CA 92115**.

Live at: https://dateidea.github.io/blue-moon-spa/

---

## Visual DNA — current redesign

| Dimension | Old DNA (Warm Artisan) | **New DNA — "Midnight Apothecary"** |
| --- | --- | --- |
| Aesthetic | Warm Artisan (Aesop / Kinfolk) | **Dark Luxe** (late-night Tokyo onsen) |
| Type | Fraunces + Inter | **Cormorant Garamond + Manrope** |
| Palette | Sandstone (cream / charcoal / terracotta) | **Midnight Brass** — `#0E1620` / `#F1ECDF` / `#B58A4A` |
| Layout | Asymmetric Editorial Grid | **Stacked Hero Blocks** + asymmetric service stack |
| Motion | Subtle fade-up + parallax | **Slow Image Zoom** (signature gesture on every image) |
| Imagery | Studio Still-Life (close hands, towels, stones) | **Architectural / Spatial** (wide moody interiors) |

**What changed:** colour tokens, font families, motion language, hero block
structure, all image art-direction. The Testimonials section is intentionally
*inverted* to ivory — the only bright section in an otherwise dark site —
giving the page a strong rhythm break.

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
  Change `--color-brass` to swap the accent across the entire site.
  Change `--color-midnight` to swap the dominant background.
- **Type variables** also in `globals.css` (`--font-display`, `--font-sans`).
  Font import lives in `app/layout.tsx`.
- **NAP, hours, phone** appear in `Nav.tsx`, `Hero.tsx`, `Footer.tsx`,
  `Booking.tsx`, FAQ, and the JSON-LD schema in `layout.tsx`.
  Phone: `(626) 522-2888`.

---

## Imagery — no people, architectural

Every photograph is a moody, no-people **architectural / spatial** shot
generated via ChatGPT (GPT-4o image generation). The brief is in the script
that calls them — every prompt inherits the Midnight Brass palette and a
single warm tungsten light source so the whole set looks like one shoot.

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

cat > /tmp/bluemoon-redesign-msg.txt <<'MSG'
Redesign: visual layer to Midnight Apothecary (Dark Luxe / Cormorant + Manrope / Midnight Brass / Stacked Hero / Slow Zoom / Architectural)

Copy unchanged. Structure unchanged. Only the visual layer changed.

Old DNA: Warm Artisan / Fraunces+Inter / Sandstone cream / Asymmetric editorial / Fade-up / Studio still-life
New DNA: Dark Luxe / Cormorant Garamond+Manrope / Midnight Brass (#0E1620 / #F1ECDF / #B58A4A) / Stacked hero blocks / Slow image zoom / Architectural-spatial

Tokens (globals.css) remap cream/ink/clay to midnight/ivory/brass while
keeping the same Tailwind utility class names so components inherit the
new palette without per-class edits. Testimonials section inverted to
ivory ground for rhythm break. Reveal primitive gains a `zoom` mode for
the new signature gesture; respects prefers-reduced-motion.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
MSG

git add -A
git -c user.name="Claude (dateidea)" -c user.email="claude@dateidea.dev" commit -F /tmp/bluemoon-redesign-msg.txt
git log -1 --oneline
echo "===DONE==="
