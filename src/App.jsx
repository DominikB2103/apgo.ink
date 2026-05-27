import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeDollarSign,
  Blocks,
  Bot,
  ChevronRight,
  CirclePlay,
  Compass,
  LayoutTemplate,
  MessageSquareQuote,
  MoveRight,
  Rocket,
  ShieldCheck,
  Sparkle,
  WandSparkles,
  Workflow,
} from 'lucide-react'
import MagneticButton from './components/MagneticButton'
import RevealSection from './components/RevealSection'
import SectionHeading from './components/SectionHeading'
import HeroScene from './components/HeroScene'

const services = [
  {
    icon: LayoutTemplate,
    title: 'Frontier Websites',
    text: 'Cinematic landing pages, custom interactions, and brand-first web experiences that signal authority immediately.',
  },
  {
    icon: Workflow,
    title: 'Business Systems',
    text: 'Booking flows, intake forms, dashboards, CRM structure, payment routing, and operational clarity from day one.',
  },
  {
    icon: Sparkle,
    title: 'Aesthetic Direction',
    text: 'Premium visual language, AI-assisted hero imagery, component styling, and sharp narrative framing.',
  },
  {
    icon: Rocket,
    title: 'Launch Infrastructure',
    text: 'Offer pages, lead-capture systems, content stacks, and launch assets so a business can move like a company.',
  },
  {
    icon: Bot,
    title: 'Automation Layer',
    text: 'Smart flows that reduce friction: responses, onboarding, lead qualification, and repeatable internal systems.',
  },
  {
    icon: ShieldCheck,
    title: 'Scale Support',
    text: 'Strategic prioritization, growth feedback, and ongoing refinement so the machine gets sharper as you grow.',
  },
]

const pipeline = [
  {
    label: '01',
    title: 'Decode the business',
    text: 'We extract the actual offer, positioning, and growth leverage instead of decorating confusion.',
  },
  {
    label: '02',
    title: 'Design the signal',
    text: 'We create a visual system that feels expensive, clear, and impossible to ignore.',
  },
  {
    label: '03',
    title: 'Build the machine',
    text: 'We develop the site, flows, automations, and supporting components so the business can operate smoothly.',
  },
  {
    label: '04',
    title: 'Launch with momentum',
    text: 'We connect the moving parts, refine the experience, and hand over a business engine that is ready to grow.',
  },
]

const showcases = [
  {
    title: 'Motion-led hero systems',
    text: 'Large typography, smooth object choreography, layered cards, and premium interactions that make visitors feel your technical edge before they read a line.',
    meta: 'Hero Concept',
  },
  {
    title: 'High-end custom components',
    text: 'Pricing systems, service blocks, case-study modules, CTA capsules, and dashboards built to feel bespoke — not library leftovers.',
    meta: 'Component Craft',
  },
  {
    title: 'Operational interface scenes',
    text: 'We turn invisible business work — bookings, growth, offers, onboarding — into visuals that explain value instantly.',
    meta: 'Business Storytelling',
  },
]

const tiers = [
  {
    name: 'Launch',
    price: '$2.5k+',
    tag: 'For the founder starting from scratch',
    features: ['Single-page or compact website', 'Offer clarity + baseline brand direction', 'Contact / lead capture setup', 'Foundational business structure'],
  },
  {
    name: 'Ascend',
    price: '$5k+',
    tag: 'For brands ready to look serious',
    features: ['Multi-section frontier website', 'Booking, payment, and systems setup', 'Custom motion + premium components', 'Growth-focused messaging architecture'],
    featured: true,
  },
  {
    name: 'Empire',
    price: '$9k+',
    tag: 'The full Wylo machine',
    features: ['Full web experience + launch assets', 'Operational flows / automations', 'Content system + support stack', 'High-touch strategy and scaling roadmap'],
  },
]

const proofs = [
  'Built to convert attention into momentum',
  'Made for ambitious young entrepreneurs',
  'Aesthetic, strategic, operational — all in one',
]

function ServiceCard({ icon: Icon, title, text, delay }) {
  return (
    <RevealSection delay={delay} className="service-card glass-panel">
      <div className="service-icon"><Icon size={18} /></div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="service-link">Explore signal <ChevronRight size={14} /></span>
    </RevealSection>
  )
}

