import { html, join } from '../framework/dom.js';
import { Shell } from '../components/Shell.js';
import { CaseCard } from '../components/CaseCard.js';
import { demoList } from '../data/demos.js';
export function DemosPage(){
  return Shell({active:'examples', body:html`<section class="section"><div class="container"><span class="eyebrow">Website example library</span><h1 class="display-lg" style="margin-top:1rem;max-width:980px">Pick an industry. Show the quality without explaining it.</h1><p class="lead" style="margin-top:1rem">These examples are the sales tool: send the link, let the business owner click the direction closest to them, then discuss their actual site.</p><div class="work-wall" style="margin-top:3rem">${join(demoList.map(CaseCard))}</div></div></section>`});
}
