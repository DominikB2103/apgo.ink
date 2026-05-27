(function () {
  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      body.classList.remove('menu-open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = track ? Array.from(track.children) : [];
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    const dotsWrap = carousel.querySelector('[data-carousel-dots]');
    let index = 0;
    let autoTimer = null;

    const dots = slides.map((_, dotIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show example ${dotIndex + 1}`);
      dot.addEventListener('click', () => setIndex(dotIndex));
      if (dotsWrap) dotsWrap.appendChild(dot);
      return dot;
    });

    function setIndex(nextIndex) {
      if (!track || slides.length === 0) return;
      index = (nextIndex + slides.length) % slides.length;
      track.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((dot, dotIndex) => {
        dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
      });
      restartAuto();
    }

    function restartAuto() {
      window.clearInterval(autoTimer);
      autoTimer = window.setInterval(() => setIndex(index + 1), 6800);
    }

    if (prev) prev.addEventListener('click', () => setIndex(index - 1));
    if (next) next.addEventListener('click', () => setIndex(index + 1));

    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') setIndex(index - 1);
      if (event.key === 'ArrowRight') setIndex(index + 1);
    });

    let startX = null;
    carousel.addEventListener('pointerdown', (event) => {
      startX = event.clientX;
    }, { passive: true });
    carousel.addEventListener('pointerup', (event) => {
      if (startX === null) return;
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 60) setIndex(index + (delta < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });

    setIndex(0);
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const selectedPackage = String(data.get('package') || '').trim();
      const message = String(data.get('message') || '').trim();

      const subject = encodeURIComponent(`Wylo request — ${selectedPackage}`);
      const bodyText = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Selected package: ${selectedPackage}`,
        '',
        'Project notes:',
        message
      ].join('\n');

      window.location.href = `mailto:hello@wylo.studio?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
      if (note) note.textContent = 'Your request is ready to send. We’ll review the details and reply with the next step.';
    });
  }
})();
