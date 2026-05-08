import { html } from '../framework/dom.js';
export function MetricStrip(){
  return html`<div class="metric-strip reveal">
    <div class="metric"><strong class="count-up" data-target="4">0</strong><span>industry examples ready to show</span></div>
    <div class="metric"><strong class="count-up" data-target="3">0</strong><span>fixed entry packages</span></div>
    <div class="metric"><strong>&lt;2s</strong><span>target first-load feel</span></div>
    <div class="metric"><strong class="count-up" data-target="100" data-suffix="%">0%</strong><span>business-facing, no tech clutter</span></div>
  </div>`;
}
