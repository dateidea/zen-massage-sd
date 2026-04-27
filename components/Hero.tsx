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
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const elapsed = (t - start) / 1000;
      const s = 1 + Math.min(0.06, elapsed * 0.004);
      node.style.transform = `scale(${s})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="top" className="relative isolate flex w-full flex-col bg-shadow text-ink">
      <div className="relative h-[65svh] w-full overflow-hidden md:h-[68svh]">
        <div ref={imgRef} className="image-luxe absolute inset-0 will-change-transform" style={{ backgroundImage: `url(${asset("/images/hero-01.jpg")})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,16,26,0.65) 0%, rgba(7,16,26,0.30) 35%, rgba(7,16,26,0.95) 100%)" }} aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-32 mx-auto flex max-w-[1320px] items-center justify-between px-6 text-[10px] tracking-[0.32em] uppercase text-clay/85 md:px-10">
          <span>Oasis 8 Massage</span>
          <span aria-hidden className="hidden md:inline">7900 El Cajon Blvd &middot; La Mesa</span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-[1320px] items-end justify-between px-6 text-[10px] tracking-[0.32em] uppercase text-ink/55 md:px-10">
          <span>Walk-ins welcome &middot; 10% off military</span>
          <span aria-hidden className="hidden md:inline">Scroll &darr;</span>
        </div>
      </div>
      <div className="brass-rule" aria-hidden />
      <div className="bg-shadow">
        <div className="mx-auto w-full max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-7">
              <p className="eyebrow mb-8">Oasis 8 Massage &middot; 7900 El Cajon Blvd &middot; La Mesa</p>
              <h1 className="display text-[44px] leading-[1.02] sm:text-[64px] md:text-[88px] lg:text-[104px]">
                An honest hour
                <br />
                <span className="italic font-light text-clay">for everywhere</span>
                <br />
                you carry it.
              </h1>
            </div>
            <div className="col-span-12 md:col-span-5 md:pt-6">
              <p className="max-w-[44ch] text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">A neighborhood massage studio at the corner of El Cajon Boulevard and 79th. Hot stones, deep tissue, foot reflexology &mdash; open every day, 10 AM to 9:30 PM. Combo: 30 min foot + 30 min body for $45.</p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a href="#booking" className="btn-primary inline-flex items-center rounded-none px-7 py-4 text-[12px] tracking-[0.16em] uppercase">Book a session</a>
                <a href="tel:+16194396708" className="link-underline text-[12px] tracking-[0.16em] text-ink/85 uppercase">Or call (619) 439-6708</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
