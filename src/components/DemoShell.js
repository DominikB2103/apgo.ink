import { html, join } from '../framework/dom.js';
import { Nav } from './Nav.js';
import { Footer } from './Footer.js';

export function DemoShell(demo){
  return html`${Nav({active:'examples'})}<main class="demo-shell demo-page demo-${demo.slug}">
    ${hero(demo)}
    ${intro(demo)}
    ${industryBlock(demo)}
    ${gallery(demo)}
    <section class="demo-section"><div class="container"><div class="review-card reveal"><blockquote>“${demo.review}”</blockquote><cite>Example client reaction</cite></div></div></section>
    <section class="demo-section" id="book"><div class="container"><div class="demo-footer-cta reveal"><h2>Like this direction?</h2><p>This is one example of how APTO.INK can make a local business feel established, memorable, and easy to contact.</p><div class="demo-actions"><a class="btn btn-primary magnetic" href="/">Back to APTO.INK</a><a class="btn btn-ghost magnetic" href="/demos/">View more examples</a></div></div></div></section>
  </main>${Footer()}`;
}

function hero(demo){
  if(demo.slug==='bakery') return html`<section class="demo-hero bakery-hero"><div class="container bakery-hero-grid"><div class="reveal"><span class="demo-label">${demo.type} concept</span><h1 class="demo-title">${demo.name}</h1><p class="demo-lead">${demo.lead}</p><div class="demo-actions"><a class="btn demo-primary magnetic" href="#book">${demo.cta}<span>→</span></a><a class="btn demo-secondary magnetic" href="#services">${demo.secondary}</a></div></div><div class="bakery-photo-stack reveal"><img class="photo-a" src="${demo.image}" alt="Bakery bread"><img class="photo-b" src="${demo.image2}" alt="Pastries"><div class="bakery-note"><strong>${demo.stat}</strong><span>${demo.statLabel}</span></div></div></div></section>`;
  if(demo.slug==='garage') return html`<section class="demo-hero garage-hero"><div class="container garage-grid"><div class="garage-console reveal"><span class="console-top">NORDWERK SERVICE SYSTEM</span><h1>${demo.name}</h1><p>${demo.lead}</p><div class="diagnostic-row"><span>Engine</span><b>Ready</b><span>Brakes</span><b>Checked</b><span>MFK</span><b>Prep</b></div><div class="demo-actions"><a class="btn demo-primary magnetic" href="#book">${demo.cta}<span>→</span></a><a class="btn demo-secondary magnetic" href="#services">${demo.secondary}</a></div></div><div class="garage-image reveal"><img src="${demo.image}" alt="Garage workshop"><div class="speed-card"><strong>${demo.stat}</strong><span>${demo.statLabel}</span></div></div></div></section>`;
  if(demo.slug==='municipality') return html`<section class="demo-hero civic-hero"><div class="container civic-grid"><div class="civic-panel reveal"><span class="demo-label">${demo.type} portal</span><h1>${demo.name}</h1><p>${demo.lead}</p><div class="civic-search">Search resident services, permits, waste calendar…</div><div class="demo-actions"><a class="btn demo-primary magnetic" href="#services">${demo.cta}</a><a class="btn demo-secondary magnetic" href="#notices">${demo.secondary}</a></div></div><div class="civic-photo reveal"><img src="${demo.image}" alt="Swiss municipality street"><div class="civic-stat"><strong>${demo.stat}</strong><span>${demo.statLabel}</span></div></div></div></section>`;
  return html`<section class="demo-hero clinic-hero"><div class="container clinic-grid"><div class="clinic-copy reveal"><span class="demo-label">${demo.type} website</span><h1>${demo.name}</h1><p>${demo.lead}</p><div class="clinic-pills"><span>Appointments</span><span>Profiles</span><span>Care paths</span></div><div class="demo-actions"><a class="btn demo-primary magnetic" href="#book">${demo.cta}</a><a class="btn demo-secondary magnetic" href="#team">${demo.secondary}</a></div></div><div class="clinic-card reveal"><img src="${demo.image}" alt="Clinic visual"><div class="clinic-book-mini"><strong>${demo.stat}</strong><span>${demo.statLabel}</span></div></div></div></section>`;
}

