import Reveal from "./Reveal";
import { asset } from "@/lib/asset";

export default function About() {
  return (
    <section
      id="about"
      className="bg-cream py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <Reveal className="col-span-12 md:col-span-5">
            <div
              role="img"
              aria-label="The front room of Pure Massage on El Cajon Boulevard, soft window light"
              className="img-placeholder relative aspect-[4/5] w-full overflow-hidden"
              style={{
                backgroundImage: `url(${asset("/images/about-01.jpg")})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <p className="mt-4 text-[12px] text-mid">
              The front room, late afternoon.
            </p>
          </Reveal>

          <Reveal
            delay={120}
            className="col-span-12 md:col-span-6 md:col-start-7"
          >
            <p className="eyebrow">About</p>
            <h2
              id="about-heading"
              className="display mt-4 text-[40px] leading-[1.05] md:text-[56px]"
            >
              A small, Asian-owned
              <br />
              <span className="italic font-light text-ink-soft">
                neighborhood studio
              </span>
              <br />
              on El Cajon Boulevard.
            </h2>
            <div className="mt-10 space-y-6 text-[17px] leading-[1.7] text-ink-soft">
              <p>
                Pure Massage is the kind of place we wished existed when we
                were the ones working twelve-hour shifts. A small front room
                with warm decor. Comfortable rooms with crisp white sheets and
                neatly arranged towels. Hot tea in the kettle, every day.
              </p>
              <p>
                Our practitioners — Sia and the team — are trained in full
                body, foot, shiatsu, and couples massage. We don't sell
                memberships. We don't push add-ons. We don't have a points
                program. The price you see at the door is the price you pay,
                and a real hour means sixty minutes on the table.
              </p>
              <p>
                What we are trying to do is straightforward: give people an
                honest hour. The kind your shoulders remember three days later.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-hairline pt-8 text-[13px]">
              <div>
                <p className="text-mid">Specialties</p>
                <p className="mt-1 text-ink">
                  Full body, foot, shiatsu, couples
                </p>
              </div>
              <div>
                <p className="text-mid">Hours</p>
                <p className="mt-1 text-ink">Daily, 9 AM – 11 PM</p>
              </div>
              <div>
                <p className="text-mid">Pricing</p>
                <p className="mt-1 text-ink">$50 / hour, all-in</p>
              </div>
              <div>
                <p className="text-mid">First visit</p>
                <p className="mt-1 text-ink">
                  $10 off — mention it at the desk
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
