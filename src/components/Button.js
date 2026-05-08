import { html } from '../framework/dom.js';
export function Button({href='#', label='Button', variant='primary', className=''} = {}){
  return html`<a class="btn btn-${variant} ${className}" href="${href}">${label}<span aria-hidden="true">→</span></a>`;
}
