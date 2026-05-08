import { html } from '../framework/dom.js';
export function SectionHead({kicker, title, copy}){
  return html`<div class="section-head reveal"><div><span class="section-kicker">${kicker}</span><h2 class="display-md split-title">${title}</h2></div><p class="lead">${copy}</p></div>`;
}
