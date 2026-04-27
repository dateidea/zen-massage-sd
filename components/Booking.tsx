"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionRail from "./SectionRail";

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
    <SectionRail
      id="booking"
      eyebrow="Book a session"
      index="07"
      labelledBy="booking-heading"
      bg="bg-cream-deep"
      heading={
        <h2 id="booking-heading" className="display text-center text-[44px] leading-[1.02] md:text-[68px]">
          Let us pick<br />
          <span className="display-italic text-ink-soft">a time.</span>
        </h2>
      }
      rail={<>We will reply within one business day. Most messages get a same-day text. No spam, no follow-up sequence, no sales pressure.</>}
    >
      <div className="grid grid-cols-12 items-start gap-x-6 gap-y-12 md:gap-x-12">
        <Reveal className="col-span-12 md:col-span-5">
          <div className="space-y-10 border-t border-hairline pt-10">
            <div>
              <p className="index-badge">Or, faster</p>
              <a href="tel:+16196395282" className="display mt-4 block text-[36px] leading-none text-ink hover:text-eucalyptus-deep md:text-[44px]">(619) 639-5282</a>
              <p className="mt-3 text-[13px] uppercase tracking-[0.16em] text-mid">Picked up by a real person, every day, 10 AM &ndash; 9:30 PM.</p>
            </div>
            <div>
              <p className="index-badge">Walk-ins</p>
              <p className="mt-3 text-[15px] leading-[1.85] text-ink-soft">7086 El Cajon Blvd, La Mesa, CA 91942. Free lot in front. We can almost always fit you in within 30 minutes &mdash; try us.</p>
            </div>
            <div>
              <p className="index-badge">Email</p>
              <a href="mailto:oasis8massage@gmail.com" className="link-underline mt-3 inline-block text-[15px] text-ink">oasis8massage@gmail.com</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} className="col-span-12 md:col-span-6 md:col-start-7">
          <div className="bg-cream p-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] md:p-12">
            {!submitted ? (
              <form onSubmit={onSubmit} className="flex flex-col gap-7">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="index-badge">Your name</label>
                  <input id="name" name="name" required autoComplete="name" className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink placeholder:text-mid/60 focus:border-ink focus:outline-none" placeholder="First and last" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact" className="index-badge">Phone or email</label>
                  <input id="contact" name="contact" required className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink placeholder:text-mid/60 focus:border-ink focus:outline-none" placeholder="Whatever is easiest" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="index-badge">What you are thinking</label>
                  <select id="service" name="service" defaultValue={services[0]} className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink focus:border-ink focus:outline-none">
                    {services.map((s) => (<option key={s}>{s}</option>))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="index-badge">When works &middot; what hurts (optional)</label>
                  <textarea id="message" name="message" rows={4} className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink placeholder:text-mid/60 focus:border-ink focus:outline-none" placeholder="e.g. Tuesday after 6 — lower back, side sleeper. First visit." />
                </div>
                <button type="submit" className="btn-primary mt-2 inline-flex items-center justify-center self-start rounded-full px-8 py-4 text-[12px] tracking-[0.16em] uppercase">Request a time</button>
                <p className="text-[12px] text-mid">We will respond within 1 business day. No spam. No sales pressure. Your info does not go anywhere else.</p>
              </form>
            ) : (
              <div className="flex min-h-[420px] flex-col justify-center">
                <p className="eyebrow text-eucalyptus-deep">Got it</p>
                <h3 className="display mt-3 text-[34px] leading-[1.1] md:text-[40px]">Thanks. We will text you back today.</h3>
                <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.85] text-ink-soft">If you do not hear from us by tomorrow morning, please call <a href="tel:+16196395282" className="link-underline text-ink">(619) 639-5282</a>.</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </SectionRail>
  );
}
