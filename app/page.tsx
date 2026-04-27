import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import HorizonBand from "@/components/HorizonBand";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <HorizonBand
          src="/images/hero-01.jpg"
          alt="Linen curtain breathing in afternoon light, ocean glimpsed through the window"
        />
        <Services />
        <HorizonBand
          src="/images/about-01.jpg"
          alt="Bare wood floor, salt-bleached wall, soft cool daylight"
        />
        <Process />
        <Testimonials />
        <HorizonBand
          src="/images/og-01.jpg"
          alt="Folded linen on a cedar bench, ocean light through gauze curtain"
        />
        <About />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
