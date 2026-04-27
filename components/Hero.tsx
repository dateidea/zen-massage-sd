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
