import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Examples } from '@/sections/Examples';
import { Pricing } from '@/sections/Pricing';
import { Process } from '@/sections/Process';
import { Faq } from '@/sections/Faq';
import Link from 'next/link';

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
        <section className="section-pad-sm final-cta-section"><div className="shell cta-panel cta-panel-v12"><div><div className="eyebrow">Ready to start</div><h2>Send the examples. Choose the package. Launch the first build.</h2><p className="lead">Show prospects the quality before the call and give them a direct reason to answer.</p></div><div className="cta-actions"><Link className="btn btn-primary" href="/demos/">Open examples</Link><a className="btn btn-dark" href="mailto:hello@apto.ink?subject=Website%20project">Request a quote</a></div></div></section>
      </main>
      <Footer />
    </>
  );
}
