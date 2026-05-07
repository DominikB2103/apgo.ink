import { scenarioData } from '../data/scenarioData.js';

export function initScenarioBars(){
  const mount = document.getElementById('scenarioBars');
  if (!mount) return;
  const width = 520;
  const height = 320;
  const pad = { top: 28, right: 22, bottom: 42, left: 52 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const x = (v) => pad.left + (v / 100) * innerW;
  const y = (v) => pad.top + innerH - (v / 100) * innerH;
  const xTicks = [0,25,50,75,100];
  const yTicks = [0,25,50,75,100];

  const lines = xTicks.map((tick) => `<line x1="${x(tick)}" y1="${pad.top}" x2="${x(tick)}" y2="${height - pad.bottom}" class="chart-grid-line" />`).join('') +
    yTicks.map((tick) => `<line x1="${pad.left}" y1="${y(tick)}" x2="${width - pad.right}" y2="${y(tick)}" class="chart-grid-line" />`).join('');

  const xLabels = xTicks.map((tick) => `<text x="${x(tick)}" y="${height - 14}" text-anchor="middle" class="chart-tick">${tick}</text>`).join('');
  const yLabels = yTicks.map((tick) => `<text x="${pad.left - 10}" y="${y(tick) + 4}" text-anchor="end" class="chart-tick">${tick}</text>`).join('');

  const points = scenarioData.map((item) => `
    <g>
      <circle cx="${x(item.probability)}" cy="${y(item.impact)}" r="10" fill="${item.color}" opacity=".92" />
      <circle cx="${x(item.probability)}" cy="${y(item.impact)}" r="18" fill="${item.color}" opacity=".14" />
      <text x="${x(item.probability) + 14}" y="${y(item.impact) - 12}" class="chart-tick" fill="rgba(243,241,235,.78)">${item.label}</text>
    </g>`).join('');

  mount.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Scenario risk matrix showing probability and impact">
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="22" class="chart-border" />
      ${lines}
      ${xLabels}
      ${yLabels}
      ${points}
      <text x="${width / 2}" y="${height - 2}" text-anchor="middle" class="chart-axis-label">Probability</text>
      <text x="16" y="${height / 2}" transform="rotate(-90 16 ${height / 2})" text-anchor="middle" class="chart-axis-label">Impact</text>
    </svg>`;
}
