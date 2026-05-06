export function initReveal(){
  const items=[...document.querySelectorAll('.reveal')];
  if(!items.length) return;
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:.16,rootMargin:'0px 0px -40px'});
  items.forEach(item=>io.observe(item));
}
