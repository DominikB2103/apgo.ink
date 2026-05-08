import { ArrowRight, Clock3, MapPin, Star } from 'lucide-react';
import { DemoFrame, DemoNav } from '@/components/DemoFrame';

const features = [
  ['Morning pastries', 'Croissants, pain au chocolat, seasonal buns and fresh sourdough from 06:30.'],
  ['Lunch counter', 'Handmade focaccia, soup, salads and espresso for the village rush.'],
  ['Catering boxes', 'Beautiful breakfast boxes for offices, events and weekend gatherings.']
];

export default function BakeryDemo() {
  return (
    <DemoFrame theme="warm">
      <DemoNav title="Mira Bäckerei" links={['Menu', 'Story', 'Catering', 'Visit']} cta="Order today" />
      <header className="demo-hero" style={{ ['--demo-image' as string]: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1800&q=86')" }}>
        <div className="demo-hero-content">
          <div>
            <span className="demo-kicker">Fresh every morning · Since 1998</span>
            <h1 className="demo-title">Village bakery, city-level taste.</h1>
            <p className="demo-lede">Warm bread, precise pastry, and a café corner designed for slow mornings. Reserve breakfast boxes or check today’s menu before you visit.</p>
            <div className="demo-actions">
              <a className="demo-button primary" href="#contact">Reserve a box <ArrowRight size={18} /></a>
              <a className="demo-button secondary" href="#menu">View menu</a>
            </div>
          </div>
          <div className="demo-info-card">
            <strong>Today’s counter</strong>
            <p>Apricot tartelette, walnut sourdough, tomato focaccia and vanilla cream rolls.</p>
            <div className="demo-info-list">
              <span><b>Open</b> 06:30–18:00</span>
              <span><b>Address</b> Bahnhofstrasse 12</span>
              <span><b>Rating</b> 4.9 / 5</span>
            </div>
          </div>
        </div>
      </header>

      <section className="demo-section" id="menu">
        <div className="demo-section-head">
          <div><span className="demo-kicker">Menu highlights</span><h2>Designed to make people hungry before they arrive.</h2></div>
          <p>Clear cards, quick pricing and photo-led sections help a small food business turn casual searches into real visits.</p>
        </div>
        <div className="demo-card-grid">
          {features.map(([title, text], index) => <article className="demo-feature-card" key={title}><h3>{title}</h3><p>{text}</p><span className="mini-price">CHF {index === 0 ? '4–8' : index === 1 ? '12–19' : '34+'}</span></article>)}
        </div>
      </section>

      <section className="demo-section">
        <div className="gallery-strip">
          <div className="gallery-image tall" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=1100&q=84')" }} />
          <div className="gallery-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=84')" }} />
          <div className="gallery-image tall" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1100&q=84')" }} />
        </div>
      </section>

      <div className="quote-band">
        <blockquote>“The site makes us look like the bakery we always were.”</blockquote>
        <span><Star size={18} /> 4.9 from 214 local reviews</span>
      </div>

      <section className="demo-section" id="contact">
        <div className="demo-contact-panel">
          <div><h2>Order before 15:00, pick up tomorrow morning.</h2><p>Perfect CTA placement for local businesses: direct call, direct order, no complicated backend needed.</p></div>
          <div className="demo-contact-card"><span><Clock3 size={18} /> Tue–Sat, 06:30–18:00</span><span><MapPin size={18} /> Bahnhofstrasse 12, Switzerland</span><strong>+41 00 000 00 00</strong></div>
        </div>
      </section>
      <footer className="demo-footer">Demo website by APTO.INK · Static, fast and easy to adapt.</footer>
    </DemoFrame>
  );
}
