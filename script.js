/*
  Tannenhof Mayer static site
  Edit this value when your Discord invite is ready.
*/
const DISCORD_URL = "#";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setDiscordLinks() {
  $$(".discord-link, a[href='#discord']").forEach((link) => {
    if (link.classList.contains("discord-link") && DISCORD_URL !== "#") {
      link.href = DISCORD_URL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
}

function initHeader() {
  const header = $("[data-elevate]");
  const toggle = $(".nav-toggle");
  const nav = $("#site-nav");
  const setScrolled = () => header.classList.toggle("is-scrolled", window.scrollY > 18);
  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  toggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav?.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      document.body.classList.remove("nav-open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });
}

function initCursorGlow() {
  const glow = $(".cursor-glow");
  if (!glow || window.matchMedia("(pointer: coarse)").matches) return;

  window.addEventListener("pointermove", (event) => {
    glow.style.opacity = "1";
    glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  window.addEventListener("pointerleave", () => {
    glow.style.opacity = "0";
  });
}

function initReveal() {
  const reveals = $$(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  reveals.forEach((el) => observer.observe(el));
}

function initCounters() {
  const counters = $$('[data-counter]');
  if (!counters.length) return;

  const runCounter = (counter) => {
    const target = Number(counter.dataset.counter || 0);
    const duration = prefersReducedMotion ? 0 : 1300;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = Math.min(1, (now - startTime) / duration || 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      counter.textContent = Math.round(target * eased).toString();
      if (elapsed < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(runCounter);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

const strategyCopy = {
  sourcing: {
    label: "Layer 01",
    title: "Sourcing",
    body: "Build a high-signal Discord community where members bring asymmetric ideas from markets, private companies, technology shifts, and local knowledge.",
    bullets: [
      "Member reputation and contribution trails",
      "Opportunity intake boards and theme rooms",
      "Founder/operator interviews and open memos"
    ]
  },
  diligence: {
    label: "Layer 02",
    title: "Diligence",
    body: "Turn raw ideas into institutional-grade research through memo templates, opposing views, catalyst mapping, downside cases, and contributor scoring.",
    bullets: [
      "Red-team reviews before conviction forms",
      "Quantitative and qualitative evidence boards",
      "Decision logs that preserve the original thesis"
    ]
  },
  allocation: {
    label: "Layer 03",
    title: "Allocation",
    body: "Treat capital deployment as a consequence of demonstrated conviction, not hype. Exposure follows risk limits, liquidity, concentration, and time horizon.",
    bullets: [
      "Position sizing tied to confidence and volatility",
      "Drawdown rules and kill criteria before entry",
      "Portfolio construction across themes and cycles"
    ]
  },
  governance: {
    label: "Layer 04",
    title: "Governance",
    body: "Design a future structure where contributors can participate through transparent rules, conflict controls, and legally reviewed ownership pathways.",
    bullets: [
      "Contribution-based trust and access layers",
      "Compliance-reviewed participation models",
      "Community reporting and decision transparency"
    ]
  }
};

function initStrategyPanel() {
  const panel = $("#strategyPanel");
  const nodes = $$("[data-strategy]");
  if (!panel || !nodes.length) return;

  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      nodes.forEach((item) => item.classList.remove("active"));
      node.classList.add("active");
      const data = strategyCopy[node.dataset.strategy] || strategyCopy.sourcing;
      panel.animate([
        { opacity: 0.7, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], { duration: 260, easing: "ease-out" });
      panel.innerHTML = `
        <span class="panel-label">${data.label}</span>
        <h3>${data.title}</h3>
        <p>${data.body}</p>
        <ul>${data.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
      `;
    });
  });
}

function setupCanvas(canvas, cssHeight) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(320, Math.floor(canvas.getBoundingClientRect().width || canvas.parentElement.clientWidth));
  const height = cssHeight || Number(canvas.getAttribute("height")) || 260;
  canvas.style.height = `${height}px`;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function drawGrid(ctx, width, height, options = {}) {
  const { dense = false, labels = false } = options;
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.075)";
  ctx.lineWidth = 1;
  const stepX = dense ? 38 : 58;
  const stepY = dense ? 34 : 46;
  for (let x = 0; x <= width; x += stepX) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += stepY) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(width, y + 0.5);
    ctx.stroke();
  }
  if (labels) {
    ctx.fillStyle = "rgba(247,247,242,0.36)";
    ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillText("LOW RISK", 14, height - 14);
    ctx.fillText("HIGH RETURN", 14, 18);
  }
  ctx.restore();
}

function normalizePoints(data, width, height, padding = 22) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (value - min) / range) * (height - padding * 2);
    return { x, y, value };
  });
}

function drawLineChart(canvas, data, options = {}) {
  const {
    cssHeight = 250,
    color = "#2cff88",
    secondaryColor = "rgba(44,255,136,0.16)",
    progress = 1,
    showTerminalReadout = false,
    fill = true
  } = options;
  const { ctx, width, height } = setupCanvas(canvas, cssHeight);
  ctx.clearRect(0, 0, width, height);
  drawGrid(ctx, width, height, { dense: showTerminalReadout });

  const points = normalizePoints(data, width, height, 26);
  const count = Math.max(2, Math.floor(points.length * progress));
  const visible = points.slice(0, count);

  ctx.save();
  ctx.beginPath();
  visible.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });

  if (fill && visible.length > 1) {
    const last = visible[visible.length - 1];
    const first = visible[0];
    const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
    fillGradient.addColorStop(0, secondaryColor);
    fillGradient.addColorStop(0.75, "rgba(255,255,255,0.012)");
    ctx.lineTo(last.x, height - 20);
    ctx.lineTo(first.x, height - 20);
    ctx.closePath();
    ctx.fillStyle = fillGradient;
    ctx.fill();
  }

  ctx.beginPath();
  visible.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else {
      const prev = visible[index - 1];
      const cx = (prev.x + point.x) / 2;
      ctx.bezierCurveTo(cx, prev.y, cx, point.y, point.x, point.y);
    }
  });
  ctx.shadowColor = color;
  ctx.shadowBlur = 22;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 1;
  ctx.stroke();

  const last = visible[visible.length - 1];
  if (last) {
    ctx.beginPath();
    ctx.arc(last.x, last.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 22;
    ctx.fill();
  }

  if (showTerminalReadout) {
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(247,247,242,0.52)";
    ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillText("VOL ADJ", 18, height - 18);
    ctx.fillStyle = color;
    ctx.fillText("LIVE SIGNAL", width - 102, 22);
  }
  ctx.restore();
}

