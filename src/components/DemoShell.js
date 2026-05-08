import { html, join } from '../framework/dom.js';
import { Nav } from './Nav.js';
import { Footer } from './Footer.js';

export function DemoShell(demo){
  return html`${Nav({active:'examples'})}<main class="demo-shell demo-page">
    <section class="demo-hero"><div class="container demo-hero-grid">
      <div class="reveal"><span class="demo-label">${demo.type} website example</span><h1 class="demo-title">${demo.name}</h1><p class="demo-lead">${demo.lead}</p><div class="demo-actions"><a class="btn demo-primary magnetic" href="#book">${demo.cta}<span>→</span></a><a class="btn demo-secondary magnetic" href="#services">${demo.secondary}</a></div></div>
      <div class="demo-art reveal"><img src="${demo.image}" alt="${demo.name} visual"><div class="demo-art-card"><div><strong>${demo.title}</strong><p style="opacity:.62;margin-top:.35rem">A complete example direction for this industry.</p></div><div class="demo-stat"><strong>${demo.stat}</strong><span>${demo.statLabel}</span></div></div></div>
    </div></section>
    <section class="demo-section alt" id="services"><div class="container"><div class="demo-section-head reveal"><h2>Everything the visitor needs. Nothing they have to decode.</h2><p>${demo.sections[0][1]}</p></div><div class="demo-card-grid stagger">${join(demo.services.slice(0,6).map((s,i)=>`<article class="demo-card"><span class="big">${i+1}</span><h3>${s}</h3><p>Clear explanation, strong call-to-action, and a layout that feels designed instead of listed.</p></article>`))}</div></div></section>
    ${industryBlock(demo)}
    <section class="demo-section"><div class="container"><div class="review-card reveal"><blockquote>“${demo.review}”</blockquote><cite>Example client reaction</cite></div></div></section>
    <section class="demo-section" id="book"><div class="container"><div class="demo-footer-cta reveal"><h2>Like this direction?</h2><p>This example is designed to show what a finished industry-specific website can feel like before a business commits.</p><div class="demo-actions"><a class="btn btn-primary magnetic" href="/">Back to APTO.INK</a><a class="btn btn-ghost magnetic" href="/demos/">View more examples</a></div></div></div></section>
  </main>${Footer()}`;
}

function industryBlock(demo){
  if(demo.slug==='garage') return html`<section class="demo-section dark"><div class="container"><div class="demo-section-head reveal"><h2>Diagnostics, service, trust — designed like a control room.</h2><p>${demo.sections[1][1]}</p></div><div class="garage-gauges stagger"><div class="gauge"><strong>98%</strong></div><div class="gauge"><strong>MFK</strong></div><div class="gauge"><strong>24h</strong></div></div></div></section>`;
  if(demo.slug==='municipality') return html`<section class="demo-section"><div class="container"><div class="demo-section-head reveal"><h2>Resident services moved to the front door.</h2><p>${demo.sections[1][1]}</p></div><div class="civic-services stagger">${join(demo.services.map(s=>`<div class="service-row"><span class="service-icon">•</span><div><strong>${s}</strong><p style="opacity:.62">Find details, forms, and next steps quickly.</p></div></div>`))}</div></div></section>`;
  if(demo.slug==='clinic') return html`<section class="demo-section dark"><div class="container demo-hero-grid"><div class="reveal"><h2 class="display-md">Booking that feels calm, not clinical chaos.</h2><p class="demo-lead">${demo.sections[1][1]}</p></div><div class="clinic-booking reveal"><strong>Available slots</strong><div class="slot-grid"><span class="slot">08:20</span><span class="slot hot">09:10</span><span class="slot">10:40</span><span class="slot">13:30</span><span class="slot hot">15:00</span><span class="slot">16:20</span></div></div></div></section>`;
  return html`<section class="demo-section dark"><div class="container"><div class="demo-section-head reveal"><h2>Menu, story, appetite, order — all on one warm path.</h2><p>${demo.sections[1][1]}</p></div><div class="demo-menu stagger">${join(demo.services.map((s,i)=>`<div class="menu-card"><div><strong>${s}</strong><span> crafted daily, limited batches</span></div><em>CHF ${6+i*3}</em></div>`))}</div></div></section>`;
}
