import { scenarioData } from '../data/scenarioData.js';
import { formatPct } from '../utils/math.js';
export function initScenarioBars(){
  const root=document.getElementById('scenarioBars');
  if(!root) return;
  scenarioData.forEach(item=>{
    const row=document.createElement('div');
    row.className='scenario-row';
    row.innerHTML=`<strong>${item.name}</strong><span>${formatPct(item.change)}</span><div class="scenario-track"><div class="scenario-fill ${item.type}" style="width:0%"></div></div>`;
    root.append(row);
    requestAnimationFrame(()=>setTimeout(()=>{row.querySelector('.scenario-fill').style.width=`${item.value}%`},80));
  });
}
