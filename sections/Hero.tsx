import Link from 'next/link';
import { Reveal } from '@/components/Motion';
import { SceneCanvas } from '@/components/SceneCanvas';

export function Hero() {
  return (
    <section className="hero">
      
      <SceneCanvas />
      <div className="shell hero-grid">
        <Reveal className="hero-copy">
          <div className="eyebrow">Built for local trust</div>
          <h1>Websites that make Swiss SMEs look <em>impossible to ignore.</em></h1>
          <p className="lead">APTO.INK designs polished, fast, sales-focused websites for small and medium-sized businesses that need to look established before the first phone call.</p>
          <div className="hero-actions"><Link className="btn btn-primary" href="#examples">View example websites</Link><Link className="btn btn-ghost" href="#pricing">See pricing</Link></div>
        </Reveal>
        <Reveal className="hero-stage" delay={0.12}>
          <Link className="stage-card stage-main stage-preview stage-bakery floaty" href="/demos/bakery/">
            <div className="preview-toolbar"><span className="preview-dots"><i></i><i></i><i></i></span><strong>Bakery example</strong></div>
            <div className="preview-hero"><span className="preview-chip">Golden Crust Atelier</span><h3>Morning bread, designed to sell before 8am.</h3><p>Warm product photography, counter highlights, opening hours and a preorder path.</p></div>
            <div className="preview-menu"><span>Daily counter</span><span>Seasonal cakes</span><span>Pre-order</span></div>
          </Link>
          <Link className="stage-card stage-mini stage-preview stage-garage" href="/demos/garage/">
            <div className="preview-toolbar"><span className="preview-dots"><i></i><i></i><i></i></span><strong>Garage</strong></div>
            <div className="preview-hero"><span className="preview-chip">Nordwerk</span><h3>Diagnostics, proof and booking.</h3></div>
            <div className="preview-menu"><span>Service cards</span><span>24h request</span></div>
          </Link>
          <aside className="stage-card stage-pricing"><small>Main package</small><strong>CHF 1’850</strong><p>Complete local business website: strategy, design, pages, contact flow.</p><ul><li>✓ 4–6 tailored pages</li><li>✓ Mobile-first design</li><li>✓ Launch support</li></ul></aside>
        </Reveal>
      </div>
    </section>
  );
}
