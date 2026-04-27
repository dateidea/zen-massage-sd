"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/**
 * Hero — image-with-text-overlay.
 * Full-bleed photograph, gentle dark scrim for legibility,
 * headline + subhead + CTAs floating on top.
 * Slow background zoom on scroll (parallax-like, respects
 * prefers-reduced-motion).
 */
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
        node.style.transform = `translate3d(0, ${y * 0.08}px, 0) scale(1.06)`;
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
            "linear-gradient(180deg, rgba(42,26,31,0.55) 0%, rgba(42,26,31,0.10) 35%, rgba(42,26,31,0.78) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-10 lg:col-span-9">
            <p
              className="eyebrow mb-8"
              style={{ color: "rgba(242,235,219,0.78)" }}
            >
              Blue Moon Spa &middot;{" "}
              <span className="smallcaps">Established</span> on El Cajon
              Boulevard, San Diego
            </p>
            <h1 className="display text-cream text-[44px] leading-[0.98] sm:text-[64px] md:text-[88px] lg:text-[108px]">
              An honest hour
              <br />
              <span
                className="italic font-light"
                style={{ color: "rgba(242,235,219,0.85)" }}
              >
                your shoulders have been
              </span>
              <br />
              waiting for.
            </h1>
            <p
              className="mt-8 max-w-[46ch] text-[17px] leading-[1.7] md:text-[19px]"
              style={{ color: "rgba(242,235,219,0.82)" }}
            >
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
                className="link-underline text-[14px] tracking-[0.05em]"
                style={{ color: "rgba(242,235,219,0.9)" }}
              >
                Or call (626) 522-2888
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-[1320px] items-end justify-between px-6 text-[11px] tracking-[0.22em] uppercase md:px-10"
        style={{ color: "rgba(242,235,219,0.6)" }}
      >
        <span>Asian-owned · LGBTQ+ friendly</span>
        <span aria-hidden className="hidden md:inline">
          4.5★ — Google reviews
        </span>
        <span aria-hidden className="hidden md:inline">
          Scroll ↓
        </span>
      </div>
    </section>
  );
}
