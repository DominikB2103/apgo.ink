import { velocityData } from '../data/velocityData.js';

export function initVelocityChart(){
  const canvas = document.getElementById('velocityChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.width;
  const height = canvas.height;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  const pad = { top: 18, right: 12, bottom: 36, left: 36 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const max = Math.max(...velocityData.values) + 2;

  ctx.strokeStyle = 'rgba(243,241,235,.10)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = pad.top + (innerH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(243,241,235,.45)';
  ctx.font = '11px Inter';
  for (let i = 0; i <= 4; i += 1) {
    const value = Math.round(max - (max / 4) * i);
    const y = pad.top + (innerH / 4) * i;
    ctx.fillText(String(value), 6, y + 4);
  }

  const slot = innerW / velocityData.values.length;
  velocityData.values.forEach((value, index) => {
    const x = pad.left + slot * index + slot * 0.15;
    const barW = slot * 0.7;
    const barH = (value / max) * innerH;
    const y = pad.top + innerH - barH;
    ctx.fillStyle = 'rgba(130,199,146,.88)';
    ctx.beginPath();
    const r = 10;
    ctx.moveTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.lineTo(x + barW - r, y);
    ctx.arcTo(x + barW, y, x + barW, y + r, r);
    ctx.lineTo(x + barW, pad.top + innerH);
    ctx.lineTo(x, pad.top + innerH);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(243,241,235,.55)';
    ctx.fillText(velocityData.labels[index], x + barW / 2 - 10, height - 12);
  });
}
