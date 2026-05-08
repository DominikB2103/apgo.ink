import { $, $$ } from './dom.js';

export function initMotion() {
  initReveal();
  initAccordions();
  initCounters();
  initMobileNav();
}

function initReveal(){
  const els = $$('.reveal, .stagger');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); } });
  }, {threshold:.12, rootMargin:'0px 0px -60px 0px'});
  els.forEach(el=>io.observe(el));
}

function initAccordions(){
  $$('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.accordion-item')?.classList.toggle('open'));
  });
}

function initCounters(){
  $$('.count-up').forEach(el => {
    const target = Number(el.dataset.target || '0');
    const suffix = el.dataset.suffix || '';
    let done = false;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(!entry.isIntersecting || done) return; done = true;
        const start = performance.now();
        const run = now => {
          const t = Math.min(1, (now-start)/950);
          const eased = 1 - Math.pow(1-t, 3);
          el.textContent = Math.round(target*eased).toLocaleString('de-CH') + suffix;
          if(t<1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run); io.disconnect();
      });
    }, {threshold:.4});
    io.observe(el);
  });
}

function initMobileNav(){
  const btn = $('.mobile-toggle');
  const links = $('.nav-links');
  if(!btn || !links) return;
  btn.addEventListener('click',()=> document.body.classList.toggle('nav-open'));
}
