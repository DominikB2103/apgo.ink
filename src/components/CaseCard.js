import { html, join } from '../framework/dom.js';
export function CaseCard(demo){
  return html`<a href="${demo.href}" class="case-card card reveal" data-demo="${demo.slug}">
    <div class="case-visual">
      <img src="${demo.image}" alt="${demo.name} website example visual" loading="lazy">
      <div class="mini-preview">
        <span></span><strong>${demo.name}</strong><em>${demo.type}</em>
        <div class="mini-lines"><i></i><i></i><i></i></div>
      </div>
    </div>
    <div class="case-body"><span class="pill">${demo.type}</span><h3>${demo.name}</h3><p>${demo.title}</p><div class="case-tags">${join(demo.tags.map(t=>`<span class="pill">${t}</span>`))}</div></div>
  </a>`;
}
