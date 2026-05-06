const root = document.documentElement;
const header = document.querySelector('[data-header]');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
const accentButton = document.querySelector('[data-accent-cycle]');
const cursorRing = document.querySelector('.cursor-ring');
const accents = ['sovereign', 'intelligence', 'compound', 'risk'];

function setHeaderElevation() {
  if (!header) return;
  header.classList.toggle('is-elevated', window.scrollY > 12);
}

setHeaderElevation();
window.addEventListener('scroll', setHeaderElevation, { passive: true });

if (toggle && header && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      header.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (accentButton) {
  accentButton.addEventListener('click', () => {
    const current = root.getAttribute('data-accent') || accents[0];
    const next = accents[(accents.indexOf(current) + 1) % accents.length];
    root.setAttribute('data-accent', next);
    localStorage.setItem('tm-accent', next);
  });

  const stored = localStorage.getItem('tm-accent');
  if (stored && accents.includes(stored)) root.setAttribute('data-accent', stored);
}

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 44, 220)}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if (cursorRing && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let targetX = window.innerWidth * 0.66;
  let targetY = window.innerHeight * 0.44;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  }, { passive: true });

  function animateCursor() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    cursorRing.style.left = `${currentX}px`;
    cursorRing.style.top = `${currentY}px`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}
