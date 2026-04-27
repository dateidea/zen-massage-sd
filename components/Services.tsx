import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

type Service = { num: string; name: string; description: string; outcome: string; duration: string; price: string; image: string; alt: string; };

const services: Service[] = [
  { num: "01", name: "Foot Massage", description: "Sixty minutes in a heated recliner — Epsom-salt soak, hot towel, warm oil. Targeted pressure through the arch, the calf, and the reflex points along the heel. Most clients close their eyes inside the first ten minutes.", outcome: "For: nurses, servers, parents, anyone who has been on their feet.", duration: "60 min", price: "From $50", image: "/images/service-foot-04.jpg", alt: "Close-up detail of warm oil and a polished river stone on a folded ivory linen towel" },
  { num: "02", name: "Full Body with Hot Stones", description: "A full hour head-to-toe — back, neck, shoulders, glutes, legs, arms — with smooth basalt stones warmed in water and worked along the back to draw the deep stuff out. Medium pressure unless you say otherwise.", outcome: "For: the long week, the bad chair, the shoulders that will not drop.", duration: "60 min", price: "From $60", image: "/images/service-relax-01.jpg", alt: "Cedar massage table dressed with neatly folded ivory linen, soft window light" },
  { num: "03", name: "Deep Tissue & Combo", description: "Slow-loaded forearm and elbow work into the layer beneath the surface. Or split the hour: thirty on the feet, thirty on the body, for forty-five dollars. We pick the pressure together at the ten-minute mark.", outcome: "For: chronic knots, athletes, people who lift things for a living.", duration: "60 min · 30/30 from $45", price: "From $55", image: "/images/service-deep-02.jpg", alt: "Warm tungsten light across a treatment table, deep shadow, neatly arranged towels" },
  { num: "04", name: "Couples Room", description: "Two practitioners, one quiet room, side-by-side tables. Hot stones included on request, same warm towels, same cup of tea afterward. The couples room books up before the rest of the studio — calling ahead is the difference between a yes and a maybe.", outcome: "For: anniversaries, post-flight, the rare night you both have free.", duration: "60 min · per pair", price: "Call for current rate", image: "/images/service-stone-03.jpg", alt: "Six smooth basalt stones arranged on a folded ivory linen towel, faint steam rising" },
];

export default function Services() {
  return (
    <section id="services" className="bg-cream py-24 md:py-32" aria-labelledby="services-heading">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4"><p className="eyebrow">The menu</p></div>
            <div className="col-span-12 md:col-span-8">
              <h2 id="services-heading" className="display text-[40px] leading-[1.04] md:text-[64px]">Four services.<br /><span className="italic font-light text-clay">No memberships, no add-on traps,</span><br />no upsell at the door.</h2>
              <p className="mt-8 max-w-[58ch] text-[17px] text-ink-soft">Most people walk in for one of these. Combo deals — foot plus body in the same hour — are how regulars come in. Walk-ins welcome until 9 PM. Calling ahead helps, especially for the couples room.</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.num} delay={i * 80}>
              <article className="group flex flex-col">
                <div className="relative overflow-hidden">
                  <div role="img" aria-label={s.alt} className="img-placeholder image-luxe relative aspect-[4/5] w-full overflow-hidden md:aspect-[5/6]" style={{ backgroundImage: `url(${asset(s.image)})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <span className="absolute left-4 top-4 display text-[12px] tracking-[0.24em] uppercase text-clay">{s.num}</span>
                </div>
                <div className="mt-8 flex items-baseline gap-4">
                  <h3 className="display text-[28px] leading-[1.05] text-ink md:text-[36px]">{s.name}</h3>
                  <span className="ml-auto display text-[20px] text-clay md:text-[22px]">{s.price}</span>
                </div>
                <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-mid">{s.duration}</p>
                <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.65] text-ink-soft">{s.description}</p>
                <p className="mt-4 max-w-[44ch] text-[13px] italic text-mid">{s.outcome}</p>
                <a href="#booking" className="mt-6 link-underline self-start text-[12px] tracking-[0.16em] uppercase text-clay">Book this →</a>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-20 max-w-[60ch] text-[14px] leading-[1.7] text-ink-soft">Combo deals: 30 min foot + 30 min body for $45 · 40 min foot + 40 min body for $60. Active duty and veterans get 10% off any service with a valid ID — discounts cannot be combined. Cash and card both accepted. Tipping is appreciated but never required.</p>
        </Reveal>
      </div>
    </section>
  );
}
