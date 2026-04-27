import Reveal from "./Reveal";
import ZoomImage from "./ZoomImage";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-night text-cream pt-36 md:pt-44"
    >
      <div className="mx-auto max-w-[1080px] px-6 md:px-10 pb-24 md:pb-32">
        <Reveal>
          <p className="eyebrow mb-10">
            ZEN Massage &middot; 7086 El Cajon Blvd &middot; San Diego
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="display text-[56px] leading-[0.95] sm:text-[88px] md:text-[132px] lg:text-[164px]">
            An honest hour
            <br />
            <span className="italic font-light text-brass">for everywhere</span>
            <br />
            you carry it.
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-16 md:mt-20">
            <ZoomImage
              src="/images/hero-01.jpg"
              alt="The treatment room of ZEN Massage at dusk — folded ivory linen on cedar, a small ceramic dish of warm oil, a single dark river stone catching the last of the window light"
              ratio="aspect-[16/9] md:aspect-[21/9]"
              className="w-full"
            />
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-16 grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-10 md:items-end">
            <div className="md:col-span-7">
              <p className="max-w-[52ch] text-[18px] leading-[1.65] text-cream/80 md:text-[20px]">
                A neighborhood massage studio at the corner of El Cajon
                Boulevard and 79th. Hot stones, deep tissue, foot reflexology
                &mdash; open every day, 9:30 AM to 10 PM. Combo: 30 min foot +
                30 min body for $45.
              </p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <div className="flex flex-wrap items-center gap-5 md:justify-end">
                <a
                  href="#booking"
                  className="btn-primary inline-flex items-center rounded-full px-7 py-4 text-[11px] tracking-[0.22em] uppercase"
                >
                  Book a session
                </a>
                <a
                  href="tel:+16195480773"
                  className="link-underline text-[13px] tracking-[0.14em] uppercase text-cream/85"
                >
                  Or call (619) 548-0773
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 flex items-center justify-between border-t border-hairline pt-6 text-[10px] tracking-[0.32em] uppercase text-cream/55">
          <span>Walk-ins welcome &middot; 10% off military</span>
          <span aria-hidden className="hidden md:inline text-brass">
            Scroll &darr;
          </span>
        </div>
      </div>
    </section>
  );
}
