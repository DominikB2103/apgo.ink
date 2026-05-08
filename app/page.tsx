import { ArrowRight, BadgeCheck, ChevronRight, Clock3, Globe2, Mail, Phone, Sparkles } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { MagneticButton, Reveal } from '@/components/AnimatedShell';
import { Navigation } from '@/components/Navigation';
import { PortfolioFilter } from '@/components/PortfolioFilter';
import { demoCards, faqs, pricing, process, proof, retainers } from '@/lib/site-data';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <section className="hero">
          <div className="hero-inner">
            <Reveal>
              <span className="kicker">Swiss SME websites without server drama</span>
              <h1>Websites that make local businesses look <span className="gradient-text">unfairly premium.</span></h1>
              <p className="hero-copy">APTO.INK builds sharp, static, fast-loading websites for cafés, garages, clinics, municipalities, trades and independent Swiss companies that need more calls, more trust and a better first impression.</p>
              <div className="hero-actions">
                <MagneticButton href="#work">View examples <ArrowRight size={18} /></MagneticButton>
                <MagneticButton href="#pricing" variant="secondary">See pricing</MagneticButton>
              </div>
              <div className="hero-note">
                <span><BadgeCheck size={16} /> Next.js static export</span>
                <span><Clock3 size={16} /> Launch-ready structure</span>
                <span><Globe2 size={16} /> GitHub Pages compatible</span>
              </div>
            </Reveal>
            <Reveal className="orbit-stage" delay={0.12}>
              <div className="browser-card main">
                <div className="browser-bar"><span className="browser-dot" /><span className="browser-dot" /><span className="browser-dot" /></div>
                <div className="browser-body">
                  <div className="mock-hero" />
                  <div className="mock-line" />
                  <div className="mock-line short" />
                  <div className="mock-grid"><div className="mock-tile" /><div className="mock-tile" /></div>
                </div>
              </div>
              <div className="browser-card float-a stat-chip"><strong>0 server</strong><span>Static export hosting for lean recurring costs.</span></div>
              <div className="browser-card float-b stat-chip"><strong>4 demos</strong><span>Ready example worlds for different business niches.</span></div>
            </Reveal>
          </div>
        </section>

        <section className="section section-tight">
          <div className="proof-grid">
            {proof.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal className="proof-card" delay={index * 0.05} key={item.label}>
                  <Icon size={26} />
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-head">
            <div>
              <p className="section-label">Live-style examples</p>
              <h2>Business owners can click a niche and instantly understand the offer.</h2>
            </div>
            <p className="section-intro">These are not tiny thumbnails. Each example is a full-page demo made to feel like a realistic client website, with strong visuals, copy, trust sections and conversion CTAs.</p>
          </div>
          <PortfolioFilter />
        </section>

        <section className="section" id="pricing">
          <div className="section-head">
            <div>
              <p className="section-label">Pricing</p>
              <h2>Clear packages that make small businesses comfortable saying yes.</h2>
            </div>
            <p className="section-intro">Use these as starting prices. For real clients, charge more for multilingual copy, photography, booking tools, custom illustrations, or complex migrations.</p>
          </div>
          <div className="pricing-grid">
            {pricing.map((tier, index) => (
              <Reveal className={`price-card ${tier.featured ? 'featured' : ''}`} delay={index * 0.06} key={tier.name}>
                <h3>{tier.name}</h3>
                <p>{tier.tagline}</p>
                <div className="price"><strong>{tier.price}</strong><span>{tier.period}</span></div>
                <span className="best-for">Best for: {tier.bestFor}</span>
                <ul>{tier.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                <MagneticButton href="mailto:hello@apto.ink?subject=Website%20package" variant={tier.featured ? 'primary' : 'secondary'}>{tier.cta} <ChevronRight size={17} /></MagneticButton>
              </Reveal>
            ))}
          </div>
          <div className="retainers">
            {retainers.map((retainer) => (
              <div className="retainer" key={retainer.name}>
                <strong>{retainer.name}</strong>
                <b>{retainer.price}</b>
                <span>{retainer.detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="process">
          <div className="section-head">
            <div>
              <p className="section-label">Process</p>
              <h2>Designed like a mini agency, delivered like a fast operator.</h2>
            </div>
            <p className="section-intro">The whole sales pitch is simple: less friction than an agency, better taste than a generic site builder, and cheaper hosting than a bloated server stack.</p>
          </div>
          <div className="process-grid">
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal className="process-card" delay={index * 0.06} key={step.title}>
                  <Icon size={26} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <p className="section-label">Positioning</p>
              <h2>Why a client should buy from you instead of doing nothing.</h2>
            </div>
          </div>
          <div className="comparison">
            <div className="comparison-row comparison-head"><div>Option</div><div>What happens</div><div>Client feeling</div></div>
            <div className="comparison-row"><div className="dim">No website</div><div>They rely on Google snippets, old directories and random phone calls.</div><div className="dim">Invisible, outdated, hard to trust.</div></div>
            <div className="comparison-row"><div className="dim">Cheap builder template</div><div>The site exists, but looks like every other local business.</div><div className="dim">Acceptable, not memorable.</div></div>
            <div className="comparison-row"><div className="strong">APTO.INK</div><div>Custom visual direction, fast static delivery, clear CTAs and premium first impression.</div><div className="strong">Professional, trustworthy, worth calling.</div></div>
          </div>
        </section>

        <section className="section">
          <div className="cta-panel" id="contact">
            <p className="section-label">Start selling now</p>
            <h2>Send the demo link, call the business, and ask one brutal question.</h2>
            <p>“When someone searches for you today, does your online presence make them trust you — or does it make them hesitate?” That is the entire wedge. Then show the examples and offer a clean fixed-price package.</p>
            <div className="section-actions">
              <MagneticButton href="mailto:hello@apto.ink?subject=I%20want%20a%20website"><Mail size={18} /> Email APTO.INK</MagneticButton>
              <MagneticButton href="tel:+41000000000" variant="secondary"><Phone size={18} /> Call placeholder</MagneticButton>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <p className="section-label">FAQ</p>
              <h2>Answers for business owners before they object.</h2>
            </div>
          </div>
          <div className="faq-grid">
            {faqs.map(([question, answer]) => (
              <div className="faq-card" key={question}>
                <strong>{question}</strong>
                <p>{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
