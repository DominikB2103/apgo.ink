import { html } from '../framework/dom.js';
import { site } from '../data/site.js';
export function Footer(){
  return html`<footer class="footer">
    <div class="container footer-grid">
      <div class="stack">
        <a class="brand" href="/"><span class="brand-mark">A</span><span>${site.brand}</span></a>
        <p class="copy">${site.claim}</p>
      </div>
      <div class="stack"><strong>Examples</strong><a href="/demos/bakery/">Bakery</a><a href="/demos/garage/">Garage</a><a href="/demos/municipality/">Municipality</a><a href="/demos/clinic/">Clinic</a></div>
      <div class="stack"><strong>Studio</strong><a href="/#pricing">Pricing</a><a href="/#process">Process</a><a href="/#contact">Contact</a><a href="/demos/">All demos</a></div>
      <div class="stack"><strong>Legal</strong><a href="/legal/impressum/">Impressum</a><a href="/legal/privacy/">Privacy</a><span class="muted tiny">© ${new Date().getFullYear()} ${site.brand}</span></div>
    </div>
  </footer>`;
}
