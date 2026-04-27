"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type QA = { q: string; a: React.ReactNode };

const faqs: QA[] = [
  { q: "Do I need an appointment, or can I walk in?", a: (<>Both are fine. Walk-ins are honestly welcome &mdash; there is almost always an opening within thirty minutes if you arrive before 9 PM. If you want a specific time or therapist, please call ahead at <a className="link-underline text-clay-deep" href="tel:+16194396708">(619) 439-6708</a>.</>) },
  { q: "How much does it cost? Are there hidden fees?", a: (<>Combo deals are the easiest entry point: $45 for 30 min foot + 30 min body, or $60 for 40 min foot + 40 min body. Foot massage starts from $50 for the full hour, full body with hot stones from $60, deep tissue from $55. Active duty and veterans get 10% off any service with a valid ID &mdash; discounts cannot be combined. No membership fees, no booking fees. Tipping is appreciated but never required and never appears on the bill.</>) },
  { q: "What kind of pressure should I ask for?", a: (<>If you are not sure, start with medium and tell us within the first ten minutes if you want more or less. We would rather adjust five times than leave you sore tomorrow. Deep tissue means slow-loaded forearms and elbows on specific knots &mdash; not just &ldquo;harder pressure everywhere.&rdquo;</>) },
  { q: "What hours are you open?", a: (<>Every day, ten in the morning until nine-thirty at night. Last appointment is taken at 9 PM and the doors lock at 9:30 PM. If you are coming late after a shift, please call so we can keep someone on for you.</>) },
  { q: "How does the couples room work?", a: (<>Two practitioners, one quiet room, side-by-side tables. Same hour, same warm towels, same cup of tea after. The couples room books up before the rest of the studio &mdash; calling ahead is the difference between a yes and a maybe.</>) },
  { q: "Where do I park?", a: (<>Free parking lot directly in front of the studio at 7900 El Cajon Blvd, Suite C, La Mesa, between 78th and 79th Street. We are a five-minute drive from SDSU, on the 1 and 815 bus lines, and just east of the College Area.</>) },
  { q: "Do you take cards?", a: (<>Yes &mdash; we accept cash and all major cards. Tipping in cash is appreciated. We do not auto-add gratuity to the bill or charge a booking fee.</>) },
  { q: "What is your cancellation policy?", a: (<>Same-day cancellations are fine. We do not charge for them. If you no-show three times in a row we will ask for a card on file for the next booking &mdash; that is the only enforcement we have.</>) },
];

function Item({ qa, idx }: { qa: QA; idx: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${idx}`;
  return (
    <li className="card overflow-hidden">
      <button aria-expanded={open} aria-controls={id} onClick={() => setOpen((s) => !s)} className="group flex w-full items-start justify-between gap-6 p-6 text-left md:p-8">
        <span className={`display text-[18px] leading-[1.25] md:text-[22px] font-medium ${open ? "text-clay-deep" : "text-ink"}`}>{qa.q}</span>
        <span aria-hidden className={`mt-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-500 ${open ? "rotate-45 bg-clay text-cream" : "bg-cream-deep text-ink"}`}>+</span>
      </button>
      <div id={id} role="region" className="grid transition-[grid-template-rows] duration-500 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden"><p className="max-w-[64ch] px-6 pb-7 text-[15px] leading-[1.7] text-ink-soft md:px-8 md:pb-8">{qa.a}</p></div>
      </div>
    </li>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-cream py-24 md:py-32" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4"><p className="eyebrow">Things people ask</p></div>
            <div className="col-span-12 md:col-span-8">
              <h2 id="faq-heading" className="display text-[40px] leading-[1.04] text-ink font-medium md:text-[52px]">The honest answers,<br /><span className="text-clay-deep font-normal">before you have to ask.</span></h2>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <ul className="mt-12 flex flex-col gap-3 md:mt-16">
            {faqs.map((qa, i) => (<Item key={qa.q} qa={qa} idx={i} />))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
