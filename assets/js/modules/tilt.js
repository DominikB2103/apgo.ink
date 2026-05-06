export function initTilt(){
  const cards=[...document.querySelectorAll('[data-tilt]')];
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  cards.forEach(card=>{
    card.addEventListener('pointermove',event=>{
      const rect=card.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;
      card.style.transform=`perspective(900px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave',()=>{card.style.transform=''});
  });
}
