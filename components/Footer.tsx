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
            © {new Date().getFullYear()} ZEN Massage. All rights reserved.
          </p>
          <p>Asian-owned · LGBTQ+ friendly · Tipping never required</p>
        </div>
      </div>
    </footer>
  );
}
