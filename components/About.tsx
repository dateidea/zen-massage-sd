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
          {/* Photo */}
          <Reveal className="col-span-12 md:col-span-5">
            <div
              role="img"
              aria-label="Lin, founder, in the front room of Feel Good Spa, warm window light"
              className="img-placeholder relative aspect-[4/5] w-full overflow-hidden"
              style={{
                backgroundImage: `url(${asset("/images/about-01.jpg")})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <p className="mt-4 text-[12px] text-mid">
              Lin in the front room, March 2026.
            </p>
          </Reveal>

          {/* Body */}
          <Reveal
            delay={120}
            className="col-span-12 md:col-span-6 md:col-start-7"
          >
            <p className="eyebrow">About</p>
            <h2
              id="about-heading"
              className="display mt-4 text-[40px] leading-[1.05] md:text-[56px]"
            >
              We opened in 2014
              <br />
              <span className="italic font-light text-ink-soft">
                because the kind of place
              </span>
              <br />
              we wanted didn't exist here yet.
            </h2>
            <div className="mt-10 space-y-6 text-[17px] leading-[1.7] text-ink-soft">
              <p>
                I grew up in Guangzhou and trained for nine years before I ever
                worked on a paying client. My mother taught me reflexology;
                a teacher in Shenzhen taught me deep tissue; a chiropractor
                in El Cajon taught me which referrals to send back.
              </p>
              <p>
                We opened a small storefront on El Cajon Boulevard in 2014.
                It's still small. There are four rooms, two recliners, and a
                kettle that's almost always on. We don't sell memberships.
                We don't have a points program. We're not trying to scale.
              </p>
              <p>
                What we are trying to do is the same thing every day: give
                people an honest hour. The kind you talk about at dinner
                three days later.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-hairline pt-8 text-[13px]">
              <div>
                <p className="text-mid">Trained at</p>
                <p className="mt-1 text-ink">
                  Guangzhou Massage Institute, '02
                </p>
              </div>
              <div>
                <p className="text-mid">Languages</p>
                <p className="mt-1 text-ink">English, Mandarin, Cantonese</p>
              </div>
              <div>
                <p className="text-mid">CAMTC license</p>
                <p className="mt-1 text-ink">#0042-XXXXX</p>
              </div>
              <div>
                <p className="text-mid">On the team</p>
                <p className="mt-1 text-ink">
                  Lin, YoYo, Mei, and Wei (since 2018)
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
