import { $, $$ } from './dom.js';

export function initMotion() {
  initReveal();
  initMagnetics();
  initAccordions();
  initCursorGlow();
  initSpotlightButtons();
  initCounters();
  initCanvasField();
  initMobileNav();
}

function initReveal(){
  const els = $$('.reveal, .stagger');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); } });
  }, {threshold:.14, rootMargin:'0px 0px -70px 0px'});
  els.forEach(el=>io.observe(el));
}

function initMagnetics(){
  $$('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) * .16;
      const y = (e.clientY - r.top - r.height/2) * .16;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

function initSpotlightButtons(){
  $$('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', `${e.clientX-r.left}px`);
      btn.style.setProperty('--my', `${e.clientY-r.top}px`);
    });
  });
}

function initAccordions(){
  $$('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.accordion-item')?.classList.toggle('open'));
  });
}

function initCursorGlow(){
  const glow = $('#cursor-glow');
  if(!glow) return;
  let x = innerWidth/2, y = innerHeight/2, tx = x, ty = y;
  window.addEventListener('pointermove', e => { tx=e.clientX; ty=e.clientY; }, {passive:true});
  const tick = () => { x += (tx-x)*.12; y += (ty-y)*.12; glow.style.left=x+'px'; glow.style.top=y+'px'; requestAnimationFrame(tick); };
  tick();
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
          const t = Math.min(1, (now-start)/1100);
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

function initCanvasField(){
  const canvas = $('#signal-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w,h,points=[];
  const resize=()=>{w=canvas.width=canvas.offsetWidth*devicePixelRatio;h=canvas.height=canvas.offsetHeight*devicePixelRatio;points=Array.from({length:58},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35*devicePixelRatio,vy:(Math.random()-.5)*.35*devicePixelRatio,r:Math.random()*2+1}));};
  resize(); addEventListener('resize',resize);
  const draw=()=>{ctx.clearRect(0,0,w,h);ctx.globalCompositeOperation='screen';points.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;for(let j=i+1;j<points.length;j++){const q=points[j];const d=Math.hypot(p.x-q.x,p.y-q.y);if(d<170*devicePixelRatio){ctx.strokeStyle=`rgba(223,184,106,${(1-d/(170*devicePixelRatio))*.35})`;ctx.lineWidth=devicePixelRatio;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}}ctx.fillStyle='rgba(255,226,163,.72)';ctx.beginPath();ctx.arc(p.x,p.y,p.r*devicePixelRatio,0,Math.PI*2);ctx.fill();});requestAnimationFrame(draw);};draw();
}

function initMobileNav(){
  const btn = $('.mobile-toggle');
  const links = $('.nav-links');
  if(!btn || !links) return;
  btn.addEventListener('click',()=> document.body.classList.toggle('nav-open'));
}
