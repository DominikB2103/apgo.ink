import { clamp } from '../utils/math.js';
export function initHeroTape(){
  const canvas=document.getElementById('heroTape');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  const dpr=Math.min(2,window.devicePixelRatio||1);
  let width=0,height=0,tick=0;
  const resize=()=>{
    width=canvas.offsetWidth;height=canvas.offsetHeight;
    canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  };
  const draw=()=>{
    tick+=.008;
    ctx.clearRect(0,0,width,height);
    ctx.globalAlpha=.9;
    for(let line=0;line<7;line++){
      const up=line%3!==1;
      ctx.beginPath();
      const offset=line*74+Math.sin(tick+line)*24;
      for(let i=0;i<90;i++){
        const x=i*(width/70)-80;
        const trend=up ? -i*1.1 : i*.9;
        const y=height*.62 + offset*.42 + Math.sin(i*.46+tick*12+line)*34 + trend;
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.strokeStyle=up?'rgba(132,217,155,.22)':'rgba(224,106,95,.16)';
      ctx.lineWidth=line===1?1.2:1.7;
      ctx.shadowBlur=up?16:12;
      ctx.shadowColor=up?'rgba(132,217,155,.45)':'rgba(224,106,95,.32)';
      ctx.stroke();
      ctx.shadowBlur=0;
    }
    ctx.globalAlpha=.2;
    ctx.strokeStyle='rgba(244,241,235,.12)';
    ctx.lineWidth=1;
    for(let x=0;x<width;x+=80){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke();}
    for(let y=0;y<height;y+=80){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke();}
    requestAnimationFrame(draw);
  };
  resize();draw();
  window.addEventListener('resize',resize,{passive:true});
}
