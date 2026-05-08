import { html, join } from '../framework/dom.js';
export function Marquee(){
  const words = ['Premium first impression','Swiss SME positioning','Fast static pages','No template smell','Sharp typography','Mobile-first trust','Clear pricing','Example-led sales'];
  return html`<div class="marquee"><div class="marquee-track">${join([...words,...words].map(w=>`<span>${w}</span>`))}</div></div>`;
}
