(() => {
  const records = Array.isArray(window.RESEARCH_RECORDS) ? window.RESEARCH_RECORDS : [];
  const state = { query: "", type: "all" };

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const byType = (record) => String(record.type || "").toLowerCase();

  const searchInput = qs("[data-search]");
  const filterButtons = qsa("[data-filter]");
  const recordsGrid = qs("[data-records]");
  const emptyState = qs("[data-empty]");
  const template = qs("#record-template");
  const progress = qs("[data-progress]");
  const yearTarget = qs("[data-year]");
  const countTarget = qs("[data-count-records]");
  const commandDialog = qs("[data-command]");
  const commandSearch = qs("[data-command-search]");
  const commandResults = qs("[data-command-results]");

  const sections = [
    { title: "Records", href: "#records", meta: "Master index" },
    { title: "Fields", href: "#fields", meta: "Entry classes" },
    { title: "Protocol", href: "#protocol", meta: "Publication standard" },
    { title: "Add work", href: "#submit", meta: "Editing surface" }
  ];

  const typeLabels = {
    paper: "Paper",
    theorem: "Theorem",
    discovery: "Discovery",
    invention: "Invention",
    writing: "Writing",
    news: "News"
  };

  function normalize(value) {
    return String(value || "").toLowerCase().trim();
  }

  function recordText(record) {
    return [record.title, record.type, record.year, record.status, record.abstract, ...(record.tags || [])]
      .map(normalize)
      .join(" ");
  }

  function getFilteredRecords() {
    return records.filter((record) => {
      const matchesType = state.type === "all" || byType(record) === state.type;
      const matchesQuery = !state.query || recordText(record).includes(state.query);
      return matchesType && matchesQuery;
    });
  }

  function makeTag(text) {
    const span = document.createElement("span");
    span.textContent = text;
    return span;
  }

  function renderRecords() {
    if (!recordsGrid || !template || !emptyState) return;

    const filtered = getFilteredRecords();
    recordsGrid.replaceChildren();

    filtered.forEach((record) => {
      const node = template.content.firstElementChild.cloneNode(true);
      qs(".record-type", node).textContent = typeLabels[byType(record)] || "Record";
      qs(".record-status", node).textContent = record.status || "draft";
      qs("h3", node).textContent = record.title || "Untitled record";
      qs("p", node).textContent = record.abstract || "No abstract supplied.";

      const meta = qs(".record-meta", node);
      if (record.year) meta.append(makeTag(record.year));
      (record.tags || []).slice(0, 4).forEach((tag) => meta.append(makeTag(tag)));

      const link = qs(".record-link", node);
      link.href = record.href || "#";
      if (!record.href || record.href === "#") {
        link.textContent = "Record pending";
        link.setAttribute("aria-disabled", "true");
      }
      recordsGrid.append(node);
    });

    emptyState.hidden = filtered.length > 0;
  }

  function renderCommandResults(query = "") {
    if (!commandResults) return;
    const q = normalize(query);
    const recordResults = records
      .filter((record) => !q || recordText(record).includes(q))
      .slice(0, 6)
      .map((record) => ({
        title: record.title || "Untitled record",
        href: record.href || "#records",
        meta: typeLabels[byType(record)] || "Record"
      }));

    const sectionResults = sections.filter((item) => !q || normalize(`${item.title} ${item.meta}`).includes(q));
    const results = [...sectionResults, ...recordResults].slice(0, 9);

    commandResults.replaceChildren();

    if (!results.length) {
      const empty = document.createElement("div");
      empty.className = "command-result";
      empty.innerHTML = `<strong>No matches</strong><span>Try another term</span>`;
      commandResults.append(empty);
      return;
    }

    results.forEach((item) => {
      const link = document.createElement("a");
      link.className = "command-result";
      link.href = item.href;
      link.innerHTML = `<strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.meta)}</span>`;
      link.addEventListener("click", () => commandDialog?.close());
      commandResults.append(link);
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#039;",
      '"': "&quot;"
    }[char]));
  }

  function updateProgress() {
    if (!progress) return;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (window.scrollY / height) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  }

  function animateCounter(el, value) {
    if (!el) return;
    const target = Number(value) || 0;
    const start = performance.now();
    const duration = 900;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toString();
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  function initReveal() {
    const revealEls = qsa(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

    revealEls.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
      observer.observe(el);
    });
  }

  function initTilt() {
    const cards = qsa(".tilt-card");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    cards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--ry", `${x * 4.4}deg`);
        card.style.setProperty("--rx", `${y * -4.4}deg`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("--ry");
        card.style.removeProperty("--rx");
      });
    });
  }

  function initCommand() {
    const openButtons = qsa("[data-open-command]");
    openButtons.forEach((button) => button.addEventListener("click", () => {
      renderCommandResults("");
      commandDialog?.showModal();
      window.setTimeout(() => commandSearch?.focus(), 60);
    }));

    document.addEventListener("keydown", (event) => {
      const isMacCommand = event.metaKey && event.key.toLowerCase() === "k";
      const isCtrlCommand = event.ctrlKey && event.key.toLowerCase() === "k";
      if (isMacCommand || isCtrlCommand) {
        event.preventDefault();
        renderCommandResults("");
        commandDialog?.showModal();
        window.setTimeout(() => commandSearch?.focus(), 60);
      }
    });

    commandSearch?.addEventListener("input", (event) => renderCommandResults(event.target.value));
  }

  searchInput?.addEventListener("input", (event) => {
    state.query = normalize(event.target.value);
    renderRecords();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.type = button.dataset.filter || "all";
      renderRecords();
    });
  });

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  if (yearTarget) yearTarget.textContent = new Date().getFullYear();
  animateCounter(countTarget, records.length);
  renderRecords();
  renderCommandResults();
  updateProgress();
  initReveal();
  initTilt();
  initCommand();
})();
