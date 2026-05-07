import { performanceData } from '../data/performanceData.js';

function el(name, attrs = {}) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', name);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

function pathFromPoints(points) {
  return points.map((point, index) => `${index ? 'L' : 'M'} ${point[0]} ${point[1]}`).join(' ');
}

export function initPerformanceChart() {
  const svg = document.getElementById('performanceChart');
  const tooltip = document.querySelector('[data-tooltip]');
  if (!svg || !tooltip) return;
  const buttons = document.querySelectorAll('[data-range]');
  const width = 760;
  const height = 420;
  const pad = { top: 22, right: 22, bottom: 34, left: 56 };

  const render = (key) => {
    buttons.forEach((button) => button.classList.toggle('is-active', button.dataset.range === key));
    const data = performanceData[key];
    const navMin = Math.min(...data.nav) - 2;
    const navMax = Math.max(...data.nav) + 2;
    const drawMin = Math.min(...data.drawdown) - .5;
    const drawMax = 0;
    svg.innerHTML = '';
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const defs = el('defs');
    defs.innerHTML = `
      <linearGradient id="navArea" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="rgba(130,199,146,.28)" />
        <stop offset="100%" stop-color="rgba(130,199,146,0)" />
      </linearGradient>
      <filter id="greenGlow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
    svg.appendChild(defs);

    svg.appendChild(el('rect', { x: 1, y: 1, width: width - 2, height: height - 2, rx: 24, class: 'chart-border' }));
    const plotTop = pad.top;
    const plotBottom = height - pad.bottom;
    const plotLeft = pad.left;
    const plotRight = width - pad.right;
    const plotHeight = plotBottom - plotTop;
    const zeroLineY = plotTop + plotHeight * 0.72;

    for (let i = 0; i < 5; i += 1) {
      const y = plotTop + (plotHeight / 4) * i;
      svg.appendChild(el('line', { x1: plotLeft, y1: y, x2: plotRight, y2: y, class: 'chart-grid-line' }));
    }
    for (let i = 0; i < data.labels.length; i += 1) {
      const x = plotLeft + ((plotRight - plotLeft) / (data.labels.length - 1)) * i;
      svg.appendChild(el('line', { x1: x, y1: plotTop, x2: x, y2: plotBottom, class: 'chart-grid-line', 'stroke-opacity': i === 0 ? '.16' : '.08' }));
      const t = el('text', { x, y: height - 12, 'text-anchor': 'middle', class: 'chart-tick' });
      t.textContent = data.labels[i];
      svg.appendChild(t);
    }

    const leftTicks = 4;
    for (let i = 0; i <= leftTicks; i += 1) {
      const value = navMin + ((navMax - navMin) / leftTicks) * (leftTicks - i);
      const y = plotTop + (plotHeight * 0.66 / leftTicks) * i;
      const t = el('text', { x: 12, y: y + 4, class: 'chart-tick' });
      t.textContent = value.toFixed(0);
      svg.appendChild(t);
    }
    const rightTicks = [0, -1, -2, -3, -4];
    rightTicks.forEach((value) => {
      const y = zeroLineY + ((value - drawMax) / (drawMin - drawMax)) * (plotBottom - zeroLineY);
      const t = el('text', { x: width - 10, y: y + 4, 'text-anchor': 'end', class: 'chart-tick' });
      t.textContent = `${value}%`;
      svg.appendChild(t);
    });

    const xFor = (i) => plotLeft + ((plotRight - plotLeft) / (data.labels.length - 1)) * i;
    const yForNav = (v) => plotTop + ((navMax - v) / (navMax - navMin)) * (plotHeight * 0.66);
    const yForDD = (v) => zeroLineY + ((v - drawMax) / (drawMin - drawMax)) * (plotBottom - zeroLineY);

    const navPoints = data.nav.map((value, i) => [xFor(i), yForNav(value)]);
    const navArea = `${pathFromPoints(navPoints)} L ${xFor(data.nav.length - 1)} ${zeroLineY} L ${xFor(0)} ${zeroLineY} Z`;
    const area = el('path', { d: navArea, fill: 'url(#navArea)' });
    svg.appendChild(area);

    data.drawdown.forEach((value, i) => {
      const x = xFor(i) - 12;
      const y = yForDD(value);
      const rect = el('rect', { x, y: zeroLineY, width: 24, height: Math.max(0, y - zeroLineY), rx: 6, fill: 'rgba(185,100,93,.75)' });
      svg.appendChild(rect);
    });

    const line = el('path', { d: pathFromPoints(navPoints), fill: 'none', stroke: '#82c792', 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', filter: 'url(#greenGlow)' });
    svg.appendChild(line);

    navPoints.forEach(([cx, cy], i) => {
      const circle = el('circle', { cx, cy, r: 4.5, fill: '#f3f1eb' });
      svg.appendChild(circle);
      const hit = el('rect', { x: cx - 18, y: plotTop, width: 36, height: plotHeight, fill: 'transparent', style: 'cursor:pointer' });
      hit.addEventListener('mousemove', () => {
        tooltip.classList.add('is-visible');
        tooltip.innerHTML = `<strong>${data.labels[i]}</strong><br>Model path: ${data.nav[i].toFixed(1)}<br>Drawdown: ${data.drawdown[i].toFixed(1)}%`;
        const bounds = svg.getBoundingClientRect();
        const pctX = cx / width;
        const pctY = cy / height;
        tooltip.style.left = `${pctX * bounds.width}px`;
        tooltip.style.top = `${pctY * bounds.height}px`;
      });
      hit.addEventListener('mouseleave', () => tooltip.classList.remove('is-visible'));
      svg.appendChild(hit);
    });

    const lLabel = el('text', { x: 12, y: 16, class: 'chart-axis-label' });
    lLabel.textContent = 'Growth of 100';
    svg.appendChild(lLabel);
    const rLabel = el('text', { x: width - 12, y: 16, class: 'chart-axis-label', 'text-anchor': 'end' });
    rLabel.textContent = 'Drawdown';
    svg.appendChild(rLabel);
  };

  buttons.forEach((button) => button.addEventListener('click', () => render(button.dataset.range)));
  render('1Y');
}
