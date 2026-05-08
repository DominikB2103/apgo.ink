(function(){
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('[data-mobile-toggle]');
  if(toggle && nav){ toggle.addEventListener('click', () => nav.classList.toggle('open')); }

  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); } });
    }, { threshold:.12 });
    reveals.forEach(el => io.observe(el));
  } else { reveals.forEach(el => el.classList.add('visible')); }

  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 10;
      const y = ((e.clientY - r.top) / r.height - .5) * -10;
      card.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  const stage = document.querySelector('[data-preview-stage]');
  if(stage){
    window.addEventListener('pointermove', e => {
      const x = (e.clientX / window.innerWidth - .5) * 18;
      const y = (e.clientY / window.innerHeight - .5) * 18;
      stage.style.setProperty('--mx', `${x}px`);
      stage.style.setProperty('--my', `${y}px`);
    }, { passive:true });
  }
})();
