import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-cream text-ink">
      <div className="mx-auto max-w-[1320px] px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-[36ch] text-[14px] leading-[1.7] text-ink-soft">A small neighborhood massage studio at 7086 El Cajon Blvd in La Mesa. Hot stones, deep tissue, foot reflexology. Open every day, 10 AM to 9:30 PM. Walk-ins welcome. 10% off active duty and veterans.</p>
            <a href="#booking" className="btn-primary mt-8 inline-flex items-center px-6 py-3 text-[13px] font-medium">Book a session</a>
          </div>
          <div className="col-span-6 md:col-span-2 md:col-start-7">
            <p className="text-[10px] tracking-[0.20em] uppercase text-clay-deep">Visit</p>
            <address className="mt-4 not-italic text-[14px] leading-[1.7] text-ink">7086 El Cajon Blvd<br />Suite C<br />La Mesa, CA 91942</address>
            <a href="https://maps.app.goo.gl/BzZuUZrvG5NLdQzK6" target="_blank" rel="noreferrer" className="link-underline mt-4 inline-block text-[13px] text-ink-soft">Get directions &rarr;</a>
          </div>
          <div className="col-span-6 md:col-span-2">
            <p className="text-[10px] tracking-[0.20em] uppercase text-clay-deep">Hours</p>
            <p className="mt-4 text-[14px] leading-[1.7] text-ink">Mon &ndash; Sun<br />10:00 AM &ndash; 9:30 PM</p>
          </div>
          <div className="col-span-12 md:col-span-3">
            <p className="text-[10px] tracking-[0.20em] uppercase text-clay-deep">Reach us</p>
            <a href="tel:+16195480773" className="display mt-3 block text-[26px] leading-none text-ink font-medium">(619) 548-0773</a>
            <a href="mailto:oasis8massage@gmail.com" className="link-underline mt-3 inline-block text-[13px] text-ink-soft">oasis8massage@gmail.com</a>
            <ul className="mt-6 flex flex-col gap-2 text-[13px] text-ink-soft">
              <li><a className="link-underline" href="#services">Services</a></li>
              <li><a className="link-underline" href="#about">About</a></li>
              <li><a className="link-underline" href="#faq">FAQ</a></li>
              <li><a className="link-underline" href="#booking">Book</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-[12px] text-mid md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} Oasis 8 Massage. All rights reserved.</p>
          <p>Cash &amp; card &middot; Walk-ins welcome &middot; 10% off military</p>
        </div>
      </div>
    </footer>
  );
}
