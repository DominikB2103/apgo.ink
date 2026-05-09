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
        <Examples />
        <Pricing />
        <Process />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
