import { html } from '../framework/dom.js';
import { Shell } from '../components/Shell.js';
export function NotFoundPage(){return Shell({body:html`<section class="section"><div class="container"><h1 class="display-lg">Lost page. Strong website.</h1><p class="lead" style="margin-top:1rem">The page you wanted is not here.</p><a class="btn btn-primary magnetic" style="margin-top:2rem" href="/">Back home</a></div></section>`});}
