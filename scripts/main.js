const root = document.documentElement;
const themes = ['', 'blue', 'red', 'green'];
let themeIndex = 0;

const toggle = document.querySelector('[data-accent-toggle]');
if (toggle) {
  toggle.addEventListener('click', () => {
    themeIndex = (themeIndex + 1) % themes.length;
    const next = themes[themeIndex];
    if (next) root.setAttribute('data-theme', next);
    else root.removeAttribute('data-theme');
  });
}

const header = document.querySelector('[data-elevate]');
const elevate = () => {
  if (!header) return;
  header.classList.toggle('is-elevated', window.scrollY > 18);
};
elevate();
window.addEventListener('scroll', elevate, { passive: true });

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
reveals.forEach((node) => revealObserver.observe(node));

const ticker = document.querySelector('.ticker div');
if (ticker) {
  ticker.innerHTML = ticker.innerHTML + ticker.innerHTML;
}

const orb = document.querySelector('.cursor-orb');
let mouseX = window.innerWidth * 0.7;
let mouseY = window.innerHeight * 0.45;
let orbX = mouseX;
let orbY = mouseY;

window.addEventListener('pointermove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
}, { passive: true });

const animateOrb = () => {
  if (!orb) return;
  orbX += (mouseX - orbX) * 0.08;
  orbY += (mouseY - orbY) * 0.08;
  orb.style.left = `${orbX}px`;
  orb.style.top = `${orbY}px`;
  requestAnimationFrame(animateOrb);
};
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  animateOrb();
}

const cards = document.querySelectorAll('.charter-card, .domain-card, .closing-card');
cards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
    card.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});
