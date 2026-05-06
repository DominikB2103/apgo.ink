import { initNavigation } from './modules/navigation.js';
import { initReveal } from './modules/scrollReveal.js';
import { initCounters } from './modules/counters.js';
import { initTilt } from './modules/tilt.js';
import { initTabs } from './modules/tabs.js';
import { initHeroTape } from './modules/heroTape.js';
import { initCursor } from './modules/cursor.js';
import { drawMiniLines } from './charts/miniLine.js';
import { initPerformanceChart } from './charts/performanceChart.js';
import { initAllocationChart } from './charts/allocationChart.js';
import { initScenarioBars } from './charts/scenarioBars.js';
import { initVelocityChart } from './charts/velocityChart.js';

const ready = (callback) => {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback, { once: true });
};

ready(() => {
  document.getElementById('year')?.append(String(new Date().getFullYear()));
  initNavigation();
  initReveal();
  initCounters();
  initTilt();
  initTabs();
  initHeroTape();
  initCursor();
  drawMiniLines();
  initPerformanceChart();
  initAllocationChart();
  initScenarioBars();
  initVelocityChart();
});
