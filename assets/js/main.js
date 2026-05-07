import { DISCORD_URL } from './config.js';
import { initNavigation } from './modules/navigation.js';
import { initReveal } from './modules/reveal.js';
import { initScrollButtons } from './modules/scroll.js';
import { renderHeroSparkline } from './charts/miniLine.js';
import { initPerformanceChart } from './charts/performanceChart.js';
import { initAllocationChart } from './charts/allocationChart.js';
import { initScenarioBars } from './charts/scenarioBars.js';
import { initVelocityChart } from './charts/velocityChart.js';

const ready = (fn) => {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn, { once: true });
};

ready(() => {
  document.querySelectorAll('[data-discord-link]').forEach((link) => { link.href = DISCORD_URL; });
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  initNavigation();
  initReveal();
  initScrollButtons();
  renderHeroSparkline();
  initPerformanceChart();
  initAllocationChart();
  initScenarioBars();
  initVelocityChart();
});
