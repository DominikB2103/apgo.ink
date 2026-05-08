import { ArrowRight, CalendarDays, CheckCircle2, Gauge, Wrench } from 'lucide-react';
import { DemoFrame, DemoNav } from '@/components/DemoFrame';

const services = [
  ['Service & inspection', 'Manufacturer-compliant maintenance, diagnostics and safety checks.'],
  ['Tires & wheels', 'Seasonal change, storage, balancing and alignment.'],
  ['Diagnostics', 'Fast electronic fault analysis with transparent next steps.']
];

export default function GarageDemo() {
  return (
    <DemoFrame theme="dark">
      <DemoNav title="Nordwerk Garage" links={['Services', 'Tires', 'Fleet', 'Contact']} cta="Book service" />
      <header className="demo-hero" style={{ ['--demo-image' as string]: "url('https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1800&q=86')" }}>
        <div className="demo-hero-content">
          <div>
            <span className="demo-kicker">Independent garage · transparent pricing</span>
            <h1 className="demo-title">Your car fixed properly, without theatre.</h1>
            <p className="demo-lede">A trust-first mechanic website with urgent CTAs, service packages, proof points and a booking-first layout.</p>
            <div className="demo-actions"><a className="demo-button primary" href="#contact">Book a service <ArrowRight size={18} /></a><a className="demo-button secondary" href="#services">See services</a></div>
          </div>
          <div className="demo-info-card"><strong>Next available slots</strong><p>Diagnostics tomorrow, tire service Friday, full inspection next week.</p><div className="demo-info-list"><span><b>Warranty</b> 12 months</span><span><b>Fleet</b> 6+ vehicles</span><span><b>Emergency</b> Same-day triage</span></div></div>
        </div>
      </header>
      <section className="demo-section" id="services">
        <div className="demo-section-head"><div><span className="demo-kicker">Service menu</span><h2>Mechanic sites need clarity, speed and proof.</h2></div><p>Most garage websites fail because they hide the exact services. This design turns services into confident, scannable cards.</p></div>
        <div className="demo-card-grid">{services.map(([title, text], index) => <article className="demo-feature-card" key={title}><h3>{title}</h3><p>{text}</p><span className="mini-price">{index === 0 ? 'from CHF 190' : index === 1 ? 'from CHF 65' : 'from CHF 89'}</span></article>)}</div>
      </section>
      <section className="demo-section"><div className="gallery-strip"><div className="gallery-image tall" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1632823471565-1ecdf5c68f78?auto=format&fit=crop&w=1100&q=84')" }} /><div className="gallery-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=900&q=84')" }} /><div className="gallery-image tall" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1100&q=84')" }} /></div></section>
      <div className="quote-band"><blockquote>“Finally, a garage website that feels as clean as the workshop.”</blockquote><span><Gauge size={18} /> Fast quote flow · no nonsense</span></div>
      <section className="demo-section" id="contact"><div className="demo-contact-panel"><div><h2>Book diagnostics in under one minute.</h2><p>For a real client, this button can go to phone, email, WhatsApp, Google Forms or a booking tool.</p></div><div className="demo-contact-card"><span><CalendarDays size={18} /> Mon–Fri, 07:30–18:00</span><span><Wrench size={18} /> Diagnostics · tires · service</span><strong>+41 00 000 00 00</strong></div></div></section>
      <footer className="demo-footer"><CheckCircle2 size={16} /> Demo website by APTO.INK · Static, fast and easy to adapt.</footer>
    </DemoFrame>
  );
}
