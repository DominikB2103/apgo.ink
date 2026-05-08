import { html, join } from '../framework/dom.js';
import { site, nav } from '../data/site.js';

export function Nav({active='' } = {}){
  const links = nav.map(item => html`<a href="${item.href}" class="${active===item.label.toLowerCase()?'active':''}">${item.label}</a>`);
  return html`
    <header class="nav">
      <div class="nav-inner">
        <a class="brand" href="/" aria-label="${site.brand} home"><span class="brand-mark">A</span><span>${site.brand}</span></a>
        <nav class="nav-links" aria-label="Main navigation">${join(links)}</nav>
        <div class="nav-actions">
          <a class="btn btn-primary" href="/#contact">Request a website</a>
          <button class="btn btn-ghost mobile-toggle" aria-label="Toggle menu">Menu</button>
        </div>
      </div>
    </header>`;
}
