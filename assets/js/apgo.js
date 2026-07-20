(function () {
  "use strict";

  const menuButton = document.querySelector("[data-menu-button]");
  const navigation = document.querySelector("[data-navigation]");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const isOpen = navigation.dataset.open === "true";
      navigation.dataset.open = String(!isOpen);
      menuButton.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", async function () {
      const value = button.dataset.copy;
      const targetId = button.getAttribute("aria-describedby");
      const status = targetId ? document.getElementById(targetId) : null;

      try {
        await navigator.clipboard.writeText(value);
        button.dataset.originalLabel = button.dataset.originalLabel || button.textContent;
        button.textContent = "Copied";
        if (status) status.textContent = "Copied to clipboard.";
      } catch (error) {
        if (status) status.textContent = "Copy failed. Select the address above.";
      }

      window.setTimeout(function () {
        if (button.dataset.originalLabel) button.textContent = button.dataset.originalLabel;
        if (status) status.textContent = "";
      }, 2400);
    });
  });

  document.querySelectorAll("[data-copy-link]").forEach(function (button) {
    button.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(window.location.href);
        button.textContent = "Link copied";
        window.setTimeout(function () {
          button.textContent = "Copy link";
        }, 2200);
      } catch (error) {
        button.textContent = "Copy failed";
      }
    });
  });

  const progressBar = document.querySelector("[data-reading-progress]");
  if (progressBar) {
    const updateProgress = function () {
      const article = document.querySelector("article");
      if (!article) return;
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, (window.scrollY - articleTop) / articleHeight));
      progressBar.style.width = progress * 100 + "%";
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  document.querySelectorAll("[data-current-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  const searchDialog = document.querySelector("[data-search-dialog]");
  const searchOpeners = document.querySelectorAll("[data-search-open]");
  const searchCloser = document.querySelector("[data-search-close]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchItems = document.querySelectorAll("[data-search-item]");
  const noResults = document.querySelector("[data-no-results]");

  if (searchDialog) {
    searchOpeners.forEach(function (opener) {
      opener.addEventListener("click", function () {
        searchDialog.showModal();
        window.setTimeout(function () {
          if (searchInput) searchInput.focus();
        }, 40);
      });
    });

    if (searchCloser) {
      searchCloser.addEventListener("click", function () {
        searchDialog.close();
      });
    }

    searchDialog.addEventListener("click", function (event) {
      if (event.target === searchDialog) searchDialog.close();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = searchInput.value.trim().toLowerCase();
      let visible = 0;

      searchItems.forEach(function (item) {
        const match = item.textContent.toLowerCase().includes(query);
        item.hidden = !match;
        if (match) visible += 1;
      });

      if (noResults) noResults.style.display = visible ? "none" : "block";
    });
  }
})();
