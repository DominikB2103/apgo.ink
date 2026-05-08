import { html, join } from '../framework/dom.js';
export function PricingCard(pkg, i){
  return html`<article class="price-card card reveal ${i===1?'featured':''}">
    <div class="price-top"><span class="pill">${pkg.badge}</span><span class="tiny muted">${pkg.name}</span></div>
    <div><h3 class="heading-lg">${pkg.name}</h3><p class="copy">${pkg.description}</p></div>
    <div class="price">${pkg.price}<small> / ${pkg.note}</small></div>
    <ul class="feature-list">${join(pkg.features.map(f=>`<li>${f}</li>`))}</ul>
    <a class="btn ${i===1?'btn-primary':'btn-ghost'}" href="/#contact">Request this package <span>→</span></a>
  </article>`;
}
