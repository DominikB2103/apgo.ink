(function () {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  const storedTheme = localStorage.getItem("apgo-theme");
  const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (preferredDark ? "dark" : "light");

  root.dataset.theme = initialTheme;

  function updateThemeButton() {
    if (!themeButton) return;
    const dark = root.dataset.theme === "dark";
    themeButton.setAttribute("aria-pressed", String(dark));
    themeButton.setAttribute("aria-label", dark ? "Use light theme" : "Use dark theme");
    themeButton.querySelector("span").textContent = dark ? "Light" : "Dark";
  }

  updateThemeButton();

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("apgo-theme", root.dataset.theme);
      updateThemeButton();
    });
  }

  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-primary-nav]");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const open = nav.dataset.open === "true";
      nav.dataset.open = String(!open);
      menuButton.setAttribute("aria-expanded", String(!open));
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.dataset.open === "true") {
        nav.dataset.open = "false";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.focus();
      }
    });
  }

  const filterInput = document.querySelector("[data-story-filter]");
  const filterButtons = document.querySelectorAll("[data-section-filter]");
  const storyCards = document.querySelectorAll("[data-story-card]");
  const emptyState = document.querySelector("[data-filter-empty]");
  let activeSection = "all";

  if (filterButtons.length) {
    const requestedSection = new URLSearchParams(window.location.search).get("section");
    const requestedButton = Array.from(filterButtons).find(function (button) {
      return button.dataset.sectionFilter === requestedSection;
    });
    if (requestedButton) {
      activeSection = requestedButton.dataset.sectionFilter;
      filterButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", String(button === requestedButton));
      });
    }
  }

  function applyFilters() {
    if (!storyCards.length) return;
    const query = filterInput ? filterInput.value.trim().toLowerCase() : "";
    let visible = 0;

    storyCards.forEach(function (card) {
      const sectionMatch = activeSection === "all" || card.dataset.section === activeSection;
      const textMatch = !query || card.textContent.toLowerCase().includes(query);
      const show = sectionMatch && textMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (emptyState) emptyState.hidden = visible !== 0;
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeSection = button.dataset.sectionFilter;
      filterButtons.forEach(function (item) {
        item.setAttribute("aria-pressed", String(item === button));
      });
      const url = new URL(window.location.href);
      if (activeSection === "all") url.searchParams.delete("section");
      else url.searchParams.set("section", activeSection);
      window.history.replaceState({}, "", url);
      applyFilters();
    });
  });

  if (filterInput) filterInput.addEventListener("input", applyFilters);
  if (filterButtons.length) applyFilters();

  const progress = document.querySelector("[data-reading-progress]");
  const article = document.querySelector("[data-article-body]");

  if (progress && article) {
    const updateProgress = function () {
      const bounds = article.getBoundingClientRect();
      const start = window.scrollY + bounds.top;
      const distance = Math.max(1, article.offsetHeight - window.innerHeight);
      const value = Math.max(0, Math.min(1, (window.scrollY - start) / distance));
      progress.style.transform = "scaleX(" + value + ")";
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const toc = document.querySelector("[data-article-toc]");

  if (toc && article) {
    const headings = article.querySelectorAll("h2[id]");
    headings.forEach(function (heading) {
      const link = document.createElement("a");
      link.href = "#" + heading.id;
      link.textContent = heading.textContent;
      toc.appendChild(link);
    });
  }

  document.querySelectorAll("[data-copy-link]").forEach(function (button) {
    button.addEventListener("click", async function () {
      const original = button.textContent;
      try {
        await navigator.clipboard.writeText(window.location.href);
        button.textContent = "Link copied";
      } catch (error) {
        button.textContent = "Copy failed";
      }
      window.setTimeout(function () { button.textContent = original; }, 1800);
    });
  });

  document.querySelectorAll("[data-copy-value]").forEach(function (button) {
    button.addEventListener("click", async function () {
      const original = button.textContent;
      const value = button.dataset.copyValue;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = "Copied";
      } catch (error) {
        button.textContent = "Select and copy";
      }
      window.setTimeout(function () { button.textContent = original; }, 1800);
    });
  });

  document.querySelectorAll("[data-current-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });
}());
