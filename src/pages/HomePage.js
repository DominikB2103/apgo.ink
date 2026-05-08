import { html, join } from '../framework/dom.js';
import { Shell } from '../components/Shell.js';
import { Button } from '../components/Button.js';
import { SectionHead } from '../components/SectionHead.js';
import { CaseCard } from '../components/CaseCard.js';
import { PricingCard } from '../components/PricingCard.js';
import { Accordion } from '../components/Accordion.js';
import { ContactPanel } from '../components/ContactPanel.js';
import { demoList } from '../data/demos.js';
import { packages } from '../data/pricing.js';
import { faqs, process } from '../data/site.js';

const previewWindows = [
  ['bakery','Bakery direction','Maison Levain'],
  ['garage','Garage direction','Nordwerk'],
  ['clinic','Clinic direction','Praxis Vela']
];

function PreviewWindow([slug,label,name], i){
  const demo = demoList.find(d => d.slug === slug);
  return html`<a href="${demo.href}" class="site-window ${i===0?'large':''} reveal">
    <div class="browser-bar"><span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span></div>
    <img src="${demo.image}" alt="${name} website preview" loading="${i===0?'eager':'lazy'}">
    <div class="window-caption"><span class="window-tag">${label}</span>${name}</div>
  </a>`;
}

export function HomePage(){
  const body = html`
    <section class="hero"><div class="container hero-grid">
      <div class="hero-copyblock reveal">
        <span class="eyebrow">Swiss SME web studio</span>
        <h1 class="hero-title display-xl"><span class="break">Make your business</span><span class="break text-gradient">impossible to ignore.</span></h1>
        <p class="lead hero-copy">APTO.INK creates sharp, premium websites for small and medium-sized Swiss businesses that need trust, clarity, and a reason for customers to call.</p>
        <div class="row hero-actions">${Button({href:'/demos/', label:'View example websites'})}${Button({href:'#pricing', label:'See pricing', variant:'ghost'})}</div>
        <div class="hero-proof"><div class="proof-avatars"><span>ZH</span><span>BE</span><span>VD</span><span>TI</span></div><span>Clean pages, strong copy, direct next steps — built for real local businesses.</span></div>
      </div>
      <div class="hero-visual">
        <div class="hero-showcase">${join(previewWindows.map(PreviewWindow))}</div>
        <div class="hero-mini-note reveal"><strong>Examples sell before the call.</strong><p>Send one link. Let prospects see the quality immediately.</p></div>
      </div>
    </div></section>

    <section class="section quiet-section" id="examples"><div class="container">
      ${SectionHead({kicker:'Example websites', title:'Four directions. One clear standard: the business must look worth choosing.', copy:'Every example has its own atmosphere, layout rhythm, and conversion path — warm bakery, precise garage, calm clinic, and civic service.'})}
      <div class="work-wall">${join(demoList.map(CaseCard))}</div>
    </div></section>

    <section class="section tight"><div class="container">
      <div class="warm-band reveal">
        <span class="section-kicker">Sales position</span>
        <h2 class="display-md" style="margin-top:1rem;max-width:900px">No futuristic noise. Just a business that feels established the second the page opens.</h2>
        <div class="direction-line">
          <article><strong>Visual confidence</strong><p>Strong typography, tasteful spacing, real service structure, and focused imagery.</p></article>
          <article><strong>Local trust</strong><p>Opening hours, location, offers, proof, and one obvious next step.</p></article>
          <article><strong>Simple close</strong><p>Fixed packages that are easy to explain by phone and easy to approve.</p></article>
        </div>
      </div>
    </div></section>

    <section class="section" id="pricing"><div class="container">
      ${SectionHead({kicker:'Pricing', title:'Simple packages for Swiss local businesses.', copy:'Clear starting points, fixed scope, and enough polish to make the first sale feel serious.'})}
      <div class="grid grid-4">${join(packages.map(PricingCard))}</div>
    </div></section>

    <section class="section" id="process"><div class="container">
      ${SectionHead({kicker:'Process', title:'A clean path from first call to launch.', copy:'Keep the project tight: audit what exists, choose the direction, build the page, launch, then improve.'})}
      <div class="grid grid-4 stagger">${join(process.map(([n,t,c])=>`<article class="process-step"><div class="num">${n}</div><h3>${t}</h3><p>${c}</p></article>`))}</div>
    </div></section>

    <section class="section"><div class="container grid grid-2"><div class="reveal"><span class="section-kicker">FAQ</span><h2 class="display-md" style="margin-top:1rem">Questions a business owner will ask before paying.</h2></div>${Accordion({items:faqs})}</div></section>
    ${ContactPanel()}`;
  return Shell({active:'studio', body});
}
