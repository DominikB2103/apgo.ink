import { html, join } from '../framework/dom.js';
import { Shell } from '../components/Shell.js';
import { Button } from '../components/Button.js';
import { SectionHead } from '../components/SectionHead.js';
import { CaseCard } from '../components/CaseCard.js';
import { PricingCard } from '../components/PricingCard.js';
import { Marquee } from '../components/Marquee.js';
import { MetricStrip } from '../components/MetricStrip.js';
import { Accordion } from '../components/Accordion.js';
import { StudioCanvas } from '../components/StudioCanvas.js';
import { ContactPanel } from '../components/ContactPanel.js';
import { demoList } from '../data/demos.js';
import { packages } from '../data/pricing.js';
import { faqs, process } from '../data/site.js';

export function HomePage(){
  const body = html`
    <section class="hero"><div class="container hero-grid">
      <div class="hero-copyblock reveal">
        <span class="eyebrow">Swiss web studio for local businesses</span>
        <h1 class="hero-title display-xl"><span class="break">Websites</span><span class="break text-gradient">that make</span><span class="break">small businesses</span><span class="break thin">look inevitable.</span></h1>
        <p class="lead hero-copy">APTO.INK builds premium, example-led websites for bakeries, garages, clinics, municipalities, and service businesses that need trust before the first phone call.</p>
        <div class="row hero-actions">${Button({href:'/demos/', label:'View website examples'})}${Button({href:'#pricing', label:'See pricing', variant:'ghost'})}</div>
        <div class="hero-proof"><div class="proof-avatars"><span>ZH</span><span>BE</span><span>VD</span><span>TI</span></div><span>Built for Swiss SMEs that are serious about first impressions.</span></div>
      </div>
      <div class="hero-visual reveal">
        <div class="visual-browser hero-device device-main parallax"><div class="browser-bar"><span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span></div><div class="browser-body">
          <div class="hero-site-preview"><div class="preview-nav"><span class="pill">Local brand</span><span class="pill">Book now</span></div><div class="preview-hero"><div><h3>From unknown to trusted.</h3><p style="margin-top:.8rem;max-width:330px">A website should not simply exist. It should make the business feel established.</p></div><div class="preview-shot"></div></div><div class="preview-grid"><div class="preview-card"><strong>Packages visible.</strong><div class="preview-bars" style="margin-top:1rem"><span></span><span></span><span></span></div></div><div class="preview-card"><strong>Examples ready.</strong><div class="preview-bars" style="margin-top:1rem"><span></span><span></span><span></span></div></div></div></div>
        </div></div>
        <div class="device-card dc-a floaty"><strong>Direct example access</strong><p class="tiny muted">Bakery · Garage · Civic · Clinic</p></div>
        <div class="device-card dc-b floaty"><strong>Pricing on page</strong><p class="tiny muted">No guessing. Clear entry points.</p></div>
        <div class="device-card dc-c"><strong>Business-facing only.</strong><p>No hosting jargon. No framework explanation. Just value, examples, and contact momentum.</p></div>
      </div>
    </div></section>
    ${Marquee()}
    <section class="strategy-band"><div class="container">${MetricStrip()}</div></section>
    <section class="section" id="examples"><div class="container">
      ${SectionHead({kicker:'Example directory', title:'Four complete directions a prospect can click immediately.', copy:'The main page does the selling, then each example shows how a finished website could feel for a specific kind of business.'})}
      <div class="work-wall">${join(demoList.map(CaseCard))}</div>
    </div></section>
    <section class="section tight"><div class="container strategy-grid">
      <div class="strategy-card card reveal"><span class="section-kicker">Creative range</span><h3>Not one style. A system that adapts to the business.</h3><p>The site intentionally shows several aesthetics: editorial serif, glassmorphism, sharp monochrome, vector-driven illustration, and functional service layouts. The point is to make APTO.INK feel like a studio, not a template seller.</p></div>
      <div class="aesthetic-matrix stagger">
        <div class="aesthetic-tile editorial"><h4>Black / white serif</h4><p>Luxury editorial presence for premium local brands.</p></div>
        <div class="aesthetic-tile morph"><h4>Glass & depth</h4><p>Modern interface layers, motion, and trust panels.</p></div>
        <div class="aesthetic-tile vector"><h4>Vector identity</h4><p>Original graphic worlds without copyright risk.</p></div>
        <div class="aesthetic-tile mono"><h4>Flat clarity</h4><p>Readable service structures that convert on mobile.</p></div>
      </div>
    </div></section>
    <section class="section" id="pricing"><div class="container">
      ${SectionHead({kicker:'Pricing', title:'Simple packages that make calling local businesses easier.', copy:'These are starting offers, designed to be understandable on a phone call and credible for Swiss small to medium-sized businesses.'})}
      <div class="grid grid-4">${join(packages.map(PricingCard))}</div>
    </div></section>
    ${StudioCanvas()}
    <section class="section" id="process"><div class="container">
      ${SectionHead({kicker:'Process', title:'A polished website without agency theatre.', copy:'Most small businesses do not need months of workshops. They need taste, structure, good copy, trust, and launch discipline.'})}
      <div class="grid grid-4 stagger">${join(process.map(([n,t,c])=>`<article class="process-step"><div class="num">${n}</div><h3>${t}</h3><p>${c}</p></article>`))}</div>
    </div></section>
    <section class="section tight"><div class="container">
      <div class="offer-band card reveal"><div class="offer-inner container"><strong>Use the examples as the cold-call hook.</strong><p class="copy">“I made a sample website direction for businesses like yours — can I send it over?”</p><a class="btn btn-primary magnetic" href="/demos/">Open examples</a></div></div>
    </div></section>
    <section class="section"><div class="container grid grid-2"><div class="reveal"><span class="section-kicker">FAQ</span><h2 class="display-md">Questions owners ask before they trust a new website.</h2></div>${Accordion({items:faqs})}</div></section>
    ${ContactPanel()}`;
  return Shell({active:'studio', body});
}
