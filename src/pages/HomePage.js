import { html, join } from '../framework/dom.js';
import { Shell } from '../components/Shell.js';
import { Button } from '../components/Button.js';
import { SectionHead } from '../components/SectionHead.js';
import { CaseCard } from '../components/CaseCard.js';
import { PricingCard } from '../components/PricingCard.js';
import { Marquee } from '../components/Marquee.js';
import { MetricStrip } from '../components/MetricStrip.js';
import { Accordion } from '../components/Accordion.js';
import { ContactPanel } from '../components/ContactPanel.js';
import { demoList } from '../data/demos.js';
import { packages } from '../data/pricing.js';
import { faqs, process } from '../data/site.js';

export function HomePage(){
  const body = html`
    <section class="hero hero-v3"><div class="container hero-grid">
      <div class="hero-copyblock reveal">
        <span class="eyebrow">APTO.INK · Swiss web studio</span>
        <h1 class="hero-title display-xl"><span class="break">Websites</span><span class="break text-gradient">that sell trust.</span></h1>
        <p class="lead hero-copy">Premium websites for local businesses that need to look established before the first call. Real examples, clear pricing, and design that feels made — not assembled.</p>
        <div class="row hero-actions">${Button({href:'/demos/', label:'Explore examples'})}${Button({href:'#pricing', label:'See pricing', variant:'ghost'})}</div>
        <div class="hero-proof"><div class="proof-avatars"><span>ZH</span><span>BE</span><span>VD</span><span>TI</span></div><span>Built for Swiss SMEs, trades, practices, restaurants and local institutions.</span></div>
      </div>
      <div class="hero-visual reveal">
        <div class="hero-showcase-stack">
          <a class="showcase-browser top" href="/demos/bakery/"><img src="${demoList[0].image}" alt="Bakery website preview"><div><span>Maison Levain</span><strong>Warm editorial bakery</strong></div></a>
          <a class="showcase-browser mid" href="/demos/garage/"><img src="${demoList[1].image}" alt="Garage website preview"><div><span>Nordwerk Garage</span><strong>Dark technical service</strong></div></a>
          <a class="showcase-browser low" href="/demos/clinic/"><img src="${demoList[3].image}" alt="Clinic website preview"><div><span>Praxis Vela</span><strong>Calm clinical booking</strong></div></a>
        </div>
        <div class="device-card dc-b floaty"><strong>4 unique example worlds</strong><p class="tiny muted">No copy-paste demo structure.</p></div>
      </div>
    </div></section>
    ${Marquee()}
    <section class="strategy-band"><div class="container">${MetricStrip()}</div></section>
    <section class="section" id="examples"><div class="container">
      ${SectionHead({kicker:'Example directory', title:'Distinct websites, not repeated templates.', copy:'Each example has its own atmosphere, layout logic, content rhythm, photography and conversion path — so prospects see range instead of copy-paste.'})}
      <div class="work-wall">${join(demoList.map(CaseCard))}</div>
    </div></section>
    <section class="section tight"><div class="container design-proof-grid">
      <div class="proof-panel editorial-proof reveal"><span class="section-kicker">Taste range</span><h3>One studio. Many visual languages.</h3><p>Editorial serif, high-contrast service design, civic calm, soft healthcare, restrained glass, real photography, and interaction details that make the site feel alive without screaming.</p></div>
      <div class="proof-panel image-proof reveal"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80" alt="Premium studio workspace"><div><strong>Image-led credibility</strong><span>Professional photography first. Decorative SVGs only when they help.</span></div></div>
    </div></section>
    <section class="section" id="pricing"><div class="container">
      ${SectionHead({kicker:'Pricing', title:'Clear offers for real phone calls.', copy:'Straightforward starting points that make sense for Swiss small and medium-sized businesses.'})}
      <div class="grid grid-4">${join(packages.map(PricingCard))}</div>
    </div></section>
    <section class="section" id="process"><div class="container">
      ${SectionHead({kicker:'Process', title:'Premium without agency theatre.', copy:'Most local businesses need taste, structure, persuasive copy, fast launch discipline, and someone who makes decisions.'})}
      <div class="grid grid-4 stagger">${join(process.map(([n,t,c])=>`<article class="process-step"><div class="num">${n}</div><h3>${t}</h3><p>${c}</p></article>`))}</div>
    </div></section>
    <section class="section tight"><div class="container">
      <div class="offer-band card reveal"><div class="offer-inner container"><strong>Cold-call hook: “I built sample directions for businesses like yours.”</strong><p class="copy">Send them to the example directory and let the design do the first half of the selling.</p><a class="btn btn-primary magnetic" href="/demos/">Open examples</a></div></div>
    </div></section>
    <section class="section"><div class="container grid grid-2"><div class="reveal"><span class="section-kicker">FAQ</span><h2 class="display-md">Questions owners ask before they trust a new website.</h2></div>${Accordion({items:faqs})}</div></section>
    ${ContactPanel()}`;
  return Shell({active:'studio', body});
}
