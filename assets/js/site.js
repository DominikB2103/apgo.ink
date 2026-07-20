(function () {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  let storedTheme = null;
  try { storedTheme = localStorage.getItem("apgo-theme"); } catch (error) { storedTheme = null; }
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
      try { localStorage.setItem("apgo-theme", root.dataset.theme); } catch (error) { /* preference remains for this page */ }
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

  document.querySelectorAll(".nav a, .utility a, .footer a").forEach(function (link) {
    const target = new URL(link.href, window.location.origin);
    const currentPath = window.location.pathname.replace(/index\.html$/, "");
    const targetPath = target.pathname.replace(/index\.html$/, "");
    const samePath = currentPath === targetPath;
    const requestedSection = new URLSearchParams(window.location.search).get("section");
    const targetSection = target.searchParams.get("section");
    const sameSection = targetSection ? requestedSection === targetSection : !requestedSection;
    const sameHash = target.hash ? window.location.hash === target.hash : !window.location.hash;
    if (samePath && sameSection && sameHash) link.setAttribute("aria-current", "page");
  });

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

  const searchDialog = document.querySelector("[data-search-dialog]");
  const searchOpeners = document.querySelectorAll("[data-search-open]");
  const searchCloser = document.querySelector("[data-search-close]");
  const globalSearch = document.querySelector("[data-global-search]");
  const globalResults = document.querySelector("[data-search-results]");
  const globalStatus = document.querySelector("[data-search-status]");
  const searchResultLimit = 8;
  let searchIndex = null;
  let searchIndexPromise = null;

  function setSearchStatus(message) {
    if (!globalStatus) return;
    globalStatus.textContent = message;
    globalStatus.hidden = !message;
  }

  function createSearchResult(item) {
    const link = document.createElement("a");
    const label = document.createElement("span");
    const headline = document.createElement("strong");
    const dek = document.createElement("small");

    link.className = "search-result";
    link.href = item.url;
    label.textContent = item.section + " · " + item.type;
    headline.textContent = item.headline;
    dek.textContent = item.dek;
    link.append(label, headline, dek);
    return link;
  }

  function renderSearchResults() {
    if (!globalResults || !searchIndex) return;
    const query = globalSearch ? globalSearch.value.trim().toLowerCase() : "";

    if (query.length < 2) {
      globalResults.replaceChildren();
      setSearchStatus(query ? "Enter at least two characters." : "Search Journal and Football by topic, person or headline.");
      return;
    }

    const matches = searchIndex.filter(function (item) {
      return [item.section, item.type, item.headline, item.dek].join(" ").toLowerCase().includes(query);
    });
    const visibleMatches = matches.slice(0, searchResultLimit);

    globalResults.replaceChildren(...visibleMatches.map(createSearchResult));
    if (!matches.length) setSearchStatus("No article matches that search.");
    else if (matches.length > searchResultLimit) setSearchStatus("Showing the first " + searchResultLimit + " of " + matches.length + " matches. Refine the search to narrow the list.");
    else setSearchStatus("");
  }

  function loadSearchIndex() {
    if (searchIndex) {
      renderSearchResults();
      return Promise.resolve(searchIndex);
    }
    if (!searchIndexPromise) {
      setSearchStatus("Loading search…");
      searchIndexPromise = fetch("/search-index.json", { headers: { Accept: "application/json" } })
        .then(function (response) {
          if (!response.ok) throw new Error("Search index request failed");
          return response.json();
        })
        .then(function (items) {
          if (!Array.isArray(items)) throw new Error("Search index is invalid");
          searchIndex = items.filter(function (item) {
            return item && ["url", "section", "type", "headline", "dek"].every(function (field) {
              return typeof item[field] === "string";
            });
          });
          renderSearchResults();
          return searchIndex;
        })
        .catch(function () {
          searchIndexPromise = null;
          setSearchStatus("Search is temporarily unavailable. Please try again.");
          return null;
        });
    }
    return searchIndexPromise;
  }

  function openSearch() {
    if (!searchDialog) return;
    searchDialog.showModal();
    document.body.style.overflow = "hidden";
    loadSearchIndex();
    window.setTimeout(function () { if (globalSearch) globalSearch.focus(); }, 20);
  }

  function closeSearch() {
    if (!searchDialog || !searchDialog.open) return;
    searchDialog.close();
    document.body.style.overflow = "";
  }

  searchOpeners.forEach(function (button) { button.addEventListener("click", openSearch); });
  if (searchCloser) searchCloser.addEventListener("click", closeSearch);
  if (searchDialog) {
    searchDialog.addEventListener("click", function (event) {
      if (event.target === searchDialog) closeSearch();
    });
    searchDialog.addEventListener("close", function () { document.body.style.overflow = ""; });
  }

  document.addEventListener("keydown", function (event) {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName);
    if (event.key === "/" && !typing && searchDialog && !searchDialog.open) {
      event.preventDefault();
      openSearch();
    }
  });

  if (globalSearch) {
    globalSearch.addEventListener("input", function () {
      if (searchIndex) renderSearchResults();
      else loadSearchIndex();
    });
  }

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
        const status = document.querySelector("[data-copy-status]");
        if (status) status.textContent = "Address copied to clipboard.";
      } catch (error) {
        button.textContent = "Select and copy";
        const status = document.querySelector("[data-copy-status]");
        if (status) status.textContent = "Clipboard unavailable. Select the address above.";
      }
      window.setTimeout(function () {
        button.textContent = original;
        const status = document.querySelector("[data-copy-status]");
        if (status) status.textContent = "";
      }, 2200);
    });
  });

  document.querySelectorAll("[data-print]").forEach(function (button) {
    button.addEventListener("click", function () { window.print(); });
  });

  document.querySelectorAll("[data-text-size]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!article) return;
      const size = button.dataset.textSize;
      if (size === "default") delete article.dataset.size;
      else article.dataset.size = size;
      document.querySelectorAll("[data-text-size]").forEach(function (item) {
        item.setAttribute("aria-pressed", String(item === button));
      });
    });
  });

  document.querySelectorAll("[data-current-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });
}());
