import { performanceData } from '../data/performanceData.js';
import { map, formatPct } from '../utils/math.js';

const SVG_NS='http://www.w3.org/2000/svg';
const make=(name,attrs={})=>{
  const node=document.createElementNS(SVG_NS,name);
  Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,value));
  return node;
};

export function initPerformanceChart(){
  const svg=document.getElementById('performanceChart');
  const shell=document.querySelector('[data-chart-shell]');
  const tooltip=document.querySelector('[data-tooltip]');
  if(!svg||!shell) return;
  let range='1Y';
  let resizeObserver;
  const render=()=>{
    const rect=svg.getBoundingClientRect();
    const width=Math.max(560,rect.width||900);
    const height=Math.max(360,rect.height||560);
    const pad={top:38,right:46,bottom:48,left:54};
    const innerW=width-pad.left-pad.right;
    const innerH=height-pad.top-pad.bottom;
    const data=performanceData[range];
    const capitalValues=data.map(d=>d.capital);
    const benchmarkValues=data.map(d=>d.benchmark);
    const max=Math.max(...capitalValues,...benchmarkValues)+8;
    const min=Math.min(...capitalValues,...benchmarkValues)-8;
    const drawMin=Math.min(...data.map(d=>d.drawdown))-3;
    svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
    svg.innerHTML='';
    const defs=make('defs');
    defs.innerHTML=`<linearGradient id="capitalGradient" x1="0" y1="0" x2="0" y2="1"><stop stop-color="rgba(132,217,155,.26)"/><stop offset="1" stop-color="rgba(132,217,155,0)"/></linearGradient>`;
    svg.append(defs);
    for(let i=0;i<=5;i++){
      const y=pad.top+(innerH/5)*i;
      svg.append(make('line',{x1:pad.left,y1:y,x2:width-pad.right,y2:y,class:'grid-line'}));
      const label=max-(max-min)*(i/5);
      svg.append(make('text',{x:16,y:y+4,class:'axis-label'})).textContent=Math.round(label);
    }
    data.forEach((d,i)=>{
      const x=pad.left+(innerW/(data.length-1))*i;
      if(i%Math.ceil(data.length/6)===0 || i===data.length-1){
        const text=make('text',{x,y:height-18,class:'axis-label','text-anchor':'middle'});
        text.textContent=d.label;
        svg.append(text);
      }
    });
    const point=(value,index)=>[pad.left+(innerW/(data.length-1))*index,map(value,min,max,height-pad.bottom,pad.top)];
    const linePath=(key)=>data.map((d,i)=>`${i?'L':'M'}${point(d[key],i).join(',')}`).join(' ');
    const areaPath=`${data.map((d,i)=>`${i?'L':'M'}${point(d.capital,i).join(',')}`).join(' ')} L ${width-pad.right},${height-pad.bottom} L ${pad.left},${height-pad.bottom} Z`;
    svg.append(make('path',{d:areaPath,class:'chart-area-up'}));
    svg.append(make('path',{d:linePath('benchmark'),class:'benchmark-line'}));
    svg.append(make('path',{d:linePath('capital'),class:'capital-line'}));
    const ddPath=data.map((d,i)=>{
      const x=pad.left+(innerW/(data.length-1))*i;
      const y=map(d.drawdown,drawMin,1,height-pad.bottom,pad.top+innerH*.56);
      return `${i?'L':'M'}${x},${y}`;
    }).join(' ');
    svg.append(make('path',{d:ddPath,class:'drawdown-line'}));
    const hotLayer=make('g');
    data.forEach((d,i)=>{
      const [x,y]=point(d.capital,i);
      const dot=make('circle',{cx:x,cy:y,r:4,class:'chart-dot',opacity:i===data.length-1?'1':'.35'});
      const hit=make('circle',{cx:x,cy:y,r:18,fill:'transparent',tabindex:'0'});
      const show=()=>{
        tooltip.innerHTML=`<strong>${d.label}</strong>Capital ${formatPct(d.capital-100)}<br>Drawdown ${d.drawdown.toFixed(1)}%<br>Benchmark ${formatPct(d.benchmark-100)}`;
        tooltip.style.left=`${x}px`;tooltip.style.top=`${y}px`;tooltip.style.opacity='1';
      };
      const hide=()=>{tooltip.style.opacity='0'};
      hit.addEventListener('pointerenter',show);hit.addEventListener('pointerleave',hide);hit.addEventListener('focus',show);hit.addEventListener('blur',hide);
      hotLayer.append(dot,hit);
    });
    svg.append(hotLayer);
  };
  document.querySelectorAll('[data-range]').forEach(button=>button.addEventListener('click',()=>{
    range=button.dataset.range;
    document.querySelectorAll('[data-range]').forEach(b=>b.classList.toggle('is-active',b===button));
    render();
  }));
  resizeObserver=new ResizeObserver(render);
  resizeObserver.observe(svg);
  render();
}
