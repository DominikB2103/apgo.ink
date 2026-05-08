'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, MapPin, PhoneCall, Sparkles, Star } from 'lucide-react';
import type { Demo } from '@/lib/site-data';
import { demos, studio } from '@/lib/site-data';

export function DemoDirectory() {
  return (
    <main className="demoDirectory">
      <div className="demoDirHero shell">
        <Link href="/" className="backLink"><ArrowLeft size={17} /> APTO.INK</Link>
        <span className="kicker">example website directory</span>
        <h1>Choose the industry that feels closest to the business you are calling.</h1>
        <p>Each example is a complete, polished public-facing website concept with its own mood, offer structure, calls to action, and trust blocks.</p>
      </div>
      <section className="shell directoryGrid">
        {demos.map((demo) => (
          <Link href={demo.href} key={demo.slug} className="directoryCard">
            <div className="directoryImage" style={{ backgroundImage: `url(${demo.thumb})` }} />
            <div>
              <small>{demo.sector}</small>
              <h2>{demo.name}</h2>
              <p>{demo.headline}</p>
              <span>Open website <ArrowRight size={16} /></span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export function DemoExperience({ demo }: { demo: Demo }) {
  return (
    <main
      className={`demoSite demo-${demo.slug}`}
      style={{
        ['--demo-accent' as string]: demo.accent,
        ['--demo-accent-2' as string]: demo.accent2,
        ['--demo-paper' as string]: demo.paper,
        ['--demo-ink' as string]: demo.ink,
        ['--demo-dark' as string]: demo.dark
      }}
    >
      <header className="demoNav">
        <Link href="/" className="demoBrand"><span>{demo.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>{demo.name}</Link>
        <nav>
          {demo.nav.map((item) => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}
        </nav>
        <a href={`mailto:${studio.email}`} className="demoNavCta">{demo.cta}</a>
      </header>

      <section className="demoHero">
        <div className="demoHeroImage" style={{ backgroundImage: `url(${demo.image})` }} />
        <div className="demoHeroOverlay" />
        <motion.div className="demoHeroContent" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <Link href="/demos/" className="backLink invert"><ArrowLeft size={17} /> all examples</Link>
          <span className="demoEyebrow"><Sparkles size={16} /> {demo.sector}</span>
          <h1>{demo.headline}</h1>
          <p>{demo.sections[0].body}</p>
          <div className="demoActions">
            <a href="#contact" className="button light">{demo.cta}</a>
            <a href="#services" className="button demoGhost">Explore services</a>
          </div>
        </motion.div>
        <motion.div className="demoStats" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
          {demo.stats.map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </motion.div>
      </section>

      <section className="demoIntro" id={demo.nav[0].toLowerCase()}>
        <div className="demoShell introGrid">
          <div>
            <span className="demoKicker">built for first impressions</span>
            <h2>{demo.sections[0].title}</h2>
          </div>
          <p>{demo.sections[0].body}</p>
        </div>
      </section>

      <section className="demoServiceSection" id="services">
        <div className="demoShell">
          <div className="demoSectionHead">
            <span className="demoKicker">what customers need to understand</span>
            <h2>Clear paths, confident decisions, less friction.</h2>
          </div>
          <div className="demoServiceGrid">
            {demo.sections.map((section, index) => (
              <motion.article key={section.title} className="demoServiceCard" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.08 }}>
                <span>0{index + 1}</span>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="demoGallery">
        <div className="demoShell galleryGrid">
          {demo.gallery.map((src, index) => (
            <div key={src} className={`galleryPhoto photo${index + 1}`} style={{ backgroundImage: `url(${src})` }} />
          ))}
        </div>
      </section>

      <section className="demoFeatureBand" id={demo.nav[1].toLowerCase()}>
        <div className="demoShell featureBandGrid">
          <div>
            <span className="demoKicker">website modules</span>
            <h2>Designed to answer the questions people actually ask.</h2>
            <p>A strong local business site does not need to be enormous. It needs to remove doubt: what you do, why you are trusted, when you are open, and how to contact you.</p>
          </div>
          <div className="featureList">
            {demo.features.map((feature) => (
              <div key={feature}><Check size={18} /><span>{feature}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="demoProof" id={demo.nav[2].toLowerCase()}>
        <div className="demoShell proofCards">
          <article>
            <Star size={24} />
            <h3>Reputation-ready</h3>
            <p>Space for reviews, press snippets, certifications, supplier notes, or community involvement.</p>
          </article>
          <article>
            <Clock3 size={24} />
            <h3>Practical details</h3>
            <p>Opening hours, appointment notes, holiday closure, parking, emergency info, and clear next steps.</p>
          </article>
          <article>
            <CalendarDays size={24} />
            <h3>Seasonal updates</h3>
            <p>Campaigns, announcements, and specials can be refreshed without changing the whole identity.</p>
          </article>
        </div>
      </section>

      <section className="demoContact" id="contact">
        <div className="demoShell contactPanel">
          <div>
            <span className="demoKicker">ready to act</span>
            <h2>{demo.cta}</h2>
            <p>This final block is where a real client would put phone, map, email, opening hours, and booking options.</p>
          </div>
          <div className="contactCards">
            <a href={`mailto:${studio.email}`}><PhoneCall size={20} /> {studio.email}</a>
            <span><MapPin size={20} /> Canton service area</span>
            <Link href="/" className="homeReturn">Built by APTO.INK <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
