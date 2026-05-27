const states = [
  {
    word: "LAUNCH",
    details: ["Domain", "Contact", "Mobile", "Launch"],
    exits: ["-30px", "-44px", "8deg"],
  },
  {
    word: "ORGANIZE",
    details: ["Booking", "Payments", "Email", "Links"],
    exits: ["24px", "-40px", "-7deg"],
  },
  {
    word: "GROW",
    details: ["Leads", "Content", "Traffic", "Tasks"],
    exits: ["-18px", "38px", "5deg"],
  },
  {
    word: "SCALE",
    details: ["Ready", "Live", "Connected", "Clean"],
    exits: ["34px", "24px", "-6deg"],
  },
];

const packageData = {
  starter: {
    kicker: "Simple website",
    title: "Website Starter",
    desc: "For entrepreneurs who need a clean website and a simple way for people to contact them.",
    price: "Custom quote",
    items: [
      "One-page website",
      "Mobile-friendly layout",
      "Contact or booking link",
      "Basic copy cleanup",
      "Domain/GitHub Pages setup",
      "Launch support",
    ],
    button: "Ask about Website Starter",
    subject: "Wylo Website Starter inquiry",
    mode: "starter",
  },
  setup: {
    kicker: "Most common",
    title: "Business Setup",
    desc: "For entrepreneurs who need the website plus the basic tools around it connected.",
    price: "Custom quote",
    items: [
      "Multi-section website",
      "Booking or contact setup",
      "Payment link setup",
      "Social/link cleanup",
      "Email/domain help",
      "Basic organization setup",
    ],
    button: "Ask about Business Setup",
    subject: "Wylo Business Setup inquiry",
    mode: "setup",
  },
  launch: {
    kicker: "Full setup",
    title: "Full Launch",
    desc: "For entrepreneurs who want the full setup handled before they launch or relaunch.",
    price: "Custom quote",
    items: [
      "Custom website",
      "Brand direction",
      "Booking/contact/payment setup",
      "Content structure",
      "Client workflow organization",
      "Launch checklist",
      "Post-launch support",
    ],
    button: "Ask about Full Launch",
    subject: "Wylo Full Launch inquiry",
    mode: "launch",
  },
};

const root = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const wordTrack = document.querySelector(".word-track");
const details = [
  document.getElementById("detailA"),
  document.getElementById("detailB"),
  document.getElementById("detailC"),
  document.getElementById("detailD"),
];
const detailShells = Array.from(document.querySelectorAll(".detail"));
const stateButtons = Array.from(document.querySelectorAll("[data-state-button]"));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let heroIndex = 0;
let heroTimer = null;
let pauseUntil = 0;

function setHeroState(nextIndex, userTriggered = false) {
  if (nextIndex === heroIndex && !userTriggered) return;
  heroIndex = nextIndex;
  const state = states[heroIndex];
  root.dataset.heroState = String(heroIndex);

  stateButtons.forEach((button, index) => {
    button.classList.toggle("is-active", index === heroIndex);
  });

  wordTrack.classList.add("is-swapping");
  detailShells.forEach((shell, index) => {
    shell.style.setProperty("--out-x", `${index % 2 === 0 ? "-" : ""}${28 + index * 8}px`);
    shell.style.setProperty("--out-y", `${index < 2 ? "-" : ""}${26 + index * 6}px`);
    shell.style.setProperty("--out-r", `${index % 2 === 0 ? "-" : ""}${5 + index}deg`);
    shell.classList.add("is-changing");
  });

  window.setTimeout(() => {
    wordTrack.textContent = state.word;
    wordTrack.dataset.word = state.word;
    details.forEach((item, index) => {
      item.textContent = state.details[index];
    });
    wordTrack.classList.remove("is-swapping");
    detailShells.forEach((shell) => shell.classList.remove("is-changing"));
  }, prefersReducedMotion ? 0 : 300);

  if (userTriggered) pauseUntil = Date.now() + 9000;
}

function startHeroTimer() {
  if (prefersReducedMotion) return;
  heroTimer = window.setInterval(() => {
    if (Date.now() < pauseUntil) return;
    setHeroState((heroIndex + 1) % states.length);
  }, 4200);
}

stateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setHeroState(Number(button.dataset.stateButton), true);
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = !root.classList.contains("menu-open");
  root.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a, .footer a").forEach((link) => {
  link.addEventListener("click", () => {
    root.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealTargets = document.querySelectorAll("[data-reveal]:not([data-reveal='load']):not([data-reveal='instant'])");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const packageTabs = Array.from(document.querySelectorAll(".package-tab"));
const packagePanel = document.getElementById("packagePanel");
const packageKicker = document.getElementById("packageKicker");
const packageTitle = document.getElementById("packageTitle");
const packageDesc = document.getElementById("packageDesc");
const packagePrice = document.getElementById("packagePrice");
const packageList = document.getElementById("packageList");
const packageButton = document.getElementById("packageButton");
const packageVisual = document.getElementById("packageVisual");

function selectPackage(key) {
  const data = packageData[key];
  if (!data) return;

  packageTabs.forEach((tab) => {
    const active = tab.dataset.package === key;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  packagePanel.classList.remove("is-entering");
  packagePanel.classList.add("is-swapping");

  window.setTimeout(() => {
    packageKicker.textContent = data.kicker;
    packageTitle.textContent = data.title;
    packageDesc.textContent = data.desc;
    packagePrice.textContent = data.price;
    packageList.innerHTML = data.items.map((item) => `<li>${item}</li>`).join("");
    packageButton.innerHTML = `${data.button} <span aria-hidden="true">→</span>`;
    packageButton.href = `mailto:fortheasset3@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent("Hi Wylo,\n\nI'm building:\n\nI need help with:\n\nPackage interest: " + data.title + "\n")}`;
    packageVisual.dataset.mode = data.mode;
    packagePanel.setAttribute("aria-labelledby", `tab-${key === "setup" ? "setup" : key}`);
    packagePanel.classList.remove("is-swapping");
    packagePanel.classList.add("is-entering");
    window.setTimeout(() => packagePanel.classList.remove("is-entering"), 650);
  }, prefersReducedMotion ? 0 : 210);
}

packageTabs.forEach((tab) => {
  tab.addEventListener("click", () => selectPackage(tab.dataset.package));
});

const motionField = document.getElementById("motionField");
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let rafId = null;

function animateMouseParallax() {
  currentX += (targetX - currentX) * 0.18;
  currentY += (targetY - currentY) * 0.18;
  if (motionField) {
    motionField.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
  }
  if (Math.abs(targetX - currentX) > 0.08 || Math.abs(targetY - currentY) > 0.08) {
    rafId = requestAnimationFrame(animateMouseParallax);
  } else {
    currentX = targetX;
    currentY = targetY;
    if (motionField) motionField.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    rafId = null;
  }
}

const hero = document.querySelector(".hero");
if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
  hero?.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width - 0.5);
    const ny = ((event.clientY - rect.top) / rect.height - 0.5);
    targetX = Math.max(-10, Math.min(10, nx * 18));
    targetY = Math.max(-8, Math.min(8, ny * 14));
    if (!rafId) rafId = requestAnimationFrame(animateMouseParallax);
  }, { passive: true });
  hero?.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    if (!rafId) rafId = requestAnimationFrame(animateMouseParallax);
  });
}

startHeroTimer();
selectPackage("setup");
