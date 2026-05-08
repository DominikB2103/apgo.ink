import { notFound } from 'next/navigation';
import Link from 'next/link';
import { examples } from '@/data/site';

const copy: Record<string, { eyebrow: string; headline: string; lead: string; cta: string; sections: string[] }> = {
  bakery: { eyebrow: 'Open daily · 06:30–18:00', headline: 'Bread with a morning soul.', lead: 'A warm bakery website with product desire, opening hours, weekly specials and pre-order intent.', cta: 'Pre-order', sections: ['Counter highlights', 'Seasonal offers', 'Wholesale orders'] },
  garage: { eyebrow: 'Diagnostics · repair · inspection', headline: 'Mechanical trust with a precision edge.', lead: 'A sharp garage website built to convert uncertainty into booked appointments.', cta: 'Book service', sections: ['Diagnostics', 'Maintenance', 'Inspection preparation'] },
  municipality: { eyebrow: 'Resident services · public notices', headline: 'A calm civic portal for everyday life.', lead: 'A municipality website that makes services, notices and office contacts obvious.', cta: 'Find a service', sections: ['Moving', 'Waste calendar', 'Permits'] },
  clinic: { eyebrow: 'General medicine · prevention', headline: 'Healthcare that feels clear and calm.', lead: 'A clinic website that reduces patient anxiety and creates a confident appointment path.', cta: 'Request appointment', sections: ['General medicine', 'Prevention', 'Diagnostics'] }
};

export function generateStaticParams() {
  return examples.map((example) => ({ slug: example.slug }));
}

export default function DemoPage({ params }: { params: { slug: string } }) {
  const example = examples.find((item) => item.slug === params.slug);
  if (!example) notFound();
  const page = copy[example.slug];
  return (
    <main className="demo-body">
      <Link className="apto-watermark" href="/">Demo by APTO.INK</Link>
      <header className="demo-shell-header"><nav className="demo-nav shell"><Link className="brand" href="/demos/"><span className="brand-mark"><img src="/assets/svg/monogram.svg" alt="" /></span><span><strong>{example.title}</strong><small>{example.category}</small></span></Link><div className="demo-links"><a href="#services">Services</a><a href="#story">Story</a><a className="btn btn-dark" href="mailto:hello@apto.ink">{page.cta}</a></div></nav></header>
      <section className="demo-hero"><div className="shell demo-hero-grid"><div><span className="pill">{page.eyebrow}</span><h1 className="demo-title">{page.headline}</h1><p className="demo-lead">{page.lead}</p><div className="hero-actions"><a className="btn btn-dark" href="#services">View services</a><Link className="btn" href="/demos/">More examples</Link></div></div><div className="demo-card" style={{ ['--image' as string]: `url('${example.image}')`, ['--fallback' as string]: 'linear-gradient(135deg,#dfffee,#c8d6ff)' }}><div className="demo-floating"><div><span className="pill">{example.price}</span><strong>{example.category}</strong></div><p>{example.promise}</p></div></div></div></section>
      <section className="demo-section light" id="services"><div className="shell"><div className="section-head"><div><div className="eyebrow">Service clarity</div><h2>A website page structure clients can imagine for their own company.</h2></div><p>Every section has a purpose: proof, offer, action, trust, location, and reasons to call.</p></div><div className="service-grid">{page.sections.map((section, i) => <article className="service-card" key={section}><span className="pill">0{i + 1}</span><h3>{section}</h3><p>Clear explanation, customer benefit and a simple next step.</p></article>)}</div></div></section>
      <section className="direction-band"><div className="shell direction-grid"><div><span className="direction-kicker">Your direction</span><h2>Take this atmosphere and make it unmistakably yours.</h2></div><div className="direction-card"><p>This example is not a template. It is a starting direction: colors, sections, pacing, photography style and conversion flow can be shaped around the real business.</p><div className="direction-swatches" aria-hidden="true"><i></i><i></i><i></i><i></i></div><p style={{ marginTop: 24 }}><a className="link-line" href="mailto:hello@apto.ink?subject=Website%20direction">Build this direction</a></p></div></div></section>
    </main>
  );
}
