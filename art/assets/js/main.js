(() => {
  const root = document.documentElement;
  const header = document.querySelector('[data-elevate]');
  const navToggle = document.querySelector('.nav-toggle');
  const accentButton = document.querySelector('[data-accent-cycle]');
  const orb = document.querySelector('.wandering-ink');
  const year = document.querySelector('[data-year]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const accents = ['lime', 'violet', 'amber', 'coral', 'cyan'];
  const accentValues = {
    lime: '#8cff3f',
    violet: '#9d7bff',
    amber: '#ffca3a',
    coral: '#ff6b5f',
    cyan: '#54d6ff'
  };

  if (year) year.textContent = new Date().getFullYear();

  const savedAccent = window.localStorage.getItem('apgo-art-accent');
  if (savedAccent && accents.includes(savedAccent)) root.dataset.accent = savedAccent;

  const updateAccentDot = () => {
    accentButton?.querySelector('.accent-dot')?.style.setProperty('background', accentValues[root.dataset.accent || 'lime']);
  };
  updateAccentDot();

  const updateThemeMeta = () => {
    const theme = getComputedStyle(root).getPropertyValue('--ink').trim() || '#050505';
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

  const setHeaderState = () => header?.classList.toggle('is-elevated', window.scrollY > 18);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  function cycleAccent() {
    const current = root.dataset.accent || 'lime';
    const next = accents[(accents.indexOf(current) + 1) % accents.length];
    root.dataset.accent = next;
    window.localStorage.setItem('apgo-art-accent', next);
    updateAccentDot();
    drawGestureField();
    accentButton?.animate([
      { transform: 'translateY(0) rotate(0deg)' },
      { transform: 'translateY(-2px) rotate(-2deg)' },
      { transform: 'translateY(0) rotate(0deg)' }
    ], { duration: 260, easing: 'cubic-bezier(.2,.75,.2,1)' });
  }
  accentButton?.addEventListener('click', cycleAccent);

  if (orb && !prefersReducedMotion) {
    window.addEventListener('pointermove', (event) => {
      orb.style.setProperty('--orb-x', `${event.clientX}px`);
      orb.style.setProperty('--orb-y', `${event.clientY}px`);
      orb.style.setProperty('--orb-rotate', `${Math.round(event.clientX / 18)}deg`);
    }, { passive: true });
  }

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal]').forEach((node) => reveal.observe(node));

  const permissionData = {
    impossible: {
      title: 'Make the impossible object.',
      copy: 'Let the work be ugly, tender, sharp, empty, theatrical, private, public, technical, spiritual, or all of it at once.'
    },
    body: {
      title: 'Use the body as a room.',
      copy: 'Movement, posture, costume, endurance, face, choreography, stillness, refusal, and presence can all be architecture.'
    },
    sound: {
      title: 'Let noise become sculpture.',
      copy: 'A voice note, a field recording, silence, distortion, a hum, or a song fragment can hold an entire exhibition.'
    },
    code: {
      title: 'Make the system misbehave.',
      copy: 'Interfaces, games, spreadsheets, automations, generative rules, and errors can become emotional materials.'
    },
    ritual: {
      title: 'Invent a symbol and obey it.',
      copy: 'The work can be ceremony, fake religion, family code, private myth, public sign, or a ritual with no audience.'
    },
    domestic: {
      title: 'Make the home strange again.',
      copy: 'Food, furniture, rooms, clothing, tools, packaging, receipts, and ordinary routines can open into art.'
    },
    cinema: {
      title: 'Build one scene and leave.',
      copy: 'A lighting change, a prop, a title card, a costume, a gesture, or a still frame can imply the whole film.'
    },
    wildcard: {
      title: 'Protect the unnamed form.',
      copy: 'Not everything needs a medium. Some pieces arrive as weather, instructions, accidents, obsessions, or evidence.'
    }
  };

  const permissionTitle = document.querySelector('[data-permission-title]');
  const permissionCopy = document.querySelector('[data-permission-copy]');

  document.querySelectorAll('[data-permission]').forEach((button) => {
    button.addEventListener('click', () => {
      const data = permissionData[button.dataset.permission];
      if (!data) return;
      document.querySelectorAll('[data-permission]').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      if (permissionTitle) permissionTitle.textContent = data.title;
      if (permissionCopy) permissionCopy.textContent = data.copy;
      drawGestureField();
      document.querySelector('.console-card')?.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(-5px)' },
        { transform: 'translateY(0)' }
      ], { duration: 380, easing: 'cubic-bezier(.2,.75,.2,1)' });
    });
  });

  const canvas = document.getElementById('gesture-canvas');
  let gestureSeed = Math.random() * 1000;

  function cssVar(name) {
    return getComputedStyle(root).getPropertyValue(name).trim();
  }

  function drawGestureField() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;
    const accent = cssVar('--accent') || '#8cff3f';

    function rand() {
      const x = Math.sin(gestureSeed++) * 10000;
      return x - Math.floor(x);
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#fffdf7';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(5,5,5,.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 28) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 28) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    for (let i = 0; i < 8; i++) {
      const cx = rand() * w;
      const cy = rand() * h;
      const rx = 34 + rand() * 120;
      const ry = 28 + rand() * 100;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, rand() * Math.PI, 0, Math.PI * 2);
      ctx.fillStyle = i % 3 === 0 ? accent : `rgba(5,5,5,${0.035 + rand() * 0.07})`;
      ctx.fill();
      ctx.strokeStyle = 'rgba(5,5,5,.45)';
      ctx.lineWidth = i % 3 === 0 ? 1.4 : 1;
      ctx.stroke();
    }

    for (let l = 0; l < 6; l++) {
      ctx.beginPath();
      const sx = rand() * w;
      const sy = rand() * h;
      ctx.moveTo(sx, sy);
      for (let p = 0; p < 5; p++) {
        ctx.bezierCurveTo(rand() * w, rand() * h, rand() * w, rand() * h, rand() * w, rand() * h);
      }
      ctx.strokeStyle = l % 2 ? 'rgba(5,5,5,.82)' : accent;
      ctx.lineWidth = l % 2 ? 1.4 + rand() * 2 : 3.5;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    for (let d = 0; d < 45; d++) {
      ctx.fillStyle = d % 5 === 0 ? accent : 'rgba(5,5,5,.8)';
      ctx.beginPath();
      ctx.arc(rand() * w, rand() * h, 1.3 + rand() * 3.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  document.querySelector('[data-regenerate]')?.addEventListener('click', () => {
    gestureSeed = Math.random() * 10000;
    drawGestureField();
  });
  window.addEventListener('resize', drawGestureField, { passive: true });
  drawGestureField();

  const plateColors = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)', 'var(--accent-4)', 'var(--accent-5)', 'rgba(255,255,255,.24)'];
  const blobRadii = [
    '47% 53% 34% 66% / 41% 49% 51% 59%',
    '64% 36% 57% 43% / 34% 64% 36% 66%',
    '36% 64% 45% 55% / 58% 33% 67% 42%',
    '51% 49% 69% 31% / 48% 59% 41% 52%',
    '41% 59% 37% 63% / 61% 37% 63% 39%'
  ];
  function shuffleWall() {
    document.querySelectorAll('.plate').forEach((plate, index) => {
      const i = plate.querySelector('i');
      if (!i) return;
      const color = plateColors[Math.floor(Math.random() * plateColors.length)];
      const radius = blobRadii[Math.floor(Math.random() * blobRadii.length)];
      const rotation = Math.round(-22 + Math.random() * 44);
      i.style.setProperty('--plate-bg', color);
      i.style.setProperty('--blob-radius', radius);
      i.style.setProperty('--plate-rot', `${rotation}deg`);
      plate.style.transform = `rotate(${(-1 + Math.random() * 2).toFixed(2)}deg)`;
      plate.animate([
        { transform: 'translateY(0) scale(1)' },
        { transform: `translateY(-${4 + index}px) scale(1.01)` },
        { transform: plate.style.transform }
      ], { duration: 300 + index * 28, easing: 'cubic-bezier(.2,.75,.2,1)' });
    });
  }
  document.querySelector('[data-shuffle-wall]')?.addEventListener('click', shuffleWall);
  shuffleWall();

  document.querySelector('[data-print-page]')?.addEventListener('click', () => window.print());

  const promptText = document.querySelector('[data-prompt-text]');
  const promptCount = document.querySelector('[data-prompt-count]');
  const weatherOne = document.querySelector('[data-weather-one]');
  const weatherTwo = document.querySelector('[data-weather-two]');
  const weatherThree = document.querySelector('[data-weather-three]');
  const weatherFour = document.querySelector('[data-weather-four]');

  const prompts = [
    'Build an object that looks like it was designed for a ceremony that never existed.',
    'Make a poster for a sound nobody has heard yet.',
    'Turn a private routine into a public performance with one visible rule.',
    'Create a room where the smallest color mark is the main character.',
    'Write a poem that behaves like furniture.',
    'Design a game that can only be played by being honest for three minutes.',
    'Photograph an ordinary object as if it were evidence from the future.',
    'Make a costume for a version of yourself that only appears at night.',
    'Create a map of a place that exists emotionally, not geographically.',
    'Take one mistake and promote it to the center of the work.',
    'Invent a food ritual for remembering something that never happened.',
    'Make an interface that feels like a prayer, a warning, or a joke.',
    'Stage a scene where nothing happens, but everything has already changed.',
    'Turn an invoice, receipt, or list into an emotional document.',
    'Create a sculpture that could also be a tool for a fictional job.'
  ];
  const weather = {
    one: ['tender brutal', 'public secret', 'electric quiet', 'domestic strange', 'ritual clean', 'comic severe'],
    two: ['too much air', 'low ceiling', 'soft alarm', 'almost weather', 'museum thunder', 'private pressure'],
    three: ['ink / fabric / error', 'voice / glass / dust', 'paper / code / heat', 'bread / metal / light', 'screen / wool / rain', 'plastic / prayer / ash'],
    four: ['leave the scar', 'make it too honest', 'do not smooth it', 'keep the wrong edge', 'let it be theatrical', 'name it later']
  };
  let promptIndex = 1;
  function randomItem(array) { return array[Math.floor(Math.random() * array.length)]; }
  function newPrompt() {
    const prompt = randomItem(prompts);
    if (promptText) promptText.textContent = prompt;
    promptIndex += 1;
    if (promptCount) promptCount.textContent = String(promptIndex).padStart(3, '0');
    if (weatherOne) weatherOne.textContent = randomItem(weather.one);
    if (weatherTwo) weatherTwo.textContent = randomItem(weather.two);
    if (weatherThree) weatherThree.textContent = randomItem(weather.three);
    if (weatherFour) weatherFour.textContent = randomItem(weather.four);
    document.querySelector('.prompt-machine')?.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(-6px)' },
      { transform: 'translateY(0)' }
    ], { duration: 360, easing: 'cubic-bezier(.2,.75,.2,1)' });
    drawGestureField();
  }
  document.querySelector('[data-new-prompt]')?.addEventListener('click', newPrompt);
  document.querySelector('[data-copy-prompt]')?.addEventListener('click', async () => {
    if (!promptText) return;
    try {
      await navigator.clipboard.writeText(promptText.textContent.trim());
      const button = document.querySelector('[data-copy-prompt]');
      const old = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = old; }, 1200);
    } catch {
      // Clipboard can be blocked on some browsers. The prompt stays visible for manual copy.
    }
  });

  const copyStatus = document.querySelector('[data-copy-status]');
  document.querySelector('[data-copy-email]')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('hello@apgo.ink');
      if (copyStatus) copyStatus.textContent = 'Copied: hello@apgo.ink';
    } catch {
      if (copyStatus) copyStatus.textContent = 'Copy blocked by browser. Email: hello@apgo.ink';
    }
  });

  window.addEventListener('keydown', (event) => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if (event.key.toLowerCase() === 'a') cycleAccent();
    if (event.key.toLowerCase() === 'r') newPrompt();
  });
})();
