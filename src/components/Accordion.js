import { html, join } from '../framework/dom.js';
export function Accordion({items}){
  return html`<div class="accordion reveal">${join(items.map(([q,a],i)=>`<article class="accordion-item ${i===0?'open':''}"><button class="accordion-btn"><span>${q}</span><span>+</span></button><div class="accordion-panel"><p>${a}</p></div></article>`))}</div>`;
}
