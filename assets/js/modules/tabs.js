export function initTabs(){
  const root=document.querySelector('[data-tabs]');
  if(!root) return;
  const tabs=[...root.querySelectorAll('[role="tab"]')];
  const panels=[...root.querySelectorAll('[role="tabpanel"]')];
  const activate=(tab)=>{
    tabs.forEach(item=>item.setAttribute('aria-selected',String(item===tab)));
    panels.forEach(panel=>panel.classList.toggle('is-active',panel.id===tab.getAttribute('aria-controls')));
  };
  tabs.forEach(tab=>{
    tab.addEventListener('click',()=>activate(tab));
    tab.addEventListener('keydown',event=>{
      const index=tabs.indexOf(tab);
      if(event.key==='ArrowDown'||event.key==='ArrowRight') {event.preventDefault();activate(tabs[(index+1)%tabs.length]);tabs[(index+1)%tabs.length].focus();}
      if(event.key==='ArrowUp'||event.key==='ArrowLeft') {event.preventDefault();activate(tabs[(index-1+tabs.length)%tabs.length]);tabs[(index-1+tabs.length)%tabs.length].focus();}
    });
  });
}
