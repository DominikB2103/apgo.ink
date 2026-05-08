'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  Check,
  ChevronRight,
  Globe2,
  Layers3,
  MapPin,
  Menu,
  MousePointer2,
  PhoneCall,
  Sparkles,
  Star,
  X
} from 'lucide-react';
import { demos, packages, proof, studio } from '@/lib/site-data';

const filters = ['all', 'food', 'service', 'public', 'health'] as const;

function LogoMark() {
  return (
    <Link href="/" className="logoMark" aria-label="APTO.INK home">
      <span className="logoGlyph">A</span>
      <span>
        <strong>APTO.INK</strong>
        <small>Swiss web atelier</small>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    ['Examples', '#examples'],
    ['Pricing', '#pricing'],
    ['Process', '#process'],
    ['FAQ', '#faq']
  ];
  return (
    <header className="topbar">
      <div className="shell navShell">
        <LogoMark />
        <nav className={open ? 'navLinks isOpen' : 'navLinks'} aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="navCall" href={`mailto:${studio.email}`}>Request a preview</a>
        </nav>
        <button className="menuButton" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}

function KineticBackdrop() {
  const orbRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.18]);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;
    const move = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 36;
      const y = (event.clientY / window.innerHeight - 0.5) * 36;
      gsap.to(orb, { x, y, duration: 0.9, ease: 'power3.out' });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div className="kineticBackdrop" style={{ scale }} aria-hidden="true">
      <div className="meshOrb orbOne" ref={orbRef} />
      <div className="meshOrb orbTwo" />
      <div className="gridGlow" />
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <KineticBackdrop />
      <div className="shell heroGrid">
        <motion.div className="heroCopy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <div className="eyebrow"><Sparkles size={15} /> websites that make local businesses look chosen</div>
          <h1>Give Swiss businesses a website people trust before they even call.</h1>
          <p className="lede">APTO.INK creates premium, fast, human websites for bakeries, garages, practices, municipalities, trades, restaurants, and service companies that still look invisible online.</p>
          <div className="heroActions">
            <a href="#examples" className="button dark">View the examples <ArrowRight size={18} /></a>
            <a href="#pricing" className="button glass">See pricing</a>
          </div>
          <div className="trustLine">
            <span><BadgeCheck size={17} /> Modern design</span>
            <span><PhoneCall size={17} /> Built to get calls</span>
            <span><MapPin size={17} /> Made for Swiss SMEs</span>
          </div>
        </motion.div>

        <motion.div className="heroStudio" initial={{ opacity: 0, rotateX: 12, y: 36 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>
          <div className="studioChrome">
            <span></span><span></span><span></span>
            <strong>live showroom</strong>
          </div>
          <div className="floatingScreen mainScreen">
            <img src={demos[0].thumb} alt="Premium bakery website preview" />
            <div>
              <small>current build</small>
              <strong>{demos[0].name}</strong>
              <p>Warm retail storytelling with instant contact paths.</p>
            </div>
          </div>
          <div className="floatingScreen sideScreen top">
            <img src={demos[1].thumb} alt="Garage website preview" />
            <span>garage</span>
          </div>
          <div className="floatingScreen sideScreen bottom">
            <img src={demos[3].thumb} alt="Clinic website preview" />
            <span>clinic</span>
          </div>
          <div className="heroMeter">
            <div><strong>4</strong><span>industries</span></div>
            <div><strong>11</strong><span>conversion blocks</span></div>
            <div><strong>∞</strong><span>local variations</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="proofStrip">
      <div className="shell proofGrid">
        {proof.map((item) => (
          <div key={item.label} className="proofItem">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Showroom() {
  const [active, setActive] = useState<(typeof filters)[number]>('all');
  const visible = useMemo(() => {
    if (active === 'all') return demos;
    return demos.filter((demo) => demo.tag.includes(active));
  }, [active]);

  return (
    <section className="section" id="examples">
      <div className="shell">
        <div className="sectionHead wide">
          <div>
            <span className="kicker">direct example directory</span>
            <h2>Show businesses what they could look like, instantly.</h2>
          </div>
          <p>Every card opens a complete example website. The goal is simple: when a business owner clicks one, they should immediately understand the quality you are selling.</p>
        </div>
        <div className="filterRow" role="tablist" aria-label="Filter examples">
          {filters.map((filter) => (
            <button key={filter} onClick={() => setActive(filter)} className={active === filter ? 'isActive' : ''}>{filter}</button>
          ))}
        </div>
        <div className="showroomGrid">
          {visible.map((demo, index) => (
            <motion.article className="demoCard" key={demo.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: index * 0.06 }}>
              <Link href={demo.href} aria-label={`Open ${demo.name}`}>
                <div className="demoImage" style={{ backgroundImage: `url(${demo.thumb})` }}>
                  <span>{demo.sector}</span>
                </div>
                <div className="demoBody">
                  <small>{demo.mood}</small>
                  <h3>{demo.name}</h3>
                  <p>{demo.headline}</p>
                  <strong>Open website <ChevronRight size={17} /></strong>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessCase() {
  const rows = [
    ['Before', 'No website, old Facebook page, phone number buried in a directory, no reason to trust them.'],
    ['After', 'A polished first impression, clear offers, real photos or licensed visuals, strong call button, map, opening hours.'],
    ['Result', 'The business looks established, searchable, and easier to choose — exactly what local buyers need.']
  ];
  return (
    <section className="section businessCase">
      <div className="shell caseGrid">
        <div className="caseVisual">
          <div className="browserMock large">
            <div className="mockTop"><span /><span /><span /></div>
            <div className="mockHero" />
            <div className="mockLines"><i /><i /><i /></div>
          </div>
          <div className="browserMock small one"><MousePointer2 size={22} /><strong>Call now</strong></div>
          <div className="browserMock small two"><Star size={22} /><strong>Trusted locally</strong></div>
        </div>
        <div className="caseCopy">
          <span className="kicker">what you are actually selling</span>
          <h2>Not “a website.” A better first impression.</h2>
          <p>For many small companies, the website is the missing proof that they are still alive, professional, reachable, and worth paying. APTO.INK sells that transformation.</p>
          <div className="caseRows">
            {rows.map(([label, body]) => (
              <div key={label}>
                <strong>{label}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="shell">
        <div className="sectionHead center">
          <span className="kicker">simple starting prices</span>
          <h2>Clear enough for a cold call. Serious enough for Switzerland.</h2>
          <p>These prices are written to be easy to explain on the phone. Each project can be adjusted for language, pages, photography, content depth, and urgency.</p>
        </div>
        <div className="pricingGrid">
          {packages.map((pack, index) => (
            <article className={index === 1 ? 'priceCard featured' : 'priceCard'} key={pack.name}>
              {index === 1 && <div className="popular">best first offer</div>}
              <h3>{pack.name}</h3>
              <p>{pack.anchor}</p>
              <strong className="price">{pack.price}</strong>
              <ul>
                {pack.features.map((feature) => (
                  <li key={feature}><Check size={17} />{feature}</li>
                ))}
              </ul>
              <small>{pack.note}</small>
            </article>
          ))}
        </div>
        <div className="carePlan">
          <div>
            <span className="kicker">optional care plan</span>
            <h3>CHF 95–290 / month for updates, small changes, monitoring, and seasonal content.</h3>
          </div>
          <a className="button dark" href={`mailto:${studio.email}`}>Ask for a quote</a>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ['01', 'Find the gap', 'Pick businesses with no website, weak listings, outdated visuals, or missing mobile usability.'],
    ['02', 'Show the vision', 'Send them to APTO.INK and one relevant example so they instantly see what you mean.'],
    ['03', 'Build the first cut', 'Collect text, photos, services, opening hours, and contact details. Turn it into a polished draft.'],
    ['04', 'Launch & support', 'Finalize changes, connect domain, hand off, and offer monthly care so the site stays alive.']
  ];
  return (
    <section className="section process" id="process">
      <div className="shell">
        <div className="sectionHead wide">
          <div>
            <span className="kicker">sales path</span>
            <h2>Built for your exact outreach plan.</h2>
          </div>
          <p>The public site does the explaining for you. Your call can stay short: identify the problem, point them to a relevant example, then offer a fixed-price first version.</p>
        </div>
        <div className="processGrid">
          {steps.map(([num, title, body]) => (
            <article key={num} className="processCard">
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SwissLayer() {
  const items = [
    ['Multilingual structure', 'German, French, Italian, or English sections can be planned without redesigning the site.'],
    ['Local trust blocks', 'Opening hours, cantonal service area, maps, payment notes, parking, emergency contact, and seasonal notices.'],
    ['Business-owner friendly', 'Clear prices, clear scope, no bloated enterprise process, no confusing tech pitch.'],
    ['Designed to sell by phone', 'Every page gives the owner something visual to react to while you talk.']
  ];
  return (
    <section className="section swissLayer">
      <div className="shell swissGrid">
        <div>
          <span className="kicker">Swiss SME ready</span>
          <h2>For the businesses people search for in their canton.</h2>
          <p>Restaurants, bakeries, garages, cleaners, physiotherapists, dentists, municipalities, electricians, beauty salons, carpenters, small hotels, and local consultants all need the same thing: trust, clarity, and a reason to call.</p>
        </div>
        <div className="swissCards">
          {items.map(([title, body]) => (
            <article key={title}>
              <Globe2 size={21} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    ['Can a business start with one page?', 'Yes. A strong one-page website is often better than five weak pages. The first goal is trust, clarity, and contact.'],
    ['Do clients need their own photos?', 'No, but real photos are ideal. The demos use licensed/free visual sources and strong direction, then real client images can replace them.'],
    ['Can the examples be adapted to another industry?', 'Yes. The blocks are reusable: hero, services, trust proof, opening hours, gallery, pricing, booking, and contact.'],
    ['What should be said on the call?', 'Keep it simple: “I noticed you do not have a proper website. I made examples of what a modern local business site can look like. Want me to send you one?”']
  ];
  return (
    <section className="section faq" id="faq">
      <div className="shell faqGrid">
        <div>
          <span className="kicker">questions owners ask</span>
          <h2>Answer objections before they become excuses.</h2>
        </div>
        <div className="faqList">
          {faqs.map(([q, a]) => (
            <details key={q} open={q.startsWith('Can a business')}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="finalCTA">
      <div className="shell ctaPanel">
        <div>
          <span className="kicker">make the next call easier</span>
          <h2>Send them a link that already feels like the answer.</h2>
          <p>APTO.INK is built to make a small business owner think: “I want my company to look like that.”</p>
        </div>
        <div className="ctaActions">
          <a href="#examples" className="button light">Browse examples</a>
          <a href={`mailto:${studio.email}`} className="button dark">Request a preview</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footerGrid">
        <LogoMark />
        <div>
          <strong>Examples</strong>
          {demos.map((demo) => <Link href={demo.href} key={demo.slug}>{demo.name}</Link>)}
        </div>
        <div>
          <strong>Studio</strong>
          <a href="#pricing">Pricing</a>
          <a href="#process">Process</a>
          <Link href="/legal/impressum/">Impressum</Link>
          <Link href="/legal/privacy/">Privacy</Link>
        </div>
        <div>
          <strong>Contact</strong>
          <a href={`mailto:${studio.email}`}>{studio.email}</a>
          <span>{studio.cityLine}</span>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <Showroom />
        <BusinessCase />
        <Pricing />
        <SwissLayer />
        <Process />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
