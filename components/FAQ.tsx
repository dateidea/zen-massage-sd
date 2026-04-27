"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type QA = { q: string; a: React.ReactNode };

const faqs: QA[] = [
  {
    q: "Do I need an appointment, or can I walk in?",
    a: (
      <>
        Both are fine. Walk-ins are honestly welcome — there&rsquo;s almost always
        an opening within thirty minutes if you arrive before 10 PM. If you
        want a specific time or therapist (Kiwi or Luna get requested by
        name), please call ahead at{" "}
        <a className="link-underline" href="tel:+16265222888">
          (626) 522-2888
        </a>
        .
      </>
    ),
  },
  {
    q: "How much does it cost? Are there hidden fees?",
    a: (
      <>
        The Custom Hour — Swedish, deep tissue, or both — is $79.99 with free
        essential oil and free hot stone work included. Foot reflexology is
        $59.99. That&rsquo;s the whole price list. No membership fees, no booking
        fees. Tipping is appreciated but never required and never appears on
        the bill.
      </>
    ),
  },
  {
    q: "What kind of pressure should I ask for?",
    a: (
      <>
        If you&rsquo;re not sure, start with medium and tell us within the first ten
        minutes if you want more or less. We&rsquo;d rather adjust five times than
        leave you sore tomorrow. Deep work means slow-loaded forearms and
        elbows on specific knots — not just &ldquo;harder pressure everywhere.&rdquo;
      </>
    ),
  },
  {
    q: "Are you really open until 11 PM?",
    a: (
      <>
        Yes — every day, including Sunday. The last appointment goes on the
        table at 10 PM and the doors lock at 11 PM. If you&rsquo;re coming late
        after a shift, please call so we can keep someone on for you.
      </>
    ),
  },
  {
    q: "What&rsquo;s actually included in the $79.99?",
    a: (
      <>
        A full sixty minutes on the table, your choice of Swedish, deep tissue,
        or a combination of both. Free hot stones placed along the back and
        shoulders. Free essential oil — lavender, eucalyptus, or unscented.
        Hot tea before, hot tea after. Nothing extra to opt into.
      </>
    ),
  },
  {
    q: "Where do I park?",
    a: (
      <>
        Free parking lot directly in front of the studio at 7034 El Cajon Blvd,
        between 70th and 71st. Street parking on either side if the lot fills
        up. We&rsquo;re a five-minute drive from SDSU and on the 1 and 815 bus
        lines.
      </>
    ),
  },
  {
    q: "Is it OK during pregnancy?",
    a: (
      <>
        Yes — please mention it when you call so we can put you with a
        practitioner who works with prenatal clients. Side-lying with bolsters
        from the second trimester onward, gentle pressure, no deep abdominal
        work.
      </>
    ),
  },
  {
    q: "What&rsquo;s your cancellation policy?",
    a: (
      <>
        Same-day cancellations are fine. We don&rsquo;t charge for them. If you
        no-show three times in a row we&rsquo;ll ask for a card on file for the
        next booking — that&rsquo;s the only enforcement we have.
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
