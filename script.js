/*
  Tannenhof Mayer static site.
  Replace DISCORD_URL with your invite when ready.
*/
const DISCORD_URL = "#";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const palette = {
  ink: "#F4EFE5",
  muted: "rgba(244,239,229,0.58)",
  grid: "rgba(244,239,229,0.10)",
  gold: "#B2A16F",
  green: "#9AB58F",
  red: "#BF746B",
  bg: "#0B0B0A"
};

function setDiscordLinks() {
  $$(".discord-link").forEach((link) => {
    if (DISCORD_URL !== "#") {
      link.href = DISCORD_URL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = link.classList.contains("large") ? "Enter Discord" : link.textContent;
    } else if (link.getAttribute("href") === "#") {
      link.href = "#join";
    }
  });
}

function initHeader() {
  const header = $("[data-header]");
  const toggle = $(".nav-toggle");
  const nav = $("#site-nav");
  const update = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
  update();
  window.addEventListener("scroll", update, { passive: true });

  toggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      document.body.classList.remove("nav-open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });
}

function initReveal() {
  const items = $$(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

function resizeCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(320, Math.floor(rect.width));
  const height = Math.max(220, Math.floor(rect.height));
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width, height };
}

function makeSeries(length, seed, drift = 0.22, noise = 1.4) {
  const points = [];
  let value = seed;
  for (let i = 0; i < length; i += 1) {
    const cycle = Math.sin(i / 5.8) * noise + Math.cos(i / 10.3) * noise * 0.58;
    const shock = i % 17 === 0 ? -noise * 1.15 : 0;
    value += drift + cycle * 0.12 + shock;
    points.push(Number(value.toFixed(2)));
  }
  return points;
}

const heroData = {
  "1Y": makeSeries(42, 100, 0.52, 2.1),
  "3Y": makeSeries(72, 92, 0.34, 2.5),
  "5Y": makeSeries(96, 84, 0.29, 2.8)
};

const scenarios = {
  balanced: {
    title: "Balanced frontier",
    range: "8–14%",
    vol: "Moderate",
    cash: "18%",
    up: [100, 104, 107, 111, 109, 113, 118, 122, 121, 126, 130, 134],
    down: [100, 99, 101, 98, 96, 98, 97, 100, 102, 101, 104, 105]
  },
  riskon: {
    title: "Risk-on expansion",
    range: "14–24%",
    vol: "Elevated",
    cash: "10%",
    up: [100, 106, 112, 118, 116, 124, 132, 139, 143, 151, 160, 171],
    down: [100, 101, 98, 95, 92, 97, 102, 100, 106, 104, 111, 118]
  },
  stress: {
    title: "Stress review",
    range: "−9–6%",
    vol: "Controlled",
    cash: "32%",
    up: [100, 101, 99, 97, 96, 98, 100, 102, 101, 103, 105, 106],
    down: [100, 96, 93, 91, 88, 86, 89, 87, 90, 92, 91, 94]
  }
};

function linePath(ctx, points, mapX, mapY) {
  ctx.beginPath();
  points.forEach((point, index) => {
    const x = mapX(index);
    const y = mapY(point);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
}

function drawGrid(ctx, width, height, pad) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(11,11,10,0.16)";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = palette.grid;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i += 1) {
    const y = pad.top + ((height - pad.top - pad.bottom) / 5) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
  }
  for (let i = 0; i <= 6; i += 1) {
    const x = pad.left + ((width - pad.left - pad.right) / 6) * i;
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, height - pad.bottom);
    ctx.stroke();
  }
}

