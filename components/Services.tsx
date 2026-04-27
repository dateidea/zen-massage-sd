import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

type Service = {
  num: string; name: string; description: string; outcome: string; duration: string; price: string; image: string; alt: string;
};

const services: Service[] = [
  { num: "01", name: "Foot Massage",
    description: "Sixty minutes in a heated recliner — Epsom-salt soak, hot towel, warm oil. Targeted pressure through the arch, the calf, and the reflex points along the heel. Most clients close their eyes inside the first ten minutes.",
    outcome: "For: nurses, servers, parents, anyone who has been on their feet.",
    duration: "60 min", price: "From $50",
    image: "/images/about-01.jpg",
    alt: "A folded ivory linen towel set out on a cedar bench beside the recliner — the warm towel ready for the hour" },
  { num: "02", name: "Full Body with Hot Stones",
    description: "A full hour head-to-toe — back, neck, shoulders, glutes, legs, arms — with smooth basalt stones warmed in water and worked along the back to draw the deep stuff out. Medium pressure unless you say otherwise.",
    outcome: "For: the long week, the bad chair, the shoulders that will not drop.",
    duration: "60 min", price: "From $60",
    image: "/images/service-stone-03.jpg",
    alt: "Seven smooth dark basalt river stones arranged in a quiet line on folded ivory linen, beside a small ceramic bowl of warm oil" },
  { num: "03", name: "Deep Tissue & Combo",
    description: "Slow-loaded forearm and elbow work into the layer beneath the surface. Or split the hour: thirty on the feet, thirty on the body, for forty-five dollars. We pick the pressure together at the ten-minute mark.",
    outcome: "For: chronic knots, athletes, people who lift things for a living.",
    duration: "60 min · 30/30 from $45", price: "From $55",
    image: "/images/service-thai-04.jpg",
    alt: "A warm oil bowl and a single dark river stone on a wooden stool beside the cedar massage table — the tools warming before the work" },
  { num: "04", name: "Couples Room",
    description: "Two practitioners, one quiet room, side-by-side tables. Hot stones included on request, same warm towels, same cup of tea afterward. The couples room books up before the rest of the studio — calling ahead is the difference between a yes and a maybe.",
    outcome: "For: anniversaries, post-flight, the rare night you both have free.",
    duration: "60 min · per pair", price: "Call for current rate",
    image: "/images/og-01.jpg",
    alt: "A quiet warm treatment room with cedar-panelled walls, sheer linen curtains, hanging plant, and ivory linen on the table — set up for the hour" },
];

export default function Services() {
  return (
    <section id="services" className="bg-cream py-24 md:py-32" aria-labelledby="services-heading">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <Reveal>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4"><p className="eyebrow">The menu</p></div>
            <div className="col-span-12 md:col-span-8">
              <h2 id="services-heading" className="display text-[40px] leading-[1.02] md:text-[64px]">
                Four services.<br />
                <span className="italic font-light text-ink-soft">No memberships, no add-on traps,</span><br />
                no upsell at the door.
              </h2>
              <p className="mt-8 max-w-[58ch] text-[17px] text-ink-soft">
                Most people walk in for one of these. Combo deals — foot plus body in the same hour — are how regulars come in. Walk-ins welcome until 9 PM. Calling ahead helps, especially for the couples room.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {services.map((s) => (
            <Reveal key={s.num}>
              <article className="card-surface flex h-full flex-col overflow-hidden">
                <div role="img" aria-label={s.alt}
                  className="img-placeholder relative aspect-[4/3] w-full"
                  style={{ backgroundImage: `url(${asset(s.image)})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className="flex flex-1 flex-col p-8 md:p-10">
                  <div className="flex items-baseline gap-4">
                    <span className="display text-[14px] tracking-[0.16em] text-clay">{s.num}</span>
                    <span className="h-px flex-1 bg-hairline" />
                  </div>
                  <h3 className="display mt-5 text-[28px] leading-[1.08] md:text-[34px]">{s.name}</h3>
                  <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.65] text-ink-soft">{s.description}</p>
                  <p className="mt-4 max-w-[44ch] text-[13px] italic text-mid">{s.outcome}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-8 text-[13px] text-ink">
                    <span className="display text-[20px] text-ink">{s.price}</span>
                    <span className="text-mid">·</span>
                    <span className="text-mid">{s.duration}</span>
                    <a href="#booking" className="ml-auto link-underline tracking-[0.04em] uppercase text-[12px]">Book this →</a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-14 max-w-[60ch] text-[14px] text-mid">
            Combo deals: 30 min foot + 30 min body for $45 · 40 min foot + 40 min body for $60. Active duty and veterans get 10% off any service with a valid ID — discounts cannot be combined. Cash and card both accepted. Tipping is appreciated but never required.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
