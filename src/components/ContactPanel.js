import { html } from '../framework/dom.js';
export function ContactPanel(){
  return html`<section class="section" id="contact"><div class="container"><div class="contact-card reveal">
    <span class="pill dark">Start simple</span>
    <h2 class="display-md" style="margin-top:1rem">A local business should never look smaller online than it is in real life.</h2>
    <p class="lead">Use this page as the sales front. Send prospects directly to the examples and pricing. The message is simple: choose the level, choose the direction, launch a site that finally feels credible.</p>
    <div class="input-grid">
      <div class="mock-input">Business name</div><div class="mock-input">Industry</div><div class="mock-input">Package interest</div><div class="mock-input">Phone / email</div>
    </div>
    <div class="row" style="margin-top:1.4rem"><a class="btn btn-dark magnetic" href="mailto:hello@apto.ink?subject=Website%20project%20request">Open email draft <span>→</span></a><span class="copy">Replace this with your real contact form later.</span></div>
  </div></div></section>`;
}