function drawLineChart(canvas, series, options = {}) {
  const { ctx, width, height } = resizeCanvas(canvas);
  const pad = { top: 26, right: 24, bottom: 34, left: 42 };
  const all = Array.isArray(series[0]) ? series.flat() : series;
  const min = Math.min(...all) * 0.985;
  const max = Math.max(...all) * 1.015;
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const longest = Array.isArray(series[0]) ? Math.max(...series.map((s) => s.length)) : series.length;
  const mapX = (i, length = longest) => pad.left + (i / Math.max(length - 1, 1)) * innerW;
  const mapY = (value) => pad.top + (1 - (value - min) / (max - min || 1)) * innerH;

  drawGrid(ctx, width, height, pad);

  ctx.fillStyle = palette.muted;
  ctx.font = "11px Inter, system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let i = 0; i <= 4; i += 1) {
    const value = min + ((max - min) / 4) * (4 - i);
    const y = pad.top + (innerH / 4) * i;
    ctx.fillText(value.toFixed(0), pad.left - 10, y);
  }

  const collections = Array.isArray(series[0]) ? series : [series];
  const colors = options.colors || [palette.green, palette.red];

  collections.forEach((points, idx) => {
    const color = colors[idx % colors.length];
    linePath(ctx, points, (i) => mapX(i, points.length), mapY);
    const gradient = ctx.createLinearGradient(0, pad.top, 0, height - pad.bottom);
    gradient.addColorStop(0, color + "55");
    gradient.addColorStop(1, color + "00");
    ctx.lineTo(mapX(points.length - 1, points.length), height - pad.bottom);
    ctx.lineTo(mapX(0, points.length), height - pad.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    linePath(ctx, points, (i) => mapX(i, points.length), mapY);
    ctx.strokeStyle = color;
    ctx.lineWidth = idx === 0 ? 2.4 : 2;
    ctx.stroke();

    const lastX = mapX(points.length - 1, points.length);
    const lastY = mapY(points[points.length - 1]);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  canvas._chartMeta = { series: collections, min, max, pad, width, height, mapX, mapY };
}

function initTooltips() {
  const tooltip = $("#chartTooltip");
  [$("#heroChart"), $("#scenarioChart")].filter(Boolean).forEach((canvas) => {
    canvas.addEventListener("mousemove", (event) => {
      const meta = canvas._chartMeta;
      if (!meta || !tooltip) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const innerW = meta.width - meta.pad.left - meta.pad.right;
      const ratio = Math.min(Math.max((x - meta.pad.left) / innerW, 0), 1);
      const primary = meta.series[0];
      const index = Math.round(ratio * (primary.length - 1));
      const values = meta.series.map((s) => s[Math.min(index, s.length - 1)]);
      tooltip.style.left = `${event.clientX}px`;
      tooltip.style.top = `${event.clientY}px`;
      tooltip.style.opacity = "1";
      tooltip.innerHTML = values.length > 1
        ? `Upside ${values[0].toFixed(1)} · Downside ${values[1].toFixed(1)}`
        : `Index ${values[0].toFixed(1)}`;
    });
    canvas.addEventListener("mouseleave", () => {
      if (tooltip) tooltip.style.opacity = "0";
    });
  });
}

function initHeroChart() {
  const canvas = $("#heroChart");
  if (!canvas) return;
  let active = "1Y";
  const render = () => drawLineChart(canvas, heroData[active], { colors: [palette.green] });
  render();
  $$(".period-btn").forEach((button) => {
    button.addEventListener("click", () => {
      active = button.dataset.period || "1Y";
      $$(".period-btn").forEach((btn) => btn.classList.toggle("is-active", btn === button));
      render();
    });
  });
  window.addEventListener("resize", render);
}

function initScenarioChart() {
  const canvas = $("#scenarioChart");
  if (!canvas) return;
  let active = "balanced";
  const name = $("#scenarioName");
  const range = $("#rangeMetric");
  const vol = $("#volMetric");
  const cash = $("#cashMetric");
  const render = () => {
    const scenario = scenarios[active];
    if (name) name.textContent = scenario.title;
    if (range) range.textContent = scenario.range;
    if (vol) vol.textContent = scenario.vol;
    if (cash) cash.textContent = scenario.cash;
    drawLineChart(canvas, [scenario.up, scenario.down], { colors: [palette.green, palette.red] });
  };
  render();
  $$(".scenario-btn").forEach((button) => {
    button.addEventListener("click", () => {
      active = button.dataset.scenario || "balanced";
      $$(".scenario-btn").forEach((btn) => btn.classList.toggle("is-active", btn === button));
      render();
    });
  });
  window.addEventListener("resize", render);
}

const strategyContent = {
  discovery: {
    label: "Layer 01",
    title: "Community signal intake",
    text: "We build watchlists from people who are close to markets, products, code, culture, and consumer behavior. The purpose is not to chase every trend. It is to identify the few signals that deserve professional research.",
    bullets: [
      "Structured thesis submissions with falsifiable claims.",
      "Signal scoring by novelty, evidence quality, and market relevance.",
      "Public debate that rewards precision over volume."
    ]
  },
  verification: {
    label: "Layer 02",
    title: "Evidence, debate, and decision records",
    text: "Promising ideas move into a verification process. The best research states what would disprove it, where the downside lives, and why the timing matters now rather than eventually.",
    bullets: [
      "Bull and bear case drafted before capital is discussed.",
      "Catalyst map, liquidity review, and key risk register.",
      "Decision memos archived so the firm can learn from outcomes."
    ]
  },
  allocation: {
    label: "Layer 03",
    title: "Sizing through risk budget, not excitement",
    text: "Allocation should express conviction while respecting uncertainty. Tannenhof Mayer’s process favors reserves, position limits, review points, and explicit exit logic.",
    bullets: [
      "Position size tied to evidence quality and downside tolerance.",
      "Cash reserve maintained for volatility and new opportunity.",
      "Ongoing review cadence after the initial thesis is approved."
    ]
  }
};

function initStrategyTabs() {
  const label = $("#strategyLabel");
  const title = $("#strategyTitle");
  const text = $("#strategyText");
  const bullets = $("#strategyBullets");
  $$(".strategy-tab").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.strategy || "discovery";
      const content = strategyContent[key];
      $$(".strategy-tab").forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      if (label) label.textContent = content.label;
      if (title) title.textContent = content.title;
      if (text) text.textContent = content.text;
      if (bullets) {
        bullets.innerHTML = content.bullets.map((item) => `<li>${item}</li>`).join("");
      }
    });
  });
}

