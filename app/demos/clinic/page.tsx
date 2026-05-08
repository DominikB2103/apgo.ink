import { ArrowRight, CalendarDays, HeartPulse, ShieldCheck, Stethoscope } from 'lucide-react';
import { DemoFrame, DemoNav } from '@/components/DemoFrame';

const services = [
  ['General medicine', 'Consultations, checkups, prevention and long-term patient care.'],
  ['Diagnostics', 'Blood work, ECG, ultrasound coordination and specialist referrals.'],
  ['Family care', 'Children, adults and seniors supported by a calm local practice.']
];

export default function ClinicDemo() {
  return (
    <DemoFrame theme="clinical">
      <DemoNav title="Praxis Am See" links={['Services', 'Team', 'Insurance', 'Contact']} cta="Book appointment" />
      <header className="demo-hero" style={{ ['--demo-image' as string]: "url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1800&q=86')" }}>
        <div className="demo-hero-content">
          <div>
            <span className="demo-kicker">General practice · calm patient experience</span>
            <h1 className="demo-title">Healthcare that feels clear before the first visit.</h1>
            <p className="demo-lede">A clinic demo focused on trust, appointment requests, service clarity, doctor profiles and patient questions.</p>
            <div className="demo-actions"><a className="demo-button primary" href="#contact">Request appointment <ArrowRight size={18} /></a><a className="demo-button secondary" href="#services">View services</a></div>
          </div>
          <div className="demo-info-card"><strong>Patient notice</strong><p>New patients welcome. Bring insurance card, medication list and prior reports if available.</p><div className="demo-info-list"><span><b>Open</b> 08:00–17:30</span><span><b>Languages</b> DE · EN · FR</span><span><b>Urgent</b> same-day triage</span></div></div>
        </div>
      </header>
      <section className="demo-section" id="services">
        <div className="demo-section-head"><div><span className="demo-kicker">Patient services</span><h2>Healthcare websites must feel credible in under five seconds.</h2></div><p>Strong information hierarchy helps patients know what is offered, how to book and what to bring.</p></div>
        <div className="demo-card-grid">{services.map(([title, text], index) => <article className="demo-feature-card" key={title}><h3>{title}</h3><p>{text}</p><span className="mini-price">{index === 0 ? <Stethoscope size={26} /> : index === 1 ? <HeartPulse size={26} /> : <ShieldCheck size={26} />}</span></article>)}</div>
      </section>
      <section className="demo-section"><div className="gallery-strip"><div className="gallery-image tall" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1100&q=84')" }} /><div className="gallery-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=84')" }} /><div className="gallery-image tall" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1100&q=84')" }} /></div></section>
      <div className="quote-band"><blockquote>“Patients know where to click, what to bring, and when to call.”</blockquote><span><ShieldCheck size={18} /> Trust-first medical UX</span></div>
      <section className="demo-section" id="contact"><div className="demo-contact-panel"><div><h2>Request an appointment without confusion.</h2><p>For a real clinic, this CTA can connect to email, phone, OneDoc, Medicosearch or another booking platform.</p></div><div className="demo-contact-card"><span><CalendarDays size={18} /> Mon–Fri, 08:00–17:30</span><span><Stethoscope size={18} /> General medicine · diagnostics</span><strong>+41 00 000 00 00</strong></div></div></section>
      <footer className="demo-footer">Demo website by APTO.INK · Static, fast and easy to adapt.</footer>
    </DemoFrame>
  );
}
