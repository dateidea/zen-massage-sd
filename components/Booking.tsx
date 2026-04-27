"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const services = [
  "Foot Massage — from $50 (60 min)",
  "Full Body with Hot Stones — from $60 (60 min)",
  "Deep Tissue — from $55 (60 min)",
  "Combo: 30 foot + 30 body — $45",
  "Combo: 40 foot + 40 body — $60",
  "Couples Room — call for current rate",
  "Not sure — recommend something",
];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); setSubmitted(true); }
  return (
    <section id="booking" className="relative overflow-hidden bg-cream-deep py-24 md:py-32" aria-labelledby="booking-heading">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="eyebrow">Book a session</p>
            <h2 id="booking-heading" className="display mt-4 text-[40px] leading-[1.04] text-ink md:text-[64px]">Let us pick<br /><span className="italic font-light text-clay">a time.</span></h2>
            <p className="mt-8 max-w-[44ch] text-[17px] leading-[1.7] text-ink-soft">Tell us when you are thinking and what hurts. We will reply within one business day. Most messages get a same-day text. No spam, no follow-up sequence, no sales pressure.</p>
            <div className="mt-10 space-y-6 border-t border-hairline pt-8">
              <div>
                <p className="text-[11px] tracking-[0.20em] uppercase text-mid">Or, faster</p>
                <a href="tel:+16194396708" className="display mt-3 block text-[36px] leading-none text-ink hover:text-clay md:text-[44px]">(619) 439-6708</a>
                <p className="mt-3 text-[14px] text-ink-soft">Picked up by a real person, every day, 10 AM &ndash; 9:30 PM.</p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.20em] uppercase text-mid">Walk-ins</p>
                <p className="mt-3 text-[15px] text-ink-soft">7900 El Cajon Blvd, Suite C, La Mesa, CA 91942. Free lot in front. We can almost always fit you in within 30 minutes &mdash; try us.</p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.20em] uppercase text-mid">Email</p>
                <a href="mailto:oasis8massage@gmail.com" className="link-underline mt-3 inline-block text-[15px] text-clay">oasis8massage@gmail.com</a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="border border-hairline bg-shadow p-8 md:p-12">
              {!submitted ? (
                <form onSubmit={onSubmit} className="flex flex-col gap-7">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[11px] tracking-[0.18em] uppercase text-mid">Your name</label>
                    <input id="name" name="name" required autoComplete="name" className="border-b border-hairline bg-transparent py-3 text-[17px] text-ink placeholder:text-mid/60 focus:border-clay focus:outline-none" placeholder="First and last" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact" className="text-[11px] tracking-[0.18em] uppercase text-mid">Phone or email</label>
                    <input id="contact" name="contact" required className="border-b border-hairline bg-transparent py-3 text-[17px] text-ink placeholder:text-mid/60 focus:border-clay focus:outline-none" placeholder="Whatever is easiest" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="service" className="text-[11px] tracking-[0.18em] uppercase text-mid">What you are thinking</label>
                    <select id="service" name="service" defaultValue={services[0]} className="border-b border-hairline bg-transparent py-3 text-[17px] text-ink focus:border-clay focus:outline-none">
                      {services.map((s) => (<option key={s} className="bg-shadow text-ink">{s}</option>))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[11px] tracking-[0.18em] uppercase text-mid">When works &middot; what hurts (optional)</label>
                    <textarea id="message" name="message" rows={4} className="border-b border-hairline bg-transparent py-3 text-[17px] text-ink placeholder:text-mid/60 focus:border-clay focus:outline-none" placeholder="e.g. Tuesday after 6 — lower back, side sleeper. First visit." />
                  </div>
                  <button type="submit" className="btn-primary mt-2 inline-flex items-center justify-center self-start rounded-none px-7 py-4 text-[12px] tracking-[0.16em] uppercase">Request a time</button>
                  <p className="text-[12px] text-mid">We will respond within 1 business day. No spam. No sales pressure. Your info does not go anywhere else.</p>
                </form>
              ) : (
                <div className="flex min-h-[420px] flex-col justify-center">
                  <p className="eyebrow">Got it</p>
                  <h3 className="display mt-3 text-[34px] leading-[1.1] text-ink md:text-[40px]">Thanks. We will text you back today.</h3>
                  <p className="mt-6 max-w-[44ch] text-[16px] text-ink-soft">If you do not hear from us by tomorrow morning, please call <a href="tel:+16194396708" className="link-underline text-clay">(619) 439-6708</a>.</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