function initAllocation() {
  const range = $("#convictionRange");
  const output = $("#convictionOutput");
  const bars = $("#allocationBars");
  if (!range || !bars) return;

  const categories = [
    { name: "Core quality", base: 32, sensitivity: 0.08 },
    { name: "Frontier themes", base: 22, sensitivity: 0.32 },
    { name: "Special situations", base: 14, sensitivity: 0.16 },
    { name: "Hedges", base: 12, sensitivity: -0.08 },
    { name: "Reserve", base: 20, sensitivity: -0.48 }
  ];

  function values(level) {
    const delta = level - 55;
    const raw = categories.map((cat) => Math.max(4, cat.base + delta * cat.sensitivity));
    const total = raw.reduce((sum, value) => sum + value, 0);
    return raw.map((value) => Math.round((value / total) * 100));
  }

  function render() {
    const level = Number(range.value);
    if (output) output.textContent = String(level);
    const allocation = values(level);
    bars.innerHTML = categories.map((cat, index) => `
      <div class="allocation-row">
        <span>${cat.name}</span>
        <div class="allocation-track"><div class="allocation-fill" style="width:${allocation[index]}%"></div></div>
        <strong>${allocation[index]}%</strong>
      </div>
    `).join("");
  }

  render();
  range.addEventListener("input", render);
}

function init() {
  setDiscordLinks();
  initHeader();
  initReveal();
  initHeroChart();
  initScenarioChart();
  initTooltips();
  initStrategyTabs();
  initAllocation();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
