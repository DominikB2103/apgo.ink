import Link from 'next/link';
import { Reveal } from '@/components/Motion';
import { SceneCanvas } from '@/components/SceneCanvas';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-orb" aria-hidden="true" />
      <SceneCanvas />
      <div className="shell hero-grid">
        <Reveal className="hero-copy">
          <div className="eyebrow">Built for local trust</div>
          <h1>Websites that make Swiss SMEs look <em>impossible to ignore.</em></h1>
          <p className="lead">APTO.INK designs polished, fast, sales-focused websites for small and medium-sized businesses that need to look established before the first phone call.</p>
          <div className="hero-actions"><Link className="btn btn-primary" href="#examples">View example websites</Link><Link className="btn btn-ghost" href="#pricing">See pricing</Link></div>
        </Reveal>
        <Reveal className="hero-stage" delay={0.12}>
          <div className="stage-card stage-main floaty" style={{ ['--image' as string]: "linear-gradient(135deg,rgba(122,247,213,.22),rgba(181,140,255,.18)),url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85')" }}>
            <div className="stage-badge"><span className="pill">Live impression</span><strong>92%</strong><p>of judgment happens before a customer reads your offer.</p></div>
          </div>
          <aside className="stage-card stage-pricing"><small>Main package</small><strong>CHF 1’850</strong><p>Complete local business website: strategy, design, pages, contact flow.</p></aside>
        </Reveal>
      </div>
    </section>
  );
}
