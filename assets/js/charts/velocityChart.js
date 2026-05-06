import { velocityData } from '../data/velocityData.js';
import { map } from '../utils/math.js';
export function initVelocityChart(){
  const canvas=document.getElementById('velocityChart');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  const dpr=Math.min(2,window.devicePixelRatio||1);
  let w,h;
  const resize=()=>{
    w=canvas.clientWidth;h=canvas.clientHeight;
    canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    draw();
  };
  const draw=()=>{
    ctx.clearRect(0,0,w,h);
    const pad=28;
    const max=Math.max(...velocityData)*1.1;
    const min=0;
    ctx.strokeStyle='rgba(244,241,235,.08)';ctx.lineWidth=1;
    for(let i=0;i<5;i++){const y=pad+(h-pad*2)/4*i;ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(w-pad,y);ctx.stroke();}
    const pts=velocityData.map((value,i)=>[pad+(w-pad*2)/(velocityData.length-1)*i,map(value,min,max,h-pad,pad)]);
    const gradient=ctx.createLinearGradient(0,pad,0,h-pad);gradient.addColorStop(0,'rgba(132,217,155,.28)');gradient.addColorStop(1,'rgba(132,217,155,0)');
    ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.lineTo(w-pad,h-pad);ctx.lineTo(pad,h-pad);ctx.closePath();ctx.fillStyle=gradient;ctx.fill();
    ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle='#84d99b';ctx.lineWidth=2.4;ctx.shadowBlur=16;ctx.shadowColor='rgba(132,217,155,.48)';ctx.stroke();ctx.shadowBlur=0;
    pts.slice(-1).forEach(([x,y])=>{ctx.fillStyle='#f5f1e8';ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();});
  };
  resize();window.addEventListener('resize',resize,{passive:true});
}
