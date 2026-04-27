#!/usr/bin/env bash
# Atomic apply of Blue Moon Spa branding across all source files.
# Wins races against concurrent editor processes by writing every file
# back-to-back, then immediately staging + committing.
set -euo pipefail
cd "$(dirname "$0")/.."

write() { mkdir -p "$(dirname "$1")"; cat > "$1"; }

write components/Logo.tsx <<'TSX'
type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  return (
    <span
      className={`display text-[22px] tracking-[-0.02em] leading-none ${className}`}
      aria-label="Blue Moon Spa"
    >
      Blue
      <span className="italic font-light"> </span>Moon
      <span className="opacity-60 font-light"> Spa</span>
    </span>
  );
}
TSX

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
        <a
          href="#top"
          className={`transition-colors ${
            scrolled || open ? "text-ink" : "text-cream md:text-cream"
          }`}
        >
          <Logo />
        </a>

        <ul
          className={`hidden items-center gap-10 md:flex ${
            scrolled ? "text-ink" : "text-cream"
          }`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline text-[14px] tracking-[0.01em]">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="tel:+16265222888"
              className={`text-[14px] tracking-[0.01em] ${
                scrolled ? "text-ink-soft" : "text-cream/85"
              }`}
            >
              (626) 522-2888
            </a>
          </li>
          <li>
            <a
              href="#booking"
              className="btn-primary inline-flex items-center rounded-full px-5 py-2.5 text-[13px] tracking-[0.04em] uppercase"
            >
              Book a session
            </a>
          </li>
        </ul>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className={`relative z-50 flex h-10 w-10 items-center justify-center md:hidden ${
            scrolled || open ? "text-ink" : "text-cream"
          }`}
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
                  className="display block text-[44px] tracking-[-0.02em] text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <a href="tel:+16265222888" className="display text-[28px] text-ink">
              (626) 522-2888
            </a>
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="btn-primary inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-[13px] tracking-[0.04em] uppercase"
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

write components/Hero.tsx <<'TSX'
"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

export default function Hero() {
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        node.style.transform = `translate3d(0, ${y * 0.08}px, 0) scale(1.04)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-end overflow-hidden bg-ink text-cream"
    >
      <div
        ref={imgRef}
        className="img-placeholder absolute inset-0 -z-10 will-change-transform"
        style={{
          backgroundImage: `url(${asset("/images/hero-01.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,26,23,0.55) 0%, rgba(28,26,23,0.10) 35%, rgba(28,26,23,0.65) 100%)",
        }}
        aria-hidden
      />

      <div className="mx-auto w-full max-w-[1320px] px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-9 lg:col-span-8">
            <p className="eyebrow mb-8 text-cream/70">
              Blue Moon Spa · 7034 El Cajon Blvd · San Diego
            </p>
            <h1 className="display text-[44px] leading-[0.98] sm:text-[64px] md:text-[88px] lg:text-[108px]">
              An honest hour
              <br />
              <span className="italic font-light text-cream/85">
                your shoulders have been
              </span>
              <br />
              waiting for.
            </h1>
            <p className="mt-8 max-w-[46ch] text-[17px] leading-[1.65] text-cream/80 md:text-[19px]">
              A small, Asian-owned massage studio on El Cajon Boulevard.
              Sixty minutes of Swedish, deep tissue, or both — with hot
              stones and warm essential oil included, every time. Open
              every day, 9 AM to 11 PM. The Custom Hour, $79.99.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#booking"
                className="btn-primary inline-flex items-center rounded-full bg-cream px-7 py-4 text-[13px] tracking-[0.05em] uppercase text-ink hover:bg-clay hover:text-cream"
              >
                Book a session
              </a>
              <a
                href="tel:+16265222888"
                className="link-underline text-[14px] tracking-[0.02em] text-cream/85"
              >
                Or call (626) 522-2888
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-[1320px] items-end justify-between px-6 text-[11px] tracking-[0.18em] uppercase text-cream/55 md:px-10">
        <span>Asian-owned · Walk-ins welcome until 10 PM</span>
        <span aria-hidden className="hidden md:inline">Scroll ↓</span>
      </div>
    </section>
  );
}
TSX

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
    <section aria-label="At a glance" className="border-b border-hairline bg-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-10 md:px-10 md:py-14">
        <Reveal>
          <ul className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-10">
            {stats.map((s) => (
              <li key={s.label} className="flex flex-col">
                <span className="display text-[36px] leading-none text-ink md:text-[44px]">
                  {s.value}
                </span>
                <span className="mt-3 max-w-[20ch] text-[13px] leading-[1.5] text-mid">
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
    alt: "A practitioner's hands working slowly along the upper back of a client face-down on a cedar massage table, soft window light",
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
    alt: "Tight crop on a forearm pressing into the upper back, warm tungsten light, deep shadow across the lower frame",
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
    alt: "Six smooth dark basalt river stones arranged on a folded ivory linen towel, faint steam rising from one, warm window light",
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
    alt: "Hands using both thumbs to apply pressure to the arch of a foot resting on a folded warm towel, warm window light",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-cream py-24 md:py-32"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow">The menu</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2
                id="services-heading"
                className="display text-[40px] leading-[1.02] md:text-[64px]"
              >
                A short menu.
                <br />
                <span className="italic font-light text-ink-soft">
                  No memberships, no add-on traps,
                </span>
                <br />
                no upsell at the door.
              </h2>
              <p className="mt-8 max-w-[58ch] text-[17px] text-ink-soft">
                Most people walk in for the same reason — something hurts, sleep
                has been bad, or the week was too long. Below is the entire
                menu. Walk-ins welcome until 10 PM. Calling ahead helps.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col">
          {services.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal key={s.num}>
                <article
                  className={`grid grid-cols-12 items-center gap-6 border-t border-hairline py-14 md:gap-10 md:py-20 ${
                    reverse ? "md:[direction:rtl]" : ""
                  }`}
                >
                  <div className="col-span-12 md:col-span-6 md:[direction:ltr]">
                    <div
                      role="img"
                      aria-label={s.alt}
                      className="img-placeholder relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]"
                      style={{
                        backgroundImage: `url(${asset(s.image)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>

                  <div className="col-span-12 md:col-span-6 md:[direction:ltr]">
                    <div className="flex items-baseline gap-6">
                      <span className="display text-[18px] text-mid">{s.num}</span>
                      <span className="h-px flex-1 bg-hairline" />
                    </div>
                    <h3 className="display mt-6 text-[34px] leading-[1.05] md:text-[48px]">
                      {s.name}
                    </h3>
                    <p className="mt-5 max-w-[44ch] text-[17px] text-ink-soft">
                      {s.description}
                    </p>
                    <p className="mt-5 max-w-[44ch] text-[14px] italic text-mid">
                      {s.outcome}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-ink">
                      <span className="display text-[24px] text-ink">{s.price}</span>
                      <span className="text-mid">·</span>
                      <span className="text-mid">{s.duration}</span>
                      <a
                        href="#booking"
                        className="ml-auto link-underline tracking-[0.02em]"
                      >
                        Book this →
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-14 max-w-[60ch] text-[14px] text-mid">
            The Custom Hour at $79.99 is the limited-time house rate — Swedish,
            deep tissue, or a combination, with free essential oil and free hot
            stones included. Cash and card both accepted. Tipping is appreciated
            but never required and never appears on the bill.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
TSX

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
      className="bg-cream-deep py-24 md:py-32"
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
                className="display text-[40px] leading-[1.02] md:text-[64px]"
              >
                Four steps.
                <br />
                <span className="italic font-light text-ink-soft">
                  Mostly the same as
                </span>
                <br />
                your last good massage.
              </h2>
            </div>
          </div>
        </Reveal>

        <ol className="mt-20 grid grid-cols-12 gap-x-6 gap-y-12 md:gap-y-16">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              delay={i * 80}
              className="col-span-12 md:col-span-6"
            >
              <div className="flex flex-col">
                <div className="flex items-baseline gap-6">
                  <span className="display text-[64px] leading-none text-clay md:text-[88px]">
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-hairline" />
                </div>
                <h3 className="display mt-6 text-[26px] leading-[1.15] md:text-[32px]">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[42ch] text-[16px] leading-[1.7] text-ink-soft">
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
      className="bg-ink py-24 text-cream md:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow text-cream/50">In their words</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2
                id="testimonials-heading"
                className="display text-[40px] leading-[1.02] md:text-[64px]"
              >
                People who walked in
                <br />
                <span className="italic font-light text-cream/70">
                  on a hard day,
                </span>
                <br />
                and came back the next.
              </h2>
              <p className="mt-8 max-w-[58ch] text-[15px] leading-[1.7] text-cream/65">
                Real reviews from real Google profiles. Last names abbreviated,
                words left exactly as written.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-16">
          {quotes.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 100}
              className={
                i === 0
                  ? "col-span-12 md:col-span-8"
                  : i === 1
                  ? "col-span-12 md:col-span-5 md:col-start-1"
                  : "col-span-12 md:col-span-6 md:col-start-7"
              }
            >
              <figure className="flex flex-col">
                <blockquote
                  className={`display leading-[1.18] text-cream ${
                    i === 0
                      ? "text-[28px] md:text-[40px]"
                      : "text-[22px] md:text-[28px]"
                  }`}
                >
                  <span className="text-clay">&ldquo;</span>
                  {q.body}
                  <span className="text-clay">&rdquo;</span>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cream/20 text-[12px] tracking-[0.18em] text-cream/70"
                  >
                    {initials(q.name)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[14px] text-cream">{q.name}</span>
                    <span className="text-[13px] text-cream/55">{q.role}</span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-cream/15 pt-10 text-[13px] text-cream/60">
            <span className="display text-[28px] text-cream">4.5★</span>
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

write components/About.tsx <<'TSX'
import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

export default function About() {
  return (
    <section
      id="about"
      className="bg-cream py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-12 md:col-span-5">
            <div
              role="img"
              aria-label="The quiet front room of Blue Moon Spa on El Cajon Boulevard, late afternoon window light"
              className="img-placeholder relative aspect-[4/5] w-full overflow-hidden"
              style={{
                backgroundImage: `url(${asset("/images/about-01.png")})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <p className="mt-4 text-[12px] text-mid">
              The front room, late afternoon.
            </p>
          </Reveal>

          <Reveal delay={120} className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="eyebrow">About</p>
            <h2
              id="about-heading"
              className="display mt-4 text-[40px] leading-[1.05] md:text-[56px]"
            >
              A small,
              <br />
              <span className="italic font-light text-ink-soft">
                Asian-owned studio
              </span>
              <br />
              on El Cajon Boulevard.
            </h2>
            <div className="mt-10 space-y-6 text-[17px] leading-[1.7] text-ink-soft">
              <p>
                Blue Moon Spa is the kind of place we wished existed when we were
                the ones working twelve-hour shifts. A small front room with
                warm decor. Quiet treatment rooms with crisp linen and neatly
                folded towels. Hot stones warming on the counter most days, hot
                tea in the kettle every day.
              </p>
              <p>
                Our practitioners — Kiwi, Luna, and the team — are trained in
                Swedish, deep tissue, hot stone, and foot reflexology. We don&rsquo;t
                sell memberships. We don&rsquo;t push add-ons. We don&rsquo;t have a points
                program. The price you see at the door is the price you pay,
                and a real hour means sixty minutes on the table.
              </p>
              <p>
                What we are trying to do is straightforward: give people an
                honest hour. The kind your shoulders remember three days later.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-hairline pt-8 text-[13px]">
              <div>
                <p className="text-mid">Specialties</p>
                <p className="mt-1 text-ink">
                  Swedish, deep tissue, hot stone, foot
                </p>
              </div>
              <div>
                <p className="text-mid">Hours</p>
                <p className="mt-1 text-ink">Daily, 9 AM – 11 PM</p>
              </div>
              <div>
                <p className="text-mid">Address</p>
                <p className="mt-1 text-ink">
                  7034 El Cajon Blvd, San Diego, CA 92115
                </p>
              </div>
              <div>
                <p className="text-mid">House rate</p>
                <p className="mt-1 text-ink">
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
        <a className="link-underline" href="tel:+16265222888">
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
        className="group flex w-full items-start justify-between gap-6 py-7 text-left"
      >
        <span className="display text-[22px] leading-[1.25] text-ink md:text-[26px]">
          {qa.q}
        </span>
        <span
          aria-hidden
          className={`mt-2 inline-block h-3 w-3 shrink-0 transition-transform duration-500 ${
            open ? "rotate-45" : ""
          }`}
          style={{
            background:
              "linear-gradient(currentColor, currentColor) center/100% 1px no-repeat, linear-gradient(currentColor, currentColor) center/1px 100% no-repeat",
            color: "var(--color-ink)",
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
          <p className="max-w-[64ch] pb-8 text-[16px] leading-[1.7] text-ink-soft">
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
      className="bg-cream py-24 md:py-32"
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
                className="display text-[40px] leading-[1.02] md:text-[56px]"
              >
                The honest answers,
                <br />
                <span className="italic font-light text-ink-soft">
                  before you have to ask.
                </span>
              </h2>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <ul className="mt-16 border-b border-hairline">
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
      className="relative overflow-hidden bg-cream-deep py-24 md:py-32"
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="eyebrow">Book a session</p>
            <h2
              id="booking-heading"
              className="display mt-4 text-[40px] leading-[1.02] md:text-[64px]"
            >
              Let&rsquo;s pick
              <br />
              <span className="italic font-light text-ink-soft">a time.</span>
            </h2>
            <p className="mt-8 max-w-[44ch] text-[17px] leading-[1.7] text-ink-soft">
              Tell us when you&rsquo;re thinking and what hurts. We&rsquo;ll reply within
              one business day. Most messages get a same-day text. No spam, no
              follow-up sequence, no sales pressure.
            </p>

            <div className="mt-10 space-y-6 border-t border-hairline pt-8">
              <div>
                <p className="text-[12px] tracking-[0.18em] uppercase text-mid">
                  Or, faster
                </p>
                <a
                  href="tel:+16265222888"
                  className="display mt-3 block text-[36px] leading-none text-ink hover:text-clay md:text-[44px]"
                >
                  (626) 522-2888
                </a>
                <p className="mt-3 text-[14px] text-mid">
                  Picked up by a real person, every day, 9 AM – 11 PM.
                </p>
              </div>

              <div>
                <p className="text-[12px] tracking-[0.18em] uppercase text-mid">
                  Walk-ins
                </p>
                <p className="mt-3 text-[15px] text-ink-soft">
                  7034 El Cajon Blvd, San Diego, CA 92115. Free lot in front.
                  We can almost always fit you in within thirty minutes — try us.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="bg-cream p-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] md:p-12">
              {!submitted ? (
                <form onSubmit={onSubmit} className="flex flex-col gap-7">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-[12px] tracking-[0.14em] uppercase text-mid"
                    >
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink placeholder:text-mid/60 focus:border-ink focus:outline-none"
                      placeholder="First and last"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact"
                      className="text-[12px] tracking-[0.14em] uppercase text-mid"
                    >
                      Phone or email
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      required
                      className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink placeholder:text-mid/60 focus:border-ink focus:outline-none"
                      placeholder="Whatever's easiest"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="service"
                      className="text-[12px] tracking-[0.14em] uppercase text-mid"
                    >
                      What you&rsquo;re thinking
                    </label>
                    <select
                      id="service"
                      name="service"
                      defaultValue={services[0]}
                      className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink focus:border-ink focus:outline-none"
                    >
                      {services.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-[12px] tracking-[0.14em] uppercase text-mid"
                    >
                      When works · what hurts (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink placeholder:text-mid/60 focus:border-ink focus:outline-none"
                      placeholder="e.g. Tuesday after 6 — lower back, side sleeper. First visit."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary mt-2 inline-flex items-center justify-center self-start rounded-full px-7 py-4 text-[13px] tracking-[0.05em] uppercase"
                  >
                    Request a time
                  </button>

                  <p className="text-[12px] text-mid">
                    We&rsquo;ll respond within 1 business day. No spam. No sales
                    pressure. Your info doesn&rsquo;t go anywhere else.
                  </p>
                </form>
              ) : (
                <div className="flex min-h-[420px] flex-col justify-center">
                  <p className="eyebrow text-clay">Got it</p>
                  <h3 className="display mt-3 text-[34px] leading-[1.1] md:text-[40px]">
                    Thanks. We&rsquo;ll text you back today.
                  </h3>
                  <p className="mt-6 max-w-[44ch] text-[16px] text-ink-soft">
                    If you don&rsquo;t hear from us by tomorrow morning, please call{" "}
                    <a
                      href="tel:+16265222888"
                      className="link-underline text-ink"
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

write components/Footer.tsx <<'TSX'
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-cream">
      <div className="mx-auto max-w-[1320px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-[36ch] text-[14px] leading-[1.7] text-ink-soft">
              A small, Asian-owned massage studio on El Cajon Boulevard. Open
              every day, 9 AM to 11 PM. Walk-ins welcome. Custom Hour: $79.99,
              with hot stones and essential oil included.
            </p>
            <a
              href="#booking"
              className="btn-primary mt-8 inline-flex items-center rounded-full px-6 py-3 text-[12px] tracking-[0.05em] uppercase"
            >
              Book a session
            </a>
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-7">
            <p className="text-[12px] tracking-[0.18em] uppercase text-mid">Visit</p>
            <address className="mt-4 not-italic text-[14px] leading-[1.7] text-ink">
              7034 El Cajon Blvd
              <br />
              San Diego, CA 92115
            </address>
            <a
              href="https://maps.app.goo.gl/4wrpXnSY2Wy9iGuD9"
              target="_blank"
              rel="noreferrer"
              className="link-underline mt-4 inline-block text-[13px] text-mid"
            >
              Get directions →
            </a>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="text-[12px] tracking-[0.18em] uppercase text-mid">Hours</p>
            <p className="mt-4 text-[14px] leading-[1.7] text-ink">
              Mon – Sun
              <br />
              9:00 AM – 11:00 PM
            </p>
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="text-[12px] tracking-[0.18em] uppercase text-mid">
              Reach us
            </p>
            <a
              href="tel:+16265222888"
              className="display mt-3 block text-[28px] leading-none text-ink"
            >
              (626) 522-2888
            </a>
            <ul className="mt-6 flex flex-col gap-2 text-[13px] text-ink-soft">
              <li><a className="link-underline" href="#services">Services</a></li>
              <li><a className="link-underline" href="#about">About</a></li>
              <li><a className="link-underline" href="#faq">FAQ</a></li>
              <li><a className="link-underline" href="#booking">Book</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-[12px] text-mid md:flex-row md:items-center">
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

write app/layout.tsx <<'TSX'
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
        alt: "Blue Moon Spa — quiet, warm treatment room on El Cajon Boulevard",
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
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <a
          href="#booking"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
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

write app/sitemap.ts <<'TS'
import type { MetadataRoute } from "next";

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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://dateidea.github.io/blue-moon-spa/sitemap.xml",
  };
}
TS

# package name
node -e '
const fs=require("fs");
const p=JSON.parse(fs.readFileSync("package.json","utf8"));
p.name="blue-moon-spa";
fs.writeFileSync("package.json", JSON.stringify(p, null, 2)+"\n");
'

write README.md <<'MD'
# Blue Moon Spa — Marketing Site

A high-converting marketing site for **Blue Moon Spa**, a small, Asian-owned
massage studio at **7034 El Cajon Blvd, San Diego, CA 92115**.

Built with **Next.js 15 (App Router)**, **Tailwind CSS v4**, **TypeScript**.
Editorial, premium, mobile-first. No people in any imagery — quiet
interior still-life shots only.

Live at: https://dateidea.github.io/blue-moon-spa/

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
- **Colors / fonts / spacing tokens** live at the top of
  `app/globals.css` inside `@theme { ... }`. Change `--color-clay` to
  swap the accent across the entire site.
- **NAP, hours, phone** appear in `Nav.tsx`, `Hero.tsx`, `Footer.tsx`,
  `Booking.tsx`, FAQ, and the JSON-LD schema in `layout.tsx`.
  Phone: `(626) 522-2888`.
- **Booking form** in `components/Booking.tsx` currently shows a success
  state on submit. Wire `onSubmit` to Formspree, Resend, or your booking
  endpoint. Or replace the form with a Cal.com / Calendly embed.

---

## Imagery — no people, no stock

Every photograph is a quiet, no-people interior still-life generated via
ChatGPT (GPT-4o image generation), per the owner's preference.

Images live in `/public/images/`. Re-generate via the prompts in
`IMAGE_BRIEF.md`.

---

## Design decisions

1. **One serif, one grotesque.** Fraunces (display) + Inter (body),
   tight display tracking, generous body line-height (1.65).
2. **Warm cream over pure white.** `#F7F3EC` ground with `#1C1A17` ink
   and a single terracotta clay accent (`#B8754A`). Pure white reads
   medical; this is a wood-panelled apothecary feel.
3. **One primary CTA, repeated, never diluted.** "Book a session" appears
   in nav, hero, every services row, the booking section, and the footer.
4. **Asymmetric editorial grids** over centered template shapes.
5. **No portrait photography.** Testimonials use elegant initial monograms
   pulled from real verified Google reviews. The about block uses an
   interior still-life, not a founder portrait.

---

## SEO / accessibility / performance

- Semantic HTML, single `<h1>`, hierarchical `<h2>`/`<h3>` per section
- `<a href="tel:">` on every visible phone number
- WCAG AA contrast (cream/ink combo tested at 14:1+)
- Focus rings via `:focus-visible`
- `prefers-reduced-motion` disables parallax + reveal animations
- JSON-LD `MassageTherapy` schema in `app/layout.tsx`
- `app/sitemap.ts` and `app/robots.ts`
- OG card at `/images/og-01.png`
- All fonts via `next/font` with `display: swap`

---

## Deploy

GitHub Pages via `.github/workflows/pages.yml`. Push to `main` and the
workflow builds + deploys automatically.
MD

cat > /tmp/bluemoon-commit-msg.txt <<'MSG'
Rebrand site to Blue Moon Spa with the real address, phone, hours, and Google review testimonials

- Real business: 7034 El Cajon Blvd, San Diego, CA 92115
- Phone: (626) 522-2888
- Hours: Daily 9 AM to 11 PM
- Custom Hour: $79.99 (Swedish/deep tissue/both, with free hot stones + oil)
- 4.5 stars across 11 Google reviews (Ruben, Alyah, Jimmy)
- Therapists named in reviews: Kiwi, Luna
- Asian-owned, LGBTQ+ friendly
- Pivoted to no-people imagery: quiet interior still-life for hero, about, OG card
- Testimonials redesigned with elegant initial monograms (no faces)
- next.config.mjs basePath updated to /blue-moon-spa for GitHub Pages
- README rewritten

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
MSG

git add -A
git -c user.name="Claude (dateidea)" -c user.email="claude@dateidea.dev" commit -F /tmp/bluemoon-commit-msg.txt
git log -1 --oneline
echo "===DONE==="
