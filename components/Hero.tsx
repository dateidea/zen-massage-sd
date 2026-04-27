"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

export default function Hero() {
  const imgRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] w-full items-end overflow-hidden bg-ink text-cream">
      <div ref={imgRef} className="img-placeholder absolute inset-0 -z-10 will-change-transform"
        style={{ backgroundImage: `url(${asset("/images/hero-01.jpg")})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden />
      <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, rgba(28,26,23,0.55) 0%, rgba(28,26,23,0.10) 35%, rgba(28,26,23,0.65) 100%)" }} aria-hidden />
      <div className="mx-auto w-full max-w-[1320px] px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-9 lg:col-span-8">
            <p className="eyebrow mb-8 text-cream/70">Oasis 8 Massage &middot; 7900 El Cajon Blvd &middot; La Mesa</p>
            <h1 className="display text-[44px] leading-[0.98] sm:text-[64px] md:text-[88px] lg:text-[108px]">
              An honest hour
              <br />
              <span className="italic font-light text-cream/85">for everywhere</span>
              <br />
              you carry it.
            </h1>
            <p className="mt-8 max-w-[46ch] text-[17px] leading-[1.65] text-cream/80 md:text-[19px]">
              A neighborhood massage studio at the corner of El Cajon Boulevard and 79th. Hot stones, deep tissue, foot reflexology &mdash; open every day, 10 AM to 9:30 PM. Combo: 30 min foot + 30 min body for $45.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#booking" className="btn-primary inline-flex items-center rounded-full bg-cream px-7 py-4 text-[13px] tracking-[0.05em] uppercase text-ink hover:bg-clay hover:text-cream">Book a session</a>
              <a href="tel:+16194396708" className="link-underline text-[14px] tracking-[0.02em] text-cream/85">Or call (619) 439-6708</a>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-[1320px] items-end justify-between px-6 text-[11px] tracking-[0.18em] uppercase text-cream/55 md:px-10">
        <span>Walk-ins welcome &middot; 10% off military</span>
        <span aria-hidden className="hidden md:inline">Scroll &darr;</span>
      </div>
    </section>
  );
}
