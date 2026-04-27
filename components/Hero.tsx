"use client";

import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate w-full overflow-hidden text-cream min-h-[100svh] flex flex-col justify-end"
    >
      {/* Background image */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `url(${asset("/images/hero-01.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Scrim for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,20,18,0.50) 0%, rgba(20,20,18,0.18) 35%, rgba(20,20,18,0.55) 70%, rgba(20,20,18,0.88) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-6 pt-32 pb-16 md:px-10 md:pt-40 md:pb-24">
        <div className="grid grid-cols-12 gap-6">
          <Reveal variant="fade" className="col-span-12">
            <p className="eyebrow mb-10 text-cream/80">
              ZEN Massage &middot; <span className="smallcaps">Established</span>
              {" "}on El Cajon Boulevard, San Diego
            </p>
          </Reveal>
          <Reveal variant="curtain-up" className="col-span-12">
            <h1 className="display text-[44px] leading-[1.0] sm:text-[64px] md:text-[92px] lg:text-[112px] text-cream">
              An honest hour
              <br />
              <span className="italic font-light text-cream/70">
                your shoulders have been
              </span>
              <br />
              waiting for.
            </h1>
          </Reveal>

          <Reveal variant="fade" delay={200} className="col-span-12 md:col-span-7 mt-12">
            <p className="max-w-[46ch] text-[17px] leading-[1.75] text-cream/85 md:text-[19px]">
              A small, Asian-owned massage studio on El Cajon Boulevard.
              Sixty minutes of Swedish, deep tissue, or both — with hot
              stones and warm essential oil included, every time. Open
              every day, 9:30 AM – 10 PM. Custom Hour, $79.99.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#booking"
                className="inline-flex items-center bg-cream text-ink px-7 py-4 text-[12px] tracking-[0.22em] uppercase hover:bg-clay hover:text-cream transition-colors"
              >
                Book a session
              </a>
              <a
                href="tel:+16195480773"
                className="link-underline text-[14px] tracking-[0.05em] text-cream"
              >
                Or call (619) 548-0773
              </a>
            </div>
          </Reveal>

          <Reveal
            variant="fade"
            delay={300}
            className="col-span-12 md:col-span-4 md:col-start-9 mt-12 self-end"
          >
            <div className="border-t border-cream/30 pt-6 text-[13px] text-cream/70 md:text-right">
              <span className="block eyebrow text-[10px] mb-2 text-cream/60">Open Tonight</span>
              Until 11&nbsp;PM &middot; walk-ins welcome <br />
              Hot stones &middot; essential oil &middot; included
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1180px] px-6 pb-6 text-[11px] tracking-[0.22em] uppercase text-cream/65 md:px-10 md:pb-8 flex flex-wrap items-center justify-between gap-4">
        <span>Asian-owned · LGBTQ+ friendly</span>
        <span>4.7★ — Google reviews</span>
        <span aria-hidden>Scroll ↓</span>
      </div>
    </section>
  );
}
