const header = document.querySelector('[data-elevate]');
const reveals = document.querySelectorAll('.reveal');

const elevateHeader = () => {
  if (!header) return;
  header.classList.toggle('is-elevated', window.scrollY > 18);
};

window.addEventListener('scroll', elevateHeader, { passive: true });
elevateHeader();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  reveals.forEach((node) => observer.observe(node));
} else {
  reveals.forEach((node) => node.classList.add('is-visible'));
}
