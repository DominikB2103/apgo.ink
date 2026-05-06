import { allocationData } from '../data/allocationData.js';
const SVG_NS='http://www.w3.org/2000/svg';
const make=(name,attrs={})=>{const node=document.createElementNS(SVG_NS,name);Object.entries(attrs).forEach(([k,v])=>node.setAttribute(k,v));return node};
const polar=(cx,cy,r,angle)=>{const rad=(angle-90)*Math.PI/180;return [cx+r*Math.cos(rad),cy+r*Math.sin(rad)]};
const arc=(cx,cy,r,start,end)=>{const [sx,sy]=polar(cx,cy,r,end);const [ex,ey]=polar(cx,cy,r,start);const large=end-start<=180?0:1;return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 0 ${ex} ${ey}`};
export function initAllocationChart(){
  const svg=document.getElementById('allocationChart');
  const list=document.getElementById('allocationList');
  if(!svg||!list) return;
  const total=allocationData.reduce((sum,d)=>sum+d.value,0);let angle=0;
  svg.setAttribute('viewBox','0 0 260 260');
  allocationData.forEach((item,index)=>{
    const start=angle;const end=angle+(item.value/total)*360;angle=end;
    const path=make('path',{d:arc(130,130,92,start,end),fill:'none',stroke:item.color,'stroke-width':'28','stroke-linecap':'round',opacity:index===0?'1':'.86'});
    path.style.filter=`drop-shadow(0 0 10px ${item.color}55)`;
    svg.append(path);
    const li=document.createElement('li');
    li.innerHTML=`<span><i style="background:${item.color}"></i>${item.name}</span><strong>${item.value}%</strong>`;
    list.append(li);
  });
}
