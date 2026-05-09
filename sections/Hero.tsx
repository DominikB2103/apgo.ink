import Link from 'next/link';
import { Reveal } from '@/components/Motion';

export function Hero() {
  return (
    <section className="hero">
      <div className="shell hero-grid">
        <Reveal className="hero-copy">
          <div className="eyebrow">Built for local trust</div>
          <h1>Websites that make Swiss SMEs look <em>impossible to ignore.</em></h1>
          <p className="lead">Polished, fast, sales-focused websites for Swiss businesses that need to look established before the first phone call.</p>
          <div className="hero-actions"><Link className="btn btn-primary" href="#examples">View example websites</Link><Link className="btn btn-ghost" href="#pricing">See pricing</Link></div>
        </Reveal>
        <Reveal className="hero-stage" delay={0.12}>
          <Link className="stage-card stage-main stage-preview stage-bakery" href="/demos/bakery/" aria-label="Open bakery website example">
            <div className="preview-toolbar"><span className="preview-dots"><i></i><i></i><i></i></span><strong>Bakery</strong></div>
            <div className="preview-image-only" aria-hidden="true"></div>
          </Link>
          <Link className="stage-card stage-mini stage-preview stage-garage" href="/demos/garage/" aria-label="Open garage website example">
            <div className="preview-toolbar"><span className="preview-dots"><i></i><i></i><i></i></span><strong>Garage</strong></div>
            <div className="preview-image-only" aria-hidden="true"></div>
          </Link>
          <aside className="stage-card stage-pricing" aria-label="Main website package">
            <small>Main package</small>
            <strong>CHF 1’850</strong>
            <p>Complete local business website with clear pages, refined design and a direct contact path.</p>
            <ul><li>4–6 tailored pages</li><li>Industry-specific visual direction</li><li>One focused revision round</li></ul>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
