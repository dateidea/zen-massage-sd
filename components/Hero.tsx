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
        node.style.transform = `translate3d(0, ${y * 0.05}px, 0) scale(1.04)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-ink text-cream">
      <div ref={imgRef} className="img-placeholder absolute inset-0 -z-10 will-change-transform"
        style={{ backgroundImage: `url(${asset("/images/hero-01.jpg")})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden />
      <div className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, rgba(31,26,20,0.55) 0%, rgba(31,26,20,0.18) 40%, rgba(31,26,20,0.65) 100%)" }} aria-hidden />

      <div className="mx-auto w-full max-w-[1100px] px-6 pt-40 pb-32 text-center md:px-10 md:pt-48 md:pb-40">
        <p className="eyebrow text-cream/70">ZEN Massage &middot; 7086 El Cajon Blvd &middot; San Diego</p>
        <h1 className="display mt-10 text-[44px] leading-[1.02] sm:text-[60px] md:text-[84px] lg:text-[100px]">
          An honest hour
          <br />
          <span className="display-italic text-cream/85">for everywhere</span>
          <br />
          you carry it.
        </h1>
        <p className="mx-auto mt-10 max-w-[52ch] text-[17px] leading-[1.75] text-cream/82 md:text-[19px]">
          A neighborhood massage studio at the corner of El Cajon Boulevard and 79th. Hot stones, deep tissue, foot reflexology &mdash; open every day, 9:30 AM to 10 PM. Combo: 30 min foot + 30 min body for $45.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <a href="#booking" className="btn-primary inline-flex items-center rounded-full bg-cream px-8 py-4 text-[12px] tracking-[0.16em] uppercase text-ink">Book a session</a>
          <a href="tel:+16195480773" className="link-underline text-[14px] tracking-[0.04em] text-cream/85">Or call (619) 548-0773</a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-[1100px] items-end justify-between px-6 text-[10px] tracking-[0.24em] uppercase text-cream/55 md:px-10">
        <span>Walk-ins welcome &middot; 10% off military</span>
        <span aria-hidden className="hidden md:inline">Scroll &darr;</span>
      </div>
    </section>
  );
}
