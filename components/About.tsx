import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 md:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-12 md:col-span-5">
            <div className="card card-img relative aspect-[4/5] w-full overflow-hidden">
              <div role="img" aria-label="The treatment room of Oasis 8 Massage — cedar table dressed with neatly folded ivory linen, soft late-afternoon window light" className="img-placeholder image-soft absolute inset-0" style={{ backgroundImage: `url(${asset("/images/about-01.jpg")})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            </div>
            <p className="mt-4 text-[12px] tracking-[-0.005em] text-mid">The room before the door opens.</p>
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="eyebrow">About</p>
            <h2 id="about-heading" className="display mt-4 text-[40px] leading-[1.05] text-ink font-medium md:text-[52px]">A small neighborhood<br /><span className="text-clay-deep font-normal">massage studio</span><br />on El Cajon Boulevard.</h2>
            <div className="mt-10 space-y-6 text-[17px] leading-[1.7] text-ink-soft">
              <p>Oasis 8 sits at the corner of El Cajon Boulevard and 79th Street in La Mesa, two blocks east of the College Area. A small front room with warm decor. Comfortable rooms with crisp white sheets and neatly arranged towels. Hot stones warming on the counter most days.</p>
              <p>We do not sell memberships. We do not push add-ons. There is no points program. The price you see at the door is the price you pay, and a real hour means sixty minutes on the table. Active duty and veterans get ten percent off &mdash; say so when you call, that is the only paperwork.</p>
              <p>What we are trying to do is straightforward: give people an honest hour. The kind your shoulders remember three days later.</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 text-[13px]">
              <div className="card p-5"><p className="text-mid uppercase tracking-[0.14em] text-[10px]">Specialties</p><p className="mt-2 text-ink">Hot stone, deep tissue, foot reflexology, couples</p></div>
              <div className="card p-5"><p className="text-mid uppercase tracking-[0.14em] text-[10px]">Hours</p><p className="mt-2 text-ink">Daily, 10 AM &ndash; 9:30 PM</p></div>
              <div className="card p-5"><p className="text-mid uppercase tracking-[0.14em] text-[10px]">Combo deal</p><p className="mt-2 text-ink">$45 &mdash; 30 min foot + 30 min body</p></div>
              <div className="card p-5"><p className="text-mid uppercase tracking-[0.14em] text-[10px]">Military</p><p className="mt-2 text-ink">10% off active duty &amp; veterans</p></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
