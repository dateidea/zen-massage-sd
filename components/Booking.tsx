"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const services = [
  "Foot Massage — from $50 (60 min)",
  "Full Body with Hot Stones — from $60 (60 min)",
  "Deep Tissue — from $55 (60 min)",
  "Combo: 30 foot + 30 body — $45",
  "Couples Room — call for current rate",
  "Not sure — recommend something",
];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-cream-deep py-24 md:py-32"
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="eyebrow">Book a session</p>
            <h2
              id="booking-heading"
              className="display mt-4 text-[40px] leading-[1.02] md:text-[64px]"
            >
              Let's pick
              <br />
              <span className="italic font-light text-ink-soft">a time.</span>
            </h2>
            <p className="mt-8 max-w-[44ch] text-[17px] leading-[1.7] text-ink-soft">
              Tell us when you're thinking and what hurts. We'll reply within
              one business day. Most messages get a same-day text. No spam,
              no follow-up sequence, no sales pressure.
            </p>

            <div className="mt-10 space-y-6 border-t border-hairline pt-8">
              <div>
                <p className="text-[12px] tracking-[0.18em] uppercase text-mid">
                  Or, faster
                </p>
                <a
                  href="tel:+16196395282"
                  className="display mt-3 block text-[36px] leading-none text-ink hover:text-clay md:text-[44px]"
                >
                  (619) 639-5282
                </a>
                <p className="mt-3 text-[14px] text-mid">
                  Picked up by a real person, every day, 9 AM – 10 PM.
                </p>
              </div>

              <div>
                <p className="text-[12px] tracking-[0.18em] uppercase text-mid">
                  Walk-ins
                </p>
                <p className="mt-3 text-[15px] text-ink-soft">
                  5575 Baltimore Dr #106-107, La Mesa. Free lot in the same
                  plaza. We can almost always fit you in within 30 minutes —
                  try us.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="col-span-12 md:col-span-6 md:col-start-7"
          >
            <div className="bg-cream p-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] md:p-12">
              {!submitted ? (
                <form onSubmit={onSubmit} className="flex flex-col gap-7">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-[12px] tracking-[0.14em] uppercase text-mid"
                    >
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink placeholder:text-mid/60 focus:border-ink focus:outline-none"
                      placeholder="First and last"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact"
                      className="text-[12px] tracking-[0.14em] uppercase text-mid"
                    >
                      Phone or email
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      required
                      className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink placeholder:text-mid/60 focus:border-ink focus:outline-none"
                      placeholder="Whatever's easiest"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="service"
                      className="text-[12px] tracking-[0.14em] uppercase text-mid"
                    >
                      What you're thinking
                    </label>
                    <select
                      id="service"
                      name="service"
                      defaultValue={services[0]}
                      className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink focus:border-ink focus:outline-none"
                    >
                      {services.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-[12px] tracking-[0.14em] uppercase text-mid"
                    >
                      When works · what hurts (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="border-b border-hairline bg-transparent py-3 text-[18px] text-ink placeholder:text-mid/60 focus:border-ink focus:outline-none"
                      placeholder="e.g. Tuesday after 6 — lower back, side sleeper. First visit."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary mt-2 inline-flex items-center justify-center self-start rounded-full px-7 py-4 text-[13px] tracking-[0.05em] uppercase"
                  >
                    Request a time
                  </button>

                  <p className="text-[12px] text-mid">
                    We'll respond within 1 business day. No spam. No sales
                    pressure. Your info doesn't go anywhere else.
                  </p>
                </form>
              ) : (
                <div className="flex min-h-[420px] flex-col justify-center">
                  <p className="eyebrow text-clay">Got it</p>
                  <h3 className="display mt-3 text-[34px] leading-[1.1] md:text-[40px]">
                    Thanks. We'll text you back today.
                  </h3>
                  <p className="mt-6 max-w-[44ch] text-[16px] text-ink-soft">
                    If you don't hear from us by tomorrow morning, please call{" "}
                    <a
                      href="tel:+16196395282"
                      className="link-underline text-ink"
                    >
                      (619) 639-5282
                    </a>
                    . Sometimes texts don't make it through and we hate to keep
                    you waiting.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
