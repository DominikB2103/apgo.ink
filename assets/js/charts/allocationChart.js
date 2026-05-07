import { allocationData } from '../data/allocationData.js';

function polar(cx, cy, r, angle) {
  const rad = (angle - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx, cy, rOuter, rInner, start, end) {
  const a0 = polar(cx, cy, rOuter, end);
  const a1 = polar(cx, cy, rOuter, start);
  const b0 = polar(cx, cy, rInner, start);
  const b1 = polar(cx, cy, rInner, end);
  const large = end - start > 180 ? 1 : 0;
  return [
    `M ${a0.x} ${a0.y}`,
    `A ${rOuter} ${rOuter} 0 ${large} 0 ${a1.x} ${a1.y}`,
    `L ${b0.x} ${b0.y}`,
    `A ${rInner} ${rInner} 0 ${large} 1 ${b1.x} ${b1.y}`,
    'Z'
  ].join(' ');
}

export function initAllocationChart(){
  const svg = document.getElementById('allocationChart');
  const list = document.getElementById('allocationList');
  if (!svg || !list) return;
  const size = 340;
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  const cx = size / 2;
  const cy = size / 2;
  const outer = 132;
  const inner = 86;
  let angle = 0;

  svg.innerHTML = `<circle cx="${cx}" cy="${cy}" r="${outer}" fill="none" stroke="rgba(243,241,235,.08)" stroke-width="1" />`;
  allocationData.forEach((item) => {
    const sweep = (item.value / 100) * 360;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', arcPath(cx, cy, outer, inner, angle, angle + sweep));
    path.setAttribute('fill', item.color);
    path.setAttribute('stroke', '#0b0b0b');
    path.setAttribute('stroke-width', '3');
    svg.appendChild(path);
    angle += sweep;
  });

  list.innerHTML = allocationData.map((item) => `
    <li>
      <i style="background:${item.color}"></i>
      <span>${item.label}</span>
      <strong>${item.value}%</strong>
    </li>`).join('');
}
