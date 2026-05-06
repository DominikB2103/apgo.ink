export function initCursor(){
  const cursor=document.querySelector('.market-cursor');
  if(!cursor || window.matchMedia('(pointer: coarse)').matches) return;
  window.addEventListener('pointermove',event=>{
    document.body.classList.add('has-pointer');
    cursor.style.left=`${event.clientX}px`;
    cursor.style.top=`${event.clientY}px`;
  },{passive:true});
}
