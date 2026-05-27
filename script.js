(() => {
  "use strict";

  const CONTACT_EMAIL = "hello@apo.ink"; // Change this when the official Wylo inbox is ready.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  document.documentElement.classList.add("js");

  const preloader = document.getElementById("preloader");
  const finishPreloader = () => {
    if (!preloader) return;
    preloader.classList.add("is-done");
    window.setTimeout(() => preloader.remove(), 900);
  };
  window.addEventListener("load", () => window.setTimeout(finishPreloader, 420), { once: true });
  window.setTimeout(finishPreloader, 1800);

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", href);
    });
  });

  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  if (revealItems.length) {
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
      );
      revealItems.forEach((item) => observer.observe(item));
    }
  }

  if (canHover && !reducedMotion) {
    const cursor = document.getElementById("cursor");
    if (cursor) {
      document.body.classList.add("has-custom-cursor");
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let cursorX = mouseX;
      let cursorY = mouseY;

      window.addEventListener("pointermove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursor.classList.add("is-visible");
      });

      window.addEventListener("pointerleave", () => cursor.classList.remove("is-visible"));

      const cursorTick = () => {
        cursorX += (mouseX - cursorX) * 0.18;
        cursorY += (mouseY - cursorY) * 0.18;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(cursorTick);
      };
      cursorTick();

      document.querySelectorAll("a, button, input, textarea, select, summary").forEach((el) => {
        el.addEventListener("pointerenter", () => cursor.classList.add("is-active"));
        el.addEventListener("pointerleave", () => cursor.classList.remove("is-active"));
      });
    }

    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("pointermove", (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.08}px, ${y * 0.14}px)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
      });
    });

    document.querySelectorAll("[data-tilt]").forEach((container) => {
      const stage = container.querySelector(".kinetic-stage") || container;
      container.addEventListener("pointermove", (event) => {
        const rect = container.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        stage.style.setProperty("--ry", `${x * 7}deg`);
        stage.style.setProperty("--rx", `${-y * 7}deg`);
        stage.style.setProperty("--mx", `${x * 36}px`);
        stage.style.setProperty("--my", `${y * 36}px`);
      });
      container.addEventListener("pointerleave", () => {
        stage.style.setProperty("--ry", "0deg");
        stage.style.setProperty("--rx", "0deg");
        stage.style.setProperty("--mx", "0px");
        stage.style.setProperty("--my", "0px");
      });
    });

    document.querySelectorAll("[data-card-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width) * 100;
        const py = ((event.clientY - rect.top) / rect.height) * 100;
        const rx = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
        const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
        card.style.setProperty("--px", `${px}%`);
        card.style.setProperty("--py", `${py}%`);
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
        card.style.setProperty("--px", "50%");
        card.style.setProperty("--py", "0%");
      });
    });
  }

  const methodSteps = Array.from(document.querySelectorAll(".method-step"));
  const methodCards = Array.from(document.querySelectorAll("[data-method-card]"));
  const methodSection = document.getElementById("method");
  let activeMethod = 0;
  let manualMethodUntil = 0;

  const setMethod = (index, manual = false) => {
    const safeIndex = clamp(index, 0, methodSteps.length - 1);
    if (safeIndex === activeMethod && !manual) return;
    activeMethod = safeIndex;
    methodSteps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === safeIndex));
    methodCards.forEach((card, cardIndex) => card.classList.toggle("is-active", cardIndex === safeIndex));
    if (manual) manualMethodUntil = performance.now() + 3600;
  };

  methodSteps.forEach((step) => {
    step.addEventListener("click", () => setMethod(Number(step.dataset.step || 0), true));
  });

  const updateMethodByScroll = () => {
    if (!methodSection || !methodSteps.length || reducedMotion) return;
    if (performance.now() < manualMethodUntil) return;
    const rect = methodSection.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    const start = viewport * 0.62;
    const end = -rect.height * 0.38;
    const progress = clamp((start - rect.top) / (start - end), 0, 0.999);
    const index = Math.floor(progress * methodSteps.length);
    setMethod(index);
  };

  const tabs = Array.from(document.querySelectorAll("[role='tab'][data-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-panel]"));
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const name = tab.dataset.tab;
      tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
      panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === name));
    });
  });

  const accordion = document.getElementById("accordion");
  if (accordion) {
    const detailItems = Array.from(accordion.querySelectorAll("details"));
    detailItems.forEach((details) => {
      details.addEventListener("toggle", () => {
        if (!details.open) return;
        detailItems.forEach((other) => {
          if (other !== details) other.open = false;
        });
      });
    });
  }

  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      const data = new FormData(contactForm);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const stage = String(data.get("stage") || "").trim();
      const packageInterest = String(data.get("package") || "").trim();
      const message = String(data.get("message") || "").trim();

      const subject = `Wylo Build Brief — ${name || "New founder"}`;
      const body = [
        "Wylo build brief",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Business stage: ${stage}`,
        `Package interest: ${packageInterest}`,
        "",
        "What I am trying to build:",
        message,
        "",
        "Sent from the Wylo static website."
      ].join("\n");

      if (formNote) formNote.textContent = "Opening your email client with the brief ready.";
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const canvas = document.getElementById("fieldCanvas");
  if (canvas && !reducedMotion) {
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let points = [];
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = clamp(Math.round(width / 28), 26, 58);
      points = Array.from({ length: count }, (_, index) => ({
        x: (index / count) * width + Math.random() * 80,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: 0.14 + Math.random() * 0.22,
        life: Math.random() * Math.PI * 2,
        length: 28 + Math.random() * 54
      }));
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });
    window.addEventListener("pointerleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      points.forEach((point) => {
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 180) {
          point.x -= dx * 0.0025;
          point.y -= dy * 0.0025;
        }

        point.life += 0.008;
        point.x += point.vx + Math.sin(point.life) * 0.08;
        point.y += point.vy;

        if (point.y > height + 80) {
          point.y = -80;
          point.x = Math.random() * width;
        }
        if (point.x < -80) point.x = width + 80;
        if (point.x > width + 80) point.x = -80;

        const alpha = 0.05 + Math.sin(point.life) * 0.025;
        const gradient = ctx.createLinearGradient(point.x, point.y, point.x + point.length, point.y + point.length * 0.25);
        gradient.addColorStop(0, `rgba(244,239,229,0)`);
        gradient.addColorStop(0.45, `rgba(244,239,229,${alpha})`);
        gradient.addColorStop(1, `rgba(213,255,100,${alpha * 0.7})`);
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(point.x + point.length, point.y + point.length * 0.18);
        ctx.stroke();
      });
      requestAnimationFrame(draw);
    };

    resize();
    draw();
  }

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateMethodByScroll();
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  updateMethodByScroll();
})();