const heroData = [
  48, 52, 50, 58, 62, 56, 66, 72, 68, 75, 82, 78, 88, 94, 91, 97, 106, 102, 114, 121, 118, 130,
  138, 132, 146, 152, 149, 160, 170, 164, 178, 188, 184, 198, 207, 204, 219, 226, 221, 238
];
const upData = [14, 17, 19, 18, 22, 27, 31, 28, 35, 42, 39, 48, 56, 52, 64, 74, 70, 83, 96, 91, 108, 122, 118, 136, 152, 148, 168, 188];
const downData = [136, 132, 130, 124, 128, 118, 110, 114, 102, 96, 91, 86, 82, 76, 69, 72, 64, 60, 58, 62, 55, 50, 48, 45, 42, 39, 37, 36];

function drawRiskMap(canvas, progress = 1) {
  const { ctx, width, height } = setupCanvas(canvas, 320);
  ctx.clearRect(0, 0, width, height);
  drawGrid(ctx, width, height, { dense: true, labels: true });

  const left = 44;
  const right = width - 24;
  const top = 24;
  const bottom = height - 44;

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, bottom);
  ctx.lineTo(right, bottom);
  ctx.moveTo(left, bottom);
  ctx.lineTo(left, top);
  ctx.stroke();

  const points = [
    { x: 0.18, y: 0.38, r: 11, label: "Cashflow", c: "#f7f7f2" },
    { x: 0.34, y: 0.63, r: 15, label: "Quality", c: "#2cff88" },
    { x: 0.58, y: 0.72, r: 19, label: "Frontier", c: "#2cff88" },
    { x: 0.78, y: 0.46, r: 14, label: "Cyclic", c: "#ff3b3b" },
    { x: 0.68, y: 0.84, r: 10, label: "Venture", c: "#2cff88" },
    { x: 0.47, y: 0.29, r: 9, label: "Hedge", c: "#f7f7f2" }
  ];

  points.forEach((point, index) => {
    const localProgress = Math.max(0, Math.min(1, progress * 1.25 - index * 0.08));
    if (!localProgress) return;
    const x = left + point.x * (right - left);
    const y = bottom - point.y * (bottom - top);
    ctx.globalAlpha = localProgress;
    ctx.beginPath();
    ctx.arc(x, y, point.r * localProgress, 0, Math.PI * 2);
    ctx.fillStyle = point.c === "#ff3b3b" ? "rgba(255,59,59,0.22)" : point.c === "#2cff88" ? "rgba(44,255,136,0.22)" : "rgba(255,255,255,0.16)";
    ctx.shadowColor = point.c;
    ctx.shadowBlur = 28;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = point.c;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.fillStyle = "rgba(247,247,242,0.72)";
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText(point.label, x + point.r + 8, y + 4);
  });

  ctx.restore();
}

