import { html } from '../framework/dom.js';
export function StudioCanvas(){
  return html`<section class="section tight"><div class="container"><div class="canvas-panel reveal">
    <canvas id="signal-canvas" aria-hidden="true"></canvas><div class="scanline"></div><div class="grain-overlay"></div>
    <div class="canvas-content"><div><span class="eyebrow">living interface layer</span><h3>Motion, depth, typography, conversion — composed as one system.</h3></div><a class="btn btn-primary magnetic" href="/demos/">Explore examples</a></div>
  </div></div></section>`;
}
