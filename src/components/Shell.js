import { html } from '../framework/dom.js';
import { Nav } from './Nav.js';
import { Footer } from './Footer.js';
export function Shell({active, body, footer=true, pageClass='page'} = {}){
  return html`${Nav({active})}<main class="${pageClass}">${body}</main>${footer?Footer():''}`;
}
