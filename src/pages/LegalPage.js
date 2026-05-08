import { html } from '../framework/dom.js';
import { Shell } from '../components/Shell.js';
export function LegalPage(slug){
  const impressum = slug === 'impressum';
  return Shell({active:'', body:html`<section class="legal-page"><div class="container"><article class="legal-doc reveal"><h1>${impressum?'Impressum':'Privacy'}</h1><p>${impressum?'Replace this placeholder with your legal business details before publishing.':'Replace this placeholder with your final privacy policy before publishing.'}</p><h2>${impressum?'Responsible party':'Data collection'}</h2><p>APTO.INK / Your name, address, canton, Switzerland. Add email and phone details here.</p><h2>${impressum?'Liability note':'Contact'}</h2><p>This placeholder is intentionally simple. Review Swiss legal requirements before using the page commercially.</p></article></div></section>`});
}
