import Reveal from "./Reveal";
import ZoomImage from "./ZoomImage";

export default function About() {
  return (
    <section id="about" className="bg-night-soft py-28 md:py-40" aria-labelledby="about-heading">
      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">About</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 id="about-heading" className="display mt-6 text-[44px] leading-[1.02] md:text-[80px]">
            A small neighborhood
            <br />
            <span className="italic font-light text-brass">massage studio</span>
            <br />
            on El Cajon Boulevard.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-16">
            <ZoomImage
              src="/images/about-01.jpg"
              alt="The treatment room of ZEN Massage — cedar table dressed with neatly folded ivory linen, soft late-afternoon window light"
              ratio="aspect-[16/9] md:aspect-[21/9]"
              className="w-full"
            />
            <p className="mt-4 text-[11px] tracking-[0.16em] uppercase text-cream/55">The room before the door opens.</p>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-16 grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-7">
              <div className="space-y-7 text-[18px] leading-[1.75] text-cream/80">
                <p>ZEN Massage sits at the corner of El Cajon Boulevard and 79th Street in San Diego, two blocks east of the College Area. A small front room with warm decor. Comfortable rooms with crisp white sheets and neatly arranged towels. Hot stones warming on the counter most days.</p>
                <p>We do not sell memberships. We do not push add-ons. There is no points program. The price you see at the door is the price you pay, and a real hour means sixty minutes on the table. Active duty and veterans get ten percent off &mdash; say so when you call, that is the only paperwork.</p>
                <p>What we are trying to do is straightforward: give people an honest hour. The kind your shoulders remember three days later.</p>
              </div>
            </div>
            <div className="md:col-span-5 md:pl-6">
              <div className="grid grid-cols-1 gap-6 border-l border-hairline-strong pl-6 text-[12px] tracking-[0.06em] uppercase">
                <div>
                  <p className="text-cream/45">Specialties</p>
                  <p className="mt-2 text-cream tracking-normal normal-case text-[15px]">Hot stone, deep tissue, foot reflexology, couples</p>
                </div>
                <div>
                  <p className="text-cream/45">Hours</p>
                  <p className="mt-2 text-cream tracking-normal normal-case text-[15px]">Daily, 10 AM &ndash; 9:30 PM</p>
                </div>
                <div>
                  <p className="text-cream/45">Combo deal</p>
                  <p className="mt-2 text-cream tracking-normal normal-case text-[15px]">$45 &mdash; 30 min foot + 30 min body</p>
                </div>
                <div>
                  <p className="text-cream/45">Military</p>
                  <p className="mt-2 text-cream tracking-normal normal-case text-[15px]">10% off active duty &amp; veterans</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
