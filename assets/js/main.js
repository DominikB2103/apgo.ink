
const ready = (fn)=>document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);
ready(() => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  if (navToggle && navLinks) navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, {threshold:.14});
  document.querySelectorAll('.fade-up').forEach((el,i)=>{ el.style.transitionDelay = `${Math.min(i*55,260)}ms`; io.observe(el); });
  const stage = document.querySelector('.preview-stage');
  if(stage){
    stage.addEventListener('pointermove', (e)=>{
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      stage.style.setProperty('--mx', x.toFixed(3));
      stage.style.setProperty('--my', y.toFixed(3));
      document.querySelectorAll('.preview-window').forEach((el,idx)=>{
        const depth = (idx+1)*5;
        el.style.translate = `${x*depth}px ${y*depth}px`;
      })
    })
  }
});
