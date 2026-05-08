import { mount } from './framework/dom.js';
import { initMotion } from './framework/motion.js';
import { setMeta } from './framework/meta.js';
import { HomePage } from './pages/HomePage.js';
import { DemosPage } from './pages/DemosPage.js';
import { DemoPage } from './pages/DemoPage.js';
import { LegalPage } from './pages/LegalPage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';
import { demos } from './data/demos.js';

const route = document.body.dataset.route || 'home';
const slug = document.body.dataset.slug || '';
const app = document.getElementById('app');

let markup = '';
if(route === 'home') { setMeta({title:'APTO.INK — Premium websites for Swiss businesses'}); markup = HomePage(); }
else if(route === 'demos') { setMeta({title:'Website examples — APTO.INK'}); markup = DemosPage(); }
else if(route === 'demo') { const demo = demos[slug] || demos.bakery; setMeta({title:`${demo.name} example — APTO.INK`, theme:demo.theme}); markup = DemoPage(slug); }
else if(route === 'legal') { setMeta({title:`${slug === 'impressum' ? 'Impressum' : 'Privacy'} — APTO.INK`}); markup = LegalPage(slug); }
else { markup = NotFoundPage(); }

mount(app, markup);
requestAnimationFrame(initMotion);
