"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const services = [
  "The Custom Hour, 60 min — $79.99",
  "Deep Tissue, 60 min — $79.99",
  "Foot Reflexology, 60 min — $59.99",
  "Hot Stone (included with the hour)",
  "Couples — call us, please",
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
              Let&rsquo;s pick
              <br />
              <span className="italic font-light text-ink-soft">a time.</span>
            </h2>
            <p className="mt-8 max-w-[44ch] text-[17px] leading-[1.7] text-ink-soft">
              Tell us when you&rsquo;re thinking and what hurts. We&rsquo;ll reply within
              one business day. Most messages get a same-day text. No spam, no
              follow-up sequence, no sales pressure.
            </p>

            <div className="mt-10 space-y-6 border-t border-hairline pt-8">
              <div>
                <p className="text-[12px] tracking-[0.18em] uppercase text-mid">
                  Or, faster
                </p>
                <a
                  href="tel:+16265222888"
                  className="display mt-3 block text-[36px] leading-none text-ink hover:text-clay md:text-[44px]"
                >
                  (626) 522-2888
                </a>
                <p className="mt-3 text-[14px] text-mid">
                  Picked up by a real person, every day, 9:30 AM – 10 PM.
                </p>
              </div>

              <div>
                <p className="text-[12px] tracking-[0.18em] uppercase text-mid">
                  Walk-ins
                </p>
                <p className="mt-3 text-[15px] text-ink-soft">
                  7086 El Cajon Blvd, San Diego, CA 92115. Free lot in front.
                  We can almost always fit you in within thirty minutes — try us.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="col-span-12 md:col-span-6 md:col-start-7">
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
                      What you&rsquo;re thinking
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
                    We&rsquo;ll respond within 1 business day. No spam. No sales
                    pressure. Your info doesn&rsquo;t go anywhere else.
                  </p>
                </form>
              ) : (
                <div className="flex min-h-[420px] flex-col justify-center">
                  <p className="eyebrow text-clay">Got it</p>
                  <h3 className="display mt-3 text-[34px] leading-[1.1] md:text-[40px]">
                    Thanks. We&rsquo;ll text you back today.
                  </h3>
                  <p className="mt-6 max-w-[44ch] text-[16px] text-ink-soft">
                    If you don&rsquo;t hear from us by tomorrow morning, please call{" "}
                    <a
                      href="tel:+16265222888"
                      className="link-underline text-ink"
                    >
                      (626) 522-2888
                    </a>
                    . Sometimes texts don&rsquo;t make it through and we hate to keep
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
