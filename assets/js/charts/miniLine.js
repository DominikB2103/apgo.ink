function createPath(points){
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point[0]} ${point[1]}`).join(' ');
}

export function renderHeroSparkline(){
  const svg = document.getElementById('heroSparkline');
  if (!svg) return;
  const width = 520;
  const height = 220;
  const padding = { top: 18, right: 18, bottom: 20, left: 18 };
  const series = [52, 50, 56, 61, 59, 64, 68, 66, 72, 78, 81, 86];
  const benchmark = [58, 57, 59, 58, 60, 61, 63, 62, 65, 67, 68, 69];
  const x = (i) => padding.left + (i * (width - padding.left - padding.right) / (series.length - 1));
  const y = (v) => height - padding.bottom - ((v - 48) / 40) * (height - padding.top - padding.bottom);
  const gridLines = Array.from({ length: 4 }, (_, i) => {
    const gy = padding.top + i * ((height - padding.top - padding.bottom) / 3);
    return `<line x1="${padding.left}" y1="${gy}" x2="${width - padding.right}" y2="${gy}" stroke="rgba(243,241,235,.1)" />`;
  }).join('');
  const pointsA = series.map((v, i) => [x(i), y(v)]);
  const pointsB = benchmark.map((v, i) => [x(i), y(v)]);
  const areaPath = `${createPath(pointsA)} L ${x(series.length - 1)} ${height - padding.bottom} L ${x(0)} ${height - padding.bottom} Z`;
  svg.innerHTML = `
    <defs>
      <linearGradient id="heroArea" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="rgba(130,199,146,.30)" />
        <stop offset="100%" stop-color="rgba(130,199,146,0)" />
      </linearGradient>
      <filter id="heroGlow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect x="1" y="1" width="518" height="218" rx="24" fill="rgba(255,255,255,.02)" stroke="rgba(243,241,235,.1)" />
    ${gridLines}
    <path d="${createPath(pointsB)}" fill="none" stroke="rgba(185,100,93,.70)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <path d="${areaPath}" fill="url(#heroArea)" />
    <path d="${createPath(pointsA)}" fill="none" stroke="#82c792" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#heroGlow)" />
    ${pointsA.map(([px, py], i) => i === pointsA.length - 1 ? `<circle cx="${px}" cy="${py}" r="4.5" fill="#f3f1eb" />` : '').join('')}
  `;
}
