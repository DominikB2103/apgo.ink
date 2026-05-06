(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-elevate]');
  const navToggle = document.querySelector('.nav-toggle');
  const accentButton = document.querySelector('[data-accent-cycle]');
  const orb = document.querySelector('.cursor-orb');
  const year = document.querySelector('[data-year]');

  const accents = ['lime', 'violet', 'amber', 'coral', 'cyan'];
  const accentValues = {
    lime: '#8cff3f',
    violet: '#9d7bff',
    amber: '#ffca3a',
    coral: '#ff6b5f',
    cyan: '#54d6ff'
  };

  if (year) year.textContent = new Date().getFullYear();

  const savedAccent = window.localStorage.getItem('apgo-accent');
  if (savedAccent && accents.includes(savedAccent)) {
    root.dataset.accent = savedAccent === 'lime' ? '' : savedAccent;
  }

  const updateThemeMeta = () => {
    const theme = getComputedStyle(root).getPropertyValue('--ink').trim() || '#060606';
    const tag = document.querySelector('meta[name="theme-color"]');
    if (tag) tag.setAttribute('content', theme);
  };
  updateThemeMeta();

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    header?.classList.toggle('is-open', !open);
  });

  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle?.setAttribute('aria-expanded', 'false');
      header?.classList.remove('is-open');
    });
  });

  const setHeaderState = () => {
    header?.classList.toggle('is-elevated', window.scrollY > 20);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  accentButton?.addEventListener('click', () => {
    const current = root.dataset.accent || 'lime';
    const next = accents[(accents.indexOf(current) + 1) % accents.length];
    root.dataset.accent = next === 'lime' ? '' : next;
    window.localStorage.setItem('apgo-accent', next);
    accentButton.querySelector('.accent-dot')?.style.setProperty('background', accentValues[next]);
    accentButton.animate(
      [
        { transform: 'translateY(0) rotate(0deg)' },
        { transform: 'translateY(-2px) rotate(-2deg)' },
        { transform: 'translateY(0) rotate(0deg)' }
      ],
      { duration: 260, easing: 'cubic-bezier(.2,.75,.2,1)' }
    );
  });

  if (orb && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('pointermove', (event) => {
      orb.style.setProperty('--orb-x', `${event.clientX}px`);
      orb.style.setProperty('--orb-y', `${event.clientY}px`);
    }, { passive: true });
  }

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach((node) => reveal.observe(node));

  const focusData = {
    markets: {
      title: 'Markets as sensors',
      copy: 'We read markets as high-frequency truth machines, but never worship price. The goal is to convert signal into ownership, not noise into activity.'
    },
    builders: {
      title: 'Build when buying is too small',
      copy: 'Some opportunities are not listed, underpriced, or mature enough to acquire. Those become company-formation candidates: product, distribution, governance, and operating cadence.'
    },
    systems: {
      title: 'An operating system for judgment',
      copy: 'The institution should remember. Research notes, decision journals, automation, dashboards, and postmortems turn individual insight into repeatable standards.'
    },
    future: {
      title: 'The future needs balance sheets',
      copy: 'AI infrastructure, energy, software, resilience, longevity, and European industrial renewal need patient capital and operators who can translate complexity into ownership.'
    }
  };

  const focusTitle = document.querySelector('[data-focus-title]');
  const focusCopy = document.querySelector('[data-focus-copy]');
  const focusStage = document.querySelector('.focus-stage');

  document.querySelectorAll('[data-focus]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.focus;
      const content = focusData[key];
      if (!content || !focusTitle || !focusCopy) return;

      document.querySelectorAll('[data-focus]').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');

      focusStage?.animate(
        [
          { transform: 'translateY(0)', filter: 'contrast(1)' },
          { transform: 'translateY(-4px)', filter: 'contrast(1.05)' },
          { transform: 'translateY(0)', filter: 'contrast(1)' }
        ],
        { duration: 360, easing: 'cubic-bezier(.2,.75,.2,1)' }
      );

      focusTitle.textContent = content.title;
      focusCopy.textContent = content.copy;
    });
  });
})();
