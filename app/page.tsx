import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Examples } from '@/sections/Examples';
import { Pricing } from '@/sections/Pricing';
import { Process } from '@/sections/Process';
import { Faq } from '@/sections/Faq';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section className="marquee"><div className="marquee-track"><span>Premium first impression</span><span>Swiss SME positioning</span><span>Clear calls to action</span><span>Local trust signals</span><span>Industry-specific design</span></div></section>
        <Examples />
        <Pricing />
        <Process />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
