import { html } from '../framework/dom.js';
export function ContactPanel(){
  return html`<section class="section" id="contact"><div class="container"><div class="contact-card reveal">
    <span class="pill dark">Start with the first version</span>
    <h2 class="display-md" style="margin-top:1rem">Send a business owner one calm page with examples, pricing, and a reason to reply.</h2>
    <p class="lead">The offer is deliberately simple: choose a direction, agree on the pages, launch a sharp public face, then improve it over time. No inflated agency process required.</p>
    <div class="input-grid">
      <div class="mock-input">Business name</div><div class="mock-input">Industry</div><div class="mock-input">Website package</div><div class="mock-input">Phone / email</div>
    </div>
    <div class="row" style="margin-top:1.4rem"><a class="btn btn-primary" href="mailto:hello@apto.ink?subject=Website%20project%20request">Open email draft <span>→</span></a><span class="copy">Replace this with your real contact details before sending prospects here.</span></div>
  </div></div></section>`;
}
