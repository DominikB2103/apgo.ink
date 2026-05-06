export function initCounters(){
  const counters=[...document.querySelectorAll('[data-counter]')];
  if(!counters.length) return;
  const ease=t=>1-Math.pow(1-t,4);
  const animate=(el)=>{
    const target=Number(el.dataset.target || 0);
    const decimals=Number(el.dataset.decimals || 0);
    const start=performance.now();
    const duration=1200;
    const frame=(now)=>{
      const progress=Math.min(1,(now-start)/duration);
      el.textContent=(target*ease(progress)).toFixed(decimals);
      if(progress<1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){animate(entry.target);io.unobserve(entry.target)}
  }),{threshold:.4});
  counters.forEach(counter=>io.observe(counter));
}
