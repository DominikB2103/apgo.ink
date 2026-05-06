export function drawMiniLines(){
  document.querySelectorAll('[data-mini-line]').forEach((el)=>{
    const isUp=el.dataset.miniLine==='up';
    const points=Array.from({length:26},(_,i)=>{
      const x=(i/25)*100;
      const y=isUp?72-i*1.85+Math.sin(i*.9)*9:30+i*1.6+Math.sin(i*.8)*10;
      return `${x.toFixed(2)},${Math.max(10,Math.min(90,y)).toFixed(2)}`;
    }).join(' ');
    el.innerHTML=`<svg viewBox="0 0 100 100" preserveAspectRatio="none"><defs><linearGradient id="miniGrad" x1="0" x2="0" y1="0" y2="1"><stop stop-color="rgba(132,217,155,.24)"/><stop offset="1" stop-color="rgba(132,217,155,0)"/></linearGradient></defs><polyline points="0,100 ${points} 100,100" fill="url(#miniGrad)" opacity=".9"></polyline><polyline points="${points}" fill="none" stroke="var(--green)" stroke-width="2.1" vector-effect="non-scaling-stroke"></polyline></svg>`;
  });
}
