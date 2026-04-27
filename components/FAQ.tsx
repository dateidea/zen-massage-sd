"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type QA = { q: string; a: React.ReactNode };

const faqs: QA[] = [
  {
    q: "Do I need an appointment, or can I walk in?",
    a: (
      <>
        Both are fine. Walk-ins are honestly welcome — there's almost always an
        opening within thirty minutes if you arrive before 9 PM. If you want a
        specific time or therapist, please call ahead at{" "}
        <a className="link-underline" href="tel:+18583815959">
          (858) 381-5959
        </a>
        .
      </>
    ),
  },
  {
    q: "How much does it cost? Are there hidden fees?",
    a: (
      <>
        Our prices: $50 for the standard 60-minute hour, $60 for deep tissue,
        $40 for 45-minute foot reflexology, $75 for a 75-minute hot stone.
        That's the entire price list. New clients get $10 off the first hour —
        no code, just mention it. No membership fees, no booking fees. Tipping
        is appreciated but never required and never appears on the bill.
      </>
    ),
  },
  {
    q: "What kind of pressure should I ask for?",
    a: (
      <>
        If you're not sure, start with medium and tell us within the first ten
        minutes if you want more or less. We'd rather adjust five times than
        leave you sore tomorrow. Deep tissue means we use forearms, elbows, and
        slow-loaded body weight on specific knots — not just "harder pressure
        everywhere."
      </>
    ),
  },
  {
    q: "Do you take walk-ins after 9 PM?",
    a: (
      <>
        Yes. The last appointment is taken at 10 PM and the doors lock at
        11 PM. If you're coming late after a shift, please call so we can keep
        someone on for you.
      </>
    ),
  },
  {
    q: "How do you handle injuries or pregnancy?",
    a: (
      <>
        We work around acute injuries and refer out to a chiropractor or PT
        when something isn't ours to treat. We do prenatal massage in the
        second and third trimester with the side-lying setup — please call
        first so we can prep the room.
      </>
    ),
  },
  {
    q: "Where do I park?",
    a: (
      <>
        Free parking lot directly in front of the studio, off El Cajon Boulevard
        between 69th and 70th. Street parking on College Avenue if the lot is
        full. We're a one-minute drive from SDSU and on the 1 and 815 bus
        lines.
      </>
    ),
  },
  {
    q: "Do you offer gift cards?",
    a: (
      <>
        Yes — paper gift cards in the front room, or we can mail one. Call or
        come in. We don't sell them online yet because we like writing the
        recipient's name in by hand.
      </>
    ),
  },
  {
    q: "What's your cancellation policy?",
    a: (
      <>
        Same-day cancellations are fine. We don't charge for them. If you
        no-show three times in a row we'll ask for a card on file for the next
        booking — that's the only enforcement we have.
      </>
    ),
  },
];

function Item({ qa, idx }: { qa: QA; idx: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${idx}`;
  return (
    <li className="border-t border-hairline">
      <button
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((s) => !s)}
        className="group flex w-full items-start justify-between gap-6 py-7 text-left"
      >
        <span className="display text-[22px] leading-[1.25] text-ink md:text-[26px]">
          {qa.q}
        </span>
        <span
          aria-hidden
          className={`mt-2 inline-block h-3 w-3 shrink-0 transition-transform duration-500 ${
            open ? "rotate-45" : ""
          }`}
          style={{
            background:
              "linear-gradient(currentColor, currentColor) center/100% 1px no-repeat, linear-gradient(currentColor, currentColor) center/1px 100% no-repeat",
            color: "var(--color-ink)",
          }}
        />
      </button>
      <div
        id={id}
        role="region"
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-[64ch] pb-8 text-[16px] leading-[1.7] text-ink-soft">
            {qa.a}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-cream py-24 md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow">Things people ask</p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2
                id="faq-heading"
                className="display text-[40px] leading-[1.02] md:text-[56px]"
              >
                The honest answers,
                <br />
                <span className="italic font-light text-ink-soft">
                  before you have to ask.
                </span>
              </h2>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <ul className="mt-16 border-b border-hairline">
            {faqs.map((qa, i) => (
              <Item key={qa.q} qa={qa} idx={i} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