function drawOwnershipDonut(canvas, progress = 1) {
  const { ctx, width, height } = setupCanvas(canvas, 320);
  ctx.clearRect(0, 0, width, height);
  drawGrid(ctx, width, height, { dense: true });
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.31;
  const thickness = Math.max(18, radius * 0.28);
  const segments = [
    { label: "Research", value: 34, color: "#2cff88" },
    { label: "Governance", value: 24, color: "#f7f7f2" },
    { label: "Capital", value: 22, color: "#8affbd" },
    { label: "Risk", value: 20, color: "#ff3b3b" }
  ];
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  let start = -Math.PI / 2;

  ctx.save();
  ctx.lineWidth = thickness;
  ctx.lineCap = "round";
  segments.forEach((segment, index) => {
    const angle = (segment.value / total) * Math.PI * 2 * progress;
    if (angle <= 0) return;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, start + 0.05, start + angle - 0.05);
    ctx.strokeStyle = segment.color;
    ctx.shadowColor = segment.color;
    ctx.shadowBlur = segment.color === "#ff3b3b" ? 18 : 26;
    ctx.globalAlpha = segment.color === "#f7f7f2" ? 0.72 : 0.96;
    ctx.stroke();
    start += (segment.value / total) * Math.PI * 2;
  });

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(247,247,242,0.94)";
  ctx.textAlign = "center";
  ctx.font = "700 42px Inter, system-ui, sans-serif";
  ctx.fillText("100", cx, cy + 8);
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillStyle = "rgba(247,247,242,0.54)";
  ctx.fillText("CONTRIBUTION FLYWHEEL", cx, cy + 32);

  ctx.textAlign = "left";
  segments.forEach((segment, index) => {
    const x = width - 142;
    const y = 44 + index * 28;
    ctx.fillStyle = segment.color;
    ctx.shadowColor = segment.color;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(x, y - 4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(247,247,242,0.7)";
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText(`${segment.label} ${segment.value}%`, x + 14, y);
  });
  ctx.restore();
}

function initCharts() {
  const hero = $("#heroChart");
  const up = $("#upChart");
  const down = $("#downChart");
  const risk = $("#riskMap");
  const ownership = $("#ownershipDonut");
  const all = [hero, up, down, risk, ownership].filter(Boolean);
  let progress = prefersReducedMotion ? 1 : 0;

  function render() {
    const p = prefersReducedMotion ? 1 : progress;
    if (hero) drawLineChart(hero, heroData, {
      cssHeight: 220,
      color: "#2cff88",
      secondaryColor: "rgba(44,255,136,0.2)",
      progress: Math.min(1, p * 1.08),
      showTerminalReadout: true
    });
    if (up) drawLineChart(up, upData, {
      cssHeight: 250,
      color: "#2cff88",
      secondaryColor: "rgba(44,255,136,0.18)",
      progress: Math.min(1, p * 1.1)
    });
    if (down) drawLineChart(down, downData, {
      cssHeight: 250,
      color: "#ff3b3b",
      secondaryColor: "rgba(255,59,59,0.16)",
      progress: Math.min(1, p * 1.1)
    });
    if (risk) drawRiskMap(risk, Math.min(1, p * 1.16));
    if (ownership) drawOwnershipDonut(ownership, Math.min(1, p * 1.08));
  }

  function animate() {
    progress += 0.018;
    render();
    if (progress < 1) requestAnimationFrame(animate);
  }

  if (prefersReducedMotion) render();
  else requestAnimationFrame(animate);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 110);
  });

  // Redraw when chart sections first come into view to keep the canvases crisp after layout changes.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) render();
    }, { threshold: 0.1 });
    all.forEach((canvas) => observer.observe(canvas));
  }
}

function initTilt() {
  const cards = $$(".hero-terminal, .chart-shell, .glass-card, .cta-card");
  if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1100px) rotateX(${-y * 3.5}deg) rotateY(${x * 3.5}deg) translateY(-2px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setDiscordLinks();
  initHeader();
  initCursorGlow();
  initReveal();
  initCounters();
  initStrategyPanel();
  initCharts();
  initTilt();
});
