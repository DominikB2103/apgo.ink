import Link from 'next/link';
import { Reveal } from '@/components/Motion';

export function Hero() {
  return (
    <section className="hero hero-v12">
      <div className="shell hero-grid">
        <Reveal className="hero-copy">
          <div className="eyebrow">Built for local trust</div>
          <h1>A website that makes your business look <em>impossible to ignore.</em></h1>
          <p className="lead">Premium, fast websites for Swiss SMEs that want customers to understand the offer, trust the business, and take the next step.</p>
          <div className="hero-actions"><Link className="btn btn-primary" href="#examples">View examples</Link><Link className="btn btn-ghost" href="#pricing">See pricing</Link></div>
        </Reveal>
        <Reveal className="hero-stage stack-stage" delay={0.12}>
          <Link className="stage-card stage-main stage-preview stage-bakery" href="/demos/bakery/">
            <div className="preview-toolbar"><span className="preview-dots"><i></i><i></i><i></i></span><strong>Bakery</strong></div>
            <div className="preview-image-only" aria-hidden="true"></div>
            <div className="preview-caption"><span>Warm storefront</span><strong>Gallery, hours, orders.</strong></div>
          </Link>
          <Link className="stage-card stage-mini stage-preview stage-garage" href="/demos/garage/">
            <div className="preview-toolbar"><span className="preview-dots"><i></i><i></i><i></i></span><strong>Garage</strong></div>
            <div className="preview-image-only" aria-hidden="true"></div>
          </Link>
          <Link className="stage-card stage-pricing" href="#pricing"><small>Local business build</small><strong>CHF 1’850</strong><p>4–6 pages, clear copy, strong visuals, one focused launch path.</p><span>Fixed scope → clean launch</span></Link>
        </Reveal>
      </div>
    </section>
  );
}
