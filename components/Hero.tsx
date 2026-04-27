"use client";

import { asset } from "@/lib/asset";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" className="relative isolate flex w-full flex-col bg-cream text-ink pt-28 md:pt-36">
      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 pb-12 md:gap-12 md:pb-16">
          <Reveal className="col-span-12 md:col-span-7">
            <p className="eyebrow mb-6">Oasis 8 Massage &middot; 7900 El Cajon Blvd &middot; La Mesa</p>
            <h1 className="display text-[44px] leading-[1.04] sm:text-[60px] md:text-[80px] lg:text-[96px] font-medium">
              An honest hour
              <br />
              <span className="text-clay-deep font-normal">for everywhere</span>
              <br />
              you carry it.
            </h1>
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-5 md:pt-12">
            <p className="max-w-[44ch] text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
              A neighborhood massage studio at the corner of El Cajon Boulevard and 79th. Hot stones, deep tissue, foot reflexology &mdash; open every day, 10 AM to 9:30 PM. Combo: 30 min foot + 30 min body for $45.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#booking" className="btn-primary inline-flex items-center px-7 py-4 text-[14px] font-medium">Book a session</a>
              <a href="tel:+16194396708" className="link-underline text-[14px] tracking-[-0.005em] text-ink/80">Or call (619) 439-6708</a>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="card card-img relative h-[60svh] w-full overflow-hidden md:h-[70svh]">
            <div
              className="image-soft absolute inset-0"
              style={{ backgroundImage: `url(${asset("/images/hero-01.jpg")})`, backgroundSize: "cover", backgroundPosition: "center" }}
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-[1320px] items-end justify-between px-6 text-[10px] tracking-[0.20em] uppercase text-ink/55 md:px-10">
              <span>Walk-ins welcome &middot; 10% off military</span>
              <span aria-hidden className="hidden md:inline">Scroll &darr;</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
