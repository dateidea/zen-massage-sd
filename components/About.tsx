import Reveal from "./Reveal";
import SectionRail from "./SectionRail";
import { asset } from "@/lib/asset";

export default function About() {
  return (
    <SectionRail
      id="about"
      eyebrow="About"
      index="05"
      labelledBy="about-heading"
      bg="bg-cream"
      heading={
        <h2 id="about-heading" className="display text-center text-[40px] leading-[1.05] md:text-[60px]">
          A small neighborhood<br />
          <span className="display-italic text-ink-soft">massage studio</span><br />
          on El Cajon Boulevard.
        </h2>
      }
      rail={<>The room before the door opens.</>}
    >
      <div className="grid grid-cols-12 items-start gap-x-6 gap-y-12 md:gap-x-12">
        <Reveal className="col-span-12 md:col-span-5">
          <div role="img" aria-label="The treatment room of ZEN Massage — cedar table dressed with neatly folded ivory linen, soft late-afternoon window light"
            className="img-placeholder relative aspect-[4/5] w-full overflow-hidden"
            style={{ backgroundImage: `url(${asset("/images/about-01.jpg")})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-mid">The room before the door opens.</p>
        </Reveal>
        <Reveal delay={120} className="col-span-12 md:col-span-7">
          <div className="space-y-7 text-[17px] leading-[1.85] text-ink-soft">
            <p>ZEN Massage sits at the corner of El Cajon Boulevard and 79th Street in San Diego, two blocks east of the College Area. A small front room with warm decor. Comfortable rooms with crisp white sheets and neatly arranged towels. Hot stones warming on the counter most days.</p>
            <p>We do not sell memberships. We do not push add-ons. There is no points program. The price you see at the door is the price you pay, and a real hour means sixty minutes on the table. Active duty and veterans get ten percent off &mdash; say so when you call, that is the only paperwork.</p>
            <p>What we are trying to do is straightforward: give people an honest hour. The kind your shoulders remember three days later.</p>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-hairline pt-10 text-[12px] uppercase tracking-[0.14em]">
            <div><dt className="text-mid">Specialties</dt><dd className="mt-2 text-[14px] tracking-normal text-ink normal-case leading-[1.6]">Hot stone, deep tissue, foot reflexology, couples</dd></div>
            <div><dt className="text-mid">Hours</dt><dd className="mt-2 text-[14px] tracking-normal text-ink normal-case leading-[1.6]">Daily, 10 AM &ndash; 9:30 PM</dd></div>
            <div><dt className="text-mid">Combo deal</dt><dd className="mt-2 text-[14px] tracking-normal text-ink normal-case leading-[1.6]">$45 &mdash; 30 min foot + 30 min body</dd></div>
            <div><dt className="text-mid">Military</dt><dd className="mt-2 text-[14px] tracking-normal text-ink normal-case leading-[1.6]">10% off active duty &amp; veterans</dd></div>
          </dl>
        </Reveal>
      </div>
    </SectionRail>
  );
}
