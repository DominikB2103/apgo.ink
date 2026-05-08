import { AlertTriangle, ArrowRight, CalendarDays, FileText, Landmark, MapPin } from 'lucide-react';
import { DemoFrame, DemoNav } from '@/components/DemoFrame';

const departments = [
  ['Residents office', 'Moving, identity documents, certificates and appointment booking.'],
  ['Construction & planning', 'Permits, zoning maps, public notices and local development projects.'],
  ['Schools & community', 'Term dates, childcare, associations, library and community events.']
];

export default function MunicipalityDemo() {
  return (
    <DemoFrame theme="civic">
      <DemoNav title="Gemeinde Lindenau" links={['Services', 'News', 'Forms', 'Council']} cta="Online desk" />
      <header className="demo-hero" style={{ ['--demo-image' as string]: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=86')" }}>
        <div className="demo-hero-content">
          <div>
            <span className="demo-kicker">Digital municipal service</span>
            <h1 className="demo-title">Everything residents need, in one calm place.</h1>
            <p className="demo-lede">A modern public-sector demo with alerts, online forms, council news and accessibility-led navigation.</p>
            <div className="demo-actions"><a className="demo-button primary" href="#services">Find a service <ArrowRight size={18} /></a><a className="demo-button secondary" href="#news">Latest notices</a></div>
          </div>
          <div className="demo-info-card"><strong>Current notices</strong><p>Road closure on Dorfstrasse, council meeting agenda, summer recycling collection update.</p><div className="demo-info-list"><span><b>Desk</b> 08:00–11:30</span><span><b>Emergency</b> 24/7 number</span><span><b>Forms</b> 38 online</span></div></div>
        </div>
      </header>
      <section className="demo-section" id="services">
        <div className="demo-section-head"><div><span className="demo-kicker">Public services</span><h2>Municipality sites should reduce phone pressure, not create it.</h2></div><p>Clear service blocks, alerts and form shortcuts help residents self-serve while keeping important notices visible.</p></div>
        <div className="demo-card-grid">{departments.map(([title, text], index) => <article className="demo-feature-card" key={title}><h3>{title}</h3><p>{text}</p><span className="mini-price">{index === 0 ? <FileText size={26} /> : index === 1 ? <Landmark size={26} /> : <CalendarDays size={26} />}</span></article>)}</div>
      </section>
      <section className="demo-section"><div className="gallery-strip"><div className="gallery-image tall" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1100&q=84')" }} /><div className="gallery-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=900&q=84')" }} /><div className="gallery-image tall" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1100&q=84')" }} /></div></section>
      <div className="quote-band"><blockquote>“A civic website that feels readable, not bureaucratic.”</blockquote><span><AlertTriangle size={18} /> Alerts · forms · accessibility</span></div>
      <section className="demo-section" id="contact"><div className="demo-contact-panel"><div><h2>One front door for residents, visitors and local businesses.</h2><p>For a real municipality, this can become multilingual, accessible and organized around departments or life events.</p></div><div className="demo-contact-card"><span><MapPin size={18} /> Gemeindehausplatz 1</span><span><CalendarDays size={18} /> Mon–Fri public desk</span><strong>online-desk@example.ch</strong></div></div></section>
      <footer className="demo-footer">Demo website by APTO.INK · Static, fast and easy to adapt.</footer>
    </DemoFrame>
  );
}