function intro(demo){
  return html`<section class="demo-section alt" id="services"><div class="container"><div class="demo-section-head reveal"><h2>${demo.sections[0][0]}</h2><p>${demo.sections[0][1]}</p></div><div class="demo-card-grid stagger">${join(demo.services.map((s,i)=>`<article class="demo-card"><span class="big">${i+1}</span><h3>${s}</h3><p>${serviceCopy(demo.slug,i)}</p></article>`))}</div></div></section>`;
}
function serviceCopy(slug,i){
  const copy={bakery:['Fresh categories with appetite, price cues and order moments.','Designed to make morning visits feel like a habit.','Pre-order paths for offices, weekends and holidays.','Catering pages that feel premium instead of generic.','Coffee and shop details connected to daily rhythm.','Seasonal launches that can change without redesign.'],garage:['Fault-finding explained clearly, without intimidating customers.','Tyres, wheels and seasonal changeovers with direct booking.','Service checks positioned as prevention, not repair panic.','Fleet pages that make B2B customers feel handled.','Pre-MFK preparation with concrete trust signals.','Emergency repair access for urgent drivers.'],municipality:['Resident tasks organized by urgency and frequency.','Permit guidance reduced to steps and documents.','Waste information visible without PDF hunting.','Council updates formatted for quick scanning.','Events designed as community moments, not notices.','Emergency information prioritized and calm.'],clinic:['Medical categories written in plain human language.','Therapy paths that explain what happens next.','Checkups positioned around prevention and reassurance.','Diagnostics described with confidence and clarity.','Follow-up care organized around patient continuity.','Preventive health content that builds trust.']};
  return copy[slug][i] || 'A focused block with clear value and a direct next step.';
}

function industryBlock(demo){
  if(demo.slug==='bakery') return html`<section class="demo-section bakery-menu dark"><div class="container"><div class="demo-section-head reveal"><h2>${demo.sections[1][0]}</h2><p>${demo.sections[1][1]}</p></div><div class="bakery-menu-grid stagger">${join(demo.menu.map(m=>`<article><span>${m[0]}</span><p>${m[1]}</p><strong>${m[2]}</strong></article>`))}</div></div></section>`;
  if(demo.slug==='garage') return html`<section class="demo-section garage-flow dark"><div class="container"><div class="demo-section-head reveal"><h2>${demo.sections[1][0]}</h2><p>${demo.sections[1][1]}</p></div><div class="service-lanes stagger">${join(demo.lanes.map(l=>`<article><b>${l[0]}</b><h3>${l[1]}</h3><p>${l[2]}</p></article>`))}</div></div></section>`;
  if(demo.slug==='municipality') return html`<section class="demo-section civic-notices" id="notices"><div class="container civic-layout"><div class="reveal"><span class="section-kicker">Public notices</span><h2 class="display-md">Information hierarchy that respects residents.</h2><p class="demo-lead">${demo.sections[1][1]}</p></div><div class="notice-stack stagger">${join(demo.notices.map(n=>`<article><strong>${n[0]}</strong><p>${n[1]}</p></article>`))}</div></div></section>`;
  return html`<section class="demo-section clinic-care dark" id="team"><div class="container clinic-layout"><div class="reveal"><h2 class="display-md">${demo.sections[1][0]}</h2><p class="demo-lead">${demo.sections[1][1]}</p></div><div class="team-stack stagger">${join(demo.team.map(t=>`<article><div class="doctor-dot"></div><strong>${t[0]}</strong><span>${t[1]}</span></article>`))}</div></div></section>`;
}

function gallery(demo){
  return html`<section class="demo-section demo-gallery-section"><div class="container"><div class="gallery-rail reveal"><div class="gallery-tile tall"><img src="${demo.image2}" alt="${demo.name} detail image"></div><div class="gallery-copy"><span class="section-kicker">Visual direction</span><h2>${demo.sections[2][0]}</h2><p>${demo.sections[2][1]}</p></div><div class="gallery-tile"><img src="${demo.image3}" alt="${demo.name} secondary image"></div></div></div></section>`;
}
