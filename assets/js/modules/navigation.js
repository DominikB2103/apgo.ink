export function initNavigation(){
  const header=document.querySelector('[data-header]');
  const toggle=document.querySelector('[data-nav-toggle]');
  const menu=document.querySelector('[data-nav-menu]');
  const discordLinks=document.querySelectorAll('[data-discord-link]');
  const back=document.querySelector('[data-back-to-top]');
  const onScroll=()=>header?.classList.toggle('is-scrolled',window.scrollY>18);
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});
  toggle?.addEventListener('click',()=>{
    const open=!menu.classList.contains('is-open');
    menu.classList.toggle('is-open',open);
    toggle.setAttribute('aria-expanded',String(open));
  });
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    menu.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded','false');
  }));
  discordLinks.forEach(link=>{
    link.addEventListener('click',(event)=>{
      const href=link.getAttribute('href') || '';
      if(href.includes('REPLACE-ME') || href === '#discord'){
        event.preventDefault();
        document.querySelector('#discord')?.scrollIntoView({behavior:'smooth',block:'center'});
      }
    });
  });
  back?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}
