(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const header = $('[data-header]');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const drawer = $('[data-mobile-drawer]');
  const toggle = $('[data-nav-toggle]');
  toggle?.addEventListener('click', () => {
    const open = drawer?.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(Boolean(open)));
  });
  $$('[data-mobile-drawer] a').forEach((a) => a.addEventListener('click', () => drawer?.classList.remove('is-open')));

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 })
    : null;
  $$('.reveal').forEach((el) => revealObserver ? revealObserver.observe(el) : el.classList.add('is-visible'));

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  let gx = 0, gy = 0, tx = 0, ty = 0;
  const moveGlow = () => {
    gx += (tx - gx) * 0.14;
    gy += (ty - gy) * 0.14;
    glow.style.transform = `translate(${gx - 14}px, ${gy - 14}px)`;
    requestAnimationFrame(moveGlow);
  };
  if (matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    moveGlow();
  } else {
    glow.remove();
  }

  $$('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${y * -7}deg) rotateY(${x * 9}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  $$('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count || 0);
    const decimals = Number(el.dataset.decimals || 0);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1200;
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.4 });
    obs.observe(el);
  });

  $$('.faq-item button').forEach((button) => {
    button.addEventListener('click', () => button.closest('.faq-item')?.classList.toggle('is-open'));
  });

  $$('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.getAttribute('data-copy');
      try { await navigator.clipboard.writeText(text || ''); showToast('Copied to clipboard'); }
      catch { showToast(text || 'Copied'); }
    });
  });

  function showToast(text) {
    let toast = $('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('is-active');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('is-active'), 1800);
  }

  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
