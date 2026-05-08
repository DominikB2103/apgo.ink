import { html, join } from '../framework/dom.js';
import { Shell } from '../components/Shell.js';
import { CaseCard } from '../components/CaseCard.js';
import { demoList } from '../data/demos.js';
export function DemosPage(){
  return Shell({active:'examples', body:html`<section class="section"><div class="container"><span class="eyebrow">Website example library</span><h1 class="display-lg" style="margin-top:1rem">Choose the industry. Show the quality instantly.</h1><p class="lead" style="margin-top:1rem">Each example is a complete creative direction with its own mood, layout logic, visual system, and conversion path.</p><div class="work-wall" style="margin-top:3rem">${join(demoList.map(CaseCard))}</div></div></section>`});
}