function ShowcaseCard({ title, text, meta, index }) {
  return (
    <RevealSection className={`showcase-card showcase-${index + 1} glass-panel`} delay={index * 0.1}>
      <div className="showcase-visual">
        <div className="visual-glow" />
        <div className="mini-interface">
          <div className="mini-top" />
          <div className="mini-grid">
            <span className="pill">Wylo</span>
            <span className="line long" />
            <span className="line" />
            <span className="line short" />
            <span className="chart-line" />
            <span className="chart-orb" />
          </div>
        </div>
      </div>
      <span className="meta-pill">{meta}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </RevealSection>
  )
}

function TierCard({ tier, index }) {
  return (
    <RevealSection delay={index * 0.12} className={`tier-card glass-panel ${tier.featured ? 'featured' : ''}`}>
      {tier.featured && <span className="featured-flag">Most magnetic</span>}
      <div className="tier-head">
        <div>
          <p className="tier-name">{tier.name}</p>
          <h3>{tier.price}</h3>
        </div>
        <BadgeDollarSign size={18} />
      </div>
      <p className="tier-tag">{tier.tag}</p>
      <ul>
        {tier.features.map((feature) => (
          <li key={feature}><span className="check-dot" />{feature}</li>
        ))}
      </ul>
      <a href="#contact" className="tier-cta">Claim this tier <MoveRight size={14} /></a>
    </RevealSection>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const handlePointer = (event) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', handlePointer)
    return () => window.removeEventListener('pointermove', handlePointer)
  }, [])

  return (
    <>
      <motion.div
        className="cursor-glow"
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.div
        className="preloader"
        initial={false}
        animate={loading ? { opacity: 1, pointerEvents: 'all' } : { opacity: 0, pointerEvents: 'none' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="loader-mark">WYLO</div>
        <div className="loader-bar"><span /></div>
        <p>Constructing the frontier...</p>
      </motion.div>

      <div className="page-shell">
        <header className="topbar">
          <a href="#hero" className="brand-lockup">
            <span className="brand-mark">W</span>
            <div>
              <strong>Wylo</strong>
              <small>Frontier Digital Infrastructure</small>
            </div>
          </a>
          <nav>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#tiers">Tiers</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main>
          <section className="hero-section" id="hero">
            <div className="hero-copy">
              <RevealSection>
                <span className="eyebrow hero-eyebrow">WYLO // NEXT-GEN BUSINESS BUILDERS</span>
                <h1>
                  We don't just build websites.
                  <br />
                  <span>We manufacture momentum.</span>
                </h1>
                <p>
                  Wylo helps ambitious young entrepreneurs launch, organize, and scale with an entire digital business layer:
                  frontier websites, high-end aesthetics, systems, automation, and the operational structure to move like a real brand.
                </p>
              </RevealSection>

              <RevealSection className="hero-actions" delay={0.1}>
                <MagneticButton href="#contact">Start with Wylo</MagneticButton>
                <MagneticButton href="#showcase" variant="secondary">See the energy</MagneticButton>
              </RevealSection>

              <RevealSection className="hero-proof-row" delay={0.2}>
                {proofs.map((proof) => (
                  <div className="proof-pill" key={proof}>{proof}</div>
                ))}
              </RevealSection>
            </div>

            <RevealSection className="hero-visual-shell" delay={0.12}>
              <HeroScene />
            </RevealSection>
          </section>

          <section className="marquee-band">
            <div className="marquee-track">
              <span>FRONTIER AESTHETICS</span>
              <span>·</span>
              <span>CUSTOM COMPONENTS</span>
              <span>·</span>
              <span>BUSINESS SYSTEMS</span>
              <span>·</span>
              <span>FRAMER-MOTION STYLE SMOOTHNESS</span>
              <span>·</span>
              <span>WYLO</span>
              <span>·</span>
              <span>LAUNCH → ORGANIZE → SCALE</span>
            </div>
          </section>

          <section className="content-section" id="services">
            <RevealSection>
              <SectionHeading
                eyebrow="OFFER"
                title="An all-in-one business build for founders who want more than a pretty homepage."
                text="The Wylo stack is built to make a young entrepreneur look sharper, operate smoother, and scale faster — while feeling premium at every touchpoint."
              />
            </RevealSection>
            <div className="services-grid">
              {services.map((service, index) => (
                <ServiceCard key={service.title} {...service} delay={index * 0.08} />
              ))}
            </div>
          </section>

          <section className="content-section split-layout" id="process">
            <RevealSection>
              <SectionHeading
                eyebrow="PROCESS"
                title="Messy idea in. Structured brand out."
                text="We treat the project like infrastructure, not decoration. Every move is meant to increase clarity, trust, and actual business capability."
              />
            </RevealSection>
            <div className="pipeline-grid">
              {pipeline.map((step, index) => (
                <RevealSection key={step.title} className="pipeline-card" delay={index * 0.08}>
                  <div className="pipeline-label">{step.label}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </RevealSection>
              ))}
            </div>
          </section>

          <section className="content-section" id="showcase">
            <RevealSection>
              <SectionHeading
                eyebrow="VISUAL SYSTEM"
                title="The design language is part interface, part brand signal, part flex."
                text="This is where smooth animation, high-end layout choices, bold typography, and custom-built components come together to show the market you are not ordinary."
              />
            </RevealSection>
            <div className="showcase-grid">
              {showcases.map((item, index) => (
                <ShowcaseCard key={item.title} {...item} index={index} />
              ))}
            </div>
          </section>

          <section className="content-section manifesto-layout">
            <RevealSection className="manifesto glass-panel">
              <div className="manifesto-top">
                <span className="eyebrow">WHY WYLO</span>
                <Compass size={20} />
              </div>
              <h2>
                Big companies should feel a little jealous.
              </h2>
              <p>
                That's the bar. Wylo is meant to feel like the frontier — where business infrastructure meets taste, motion, and ambition.
                We build the kind of presence that makes people assume the company behind it must be serious.
              </p>
              <div className="manifesto-points">
                <div>
                  <Blocks size={18} />
                  <span>Custom component thinking</span>
                </div>
                <div>
                  <WandSparkles size={18} />
                  <span>Art-directed visuals and motion</span>
                </div>
                <div>
                  <CirclePlay size={18} />
                  <span>Experience-driven storytelling</span>
                </div>
              </div>
            </RevealSection>

            <RevealSection className="quote-panel glass-panel" delay={0.1}>
              <MessageSquareQuote size={24} />
              <p>
                "We help founders stop looking like beginners and start moving like brands."
              </p>
              <span>— Wylo positioning line</span>
            </RevealSection>
          </section>

          <section className="content-section" id="tiers">
            <RevealSection>
              <SectionHeading
                eyebrow="TIERS"
                title="Different intensities. Same frontier standard."
                text="Give founders a clean path to say yes. Each tier can be customized, but the positioning should always feel premium and intentional."
              />
            </RevealSection>
            <div className="tiers-grid">
              {tiers.map((tier, index) => (
                <TierCard key={tier.name} tier={tier} index={index} />
              ))}
            </div>
          </section>

          <section className="content-section cta-section" id="contact">
            <RevealSection className="cta-panel glass-panel">
              <span className="eyebrow">BOOK THE BUILD</span>
              <h2>Ready to make your business feel undeniable?</h2>
              <p>
                Whether you need the launch layer or the full machine, Wylo can shape the website, the systems, and the signal.
              </p>
              <div className="hero-actions">
                <MagneticButton href="mailto:hello@wylo.studio">hello@wylo.studio</MagneticButton>
                <MagneticButton href="#hero" variant="secondary">Back to top</MagneticButton>
              </div>
              <div className="contact-rail">
                <span>Instagram-ready aesthetics</span>
                <span>Conversion-minded structure</span>
                <span>Operational clarity</span>
                <span>Motion-first frontend</span>
              </div>
            </RevealSection>
          </section>
        </main>

        <footer className="footer">
          <div>
            <strong>Wylo</strong>
            <p>Frontier digital infrastructure for the next generation.</p>
          </div>
          <a href="#hero">Re-enter the orbit <ArrowRight size={14} /></a>
        </footer>
      </div>
    </>
  )
}
