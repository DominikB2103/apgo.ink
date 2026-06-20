/* ==========================================================================
   APGO — site behaviour (vanilla JS, no dependencies)
   --------------------------------------------------------------------------
   Loaded with <script defer> on every page. Every module guards on the
   presence of the elements it needs, so the same file runs harmlessly on
   the home page, section pages, and article pages alike.

   Modules
     1.  Theme toggle ........... localStorage + prefers-color-scheme + aria
     2.  Mobile nav ............. aria-expanded, click-outside + Esc
     3.  Search + chips ......... composable client-side .story filtering
     4.  Breaking ticker ........ seamless marquee, pause on hover, RM-aware
     5.  Back-to-top ............ reveal on scroll + smooth scroll
     6.  Reveal-on-scroll ....... IntersectionObserver -> .is-visible
     7.  Auto year ............. [data-year] -> current year
     8.  Newsletter ............ client-side email validation (no submit)
     9.  Reading progress ...... article-only scroll bar
     10. Table of contents ..... article-only, built from h2[id] + scroll-spy
     11. Share buttons ......... copy / x / bluesky intents

   Contract ids/classes/attributes are treated as fixed — never renamed.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ utils */

  /** querySelector / querySelectorAll shorthands scoped to a root. */
  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  /** Honour the user's reduced-motion preference (queried live, not cached). */
  function prefersReducedMotion() {
    return window.matchMedia &&
           window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /** Throttle a handler to one call per animation frame. */
  function rafThrottle(fn) {
    var queued = false;
    return function () {
      if (queued) { return; }
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        fn();
      });
    };
  }

  /** Run every module after the DOM is parsed (defer usually guarantees this,
   *  but the guard makes the file safe if it is ever included without defer). */
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  /* ============================================================= 1. THEME === */

  function initTheme() {
    var STORAGE_KEY = "apgo-theme";
    var root    = document.documentElement;          // <html data-theme>
    // Every theme control on the page (masthead + footer share one state).
    var toggles = $$("#theme-toggle, #theme-toggle-footer, [data-theme-toggle]");

    var media  = window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;

    /** Resolve the initial theme: stored choice wins, else system preference. */
    function preferredTheme() {
      var stored;
      try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { stored = null; }
      if (stored === "light" || stored === "dark") { return stored; }
      return (media && media.matches) ? "dark" : "light";
    }

    /** Apply a theme to <html> and keep the toggle's aria-pressed in sync.
     *  aria-pressed="true" means dark mode is engaged. */
    function applyTheme(theme) {
      root.setAttribute("data-theme", theme);
      // Keep every toggle's aria-pressed in sync (true = dark engaged).
      toggles.forEach(function (t) {
        t.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      });
    }

    // Initial paint.
    applyTheme(preferredTheme());

    // Manual toggle: flip and persist the explicit choice (any toggle works).
    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* private mode */ }
      });
    });

    // Follow the OS only while the user has not made an explicit choice.
    if (media) {
      var onSystemChange = function (e) {
        var stored;
        try { stored = localStorage.getItem(STORAGE_KEY); } catch (err) { stored = null; }
        if (stored !== "light" && stored !== "dark") {
          applyTheme(e.matches ? "dark" : "light");
        }
      };
      if (media.addEventListener) { media.addEventListener("change", onSystemChange); }
      else if (media.addListener) { media.addListener(onSystemChange); }  // older Safari
    }
  }

  /* ========================================================== 2. MOBILE NAV = */

  function initNav() {
    var toggle = $(".nav-toggle");
    var nav    = $("#primary-nav");
    if (!toggle || !nav) { return; }

    function isOpen() { return toggle.getAttribute("aria-expanded") === "true"; }

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
    }

    function close() {
      if (isOpen()) {
        setOpen(false);
        toggle.focus();           // return focus to the trigger for keyboard users
      }
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();        // don't immediately trip the click-outside handler
      setOpen(!isOpen());
    });

    // Click outside the open drawer closes it.
    document.addEventListener("click", function (e) {
      if (isOpen() && !nav.contains(e.target) && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });

    // Escape closes and restores focus.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Esc") { close(); }
    });

    // Following a link inside the drawer closes it (single-page feel on mobile).
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { setOpen(false); }
    });
  }

  /* ============================================== 3. SEARCH + CATEGORY CHIPS */

  function initFilter() {
    var stories   = $$(".story");
    if (!stories.length) { return; }

    var input     = $("#q");
    var chips      = $$(".chip");
    var noResults = $("#no-results");

    var activeCat = "all";        // current category filter (chip)
    var query     = "";           // current normalised search string

    /** Decide whether a single story passes both the chip and the query. */
    function matches(story) {
      var cat   = (story.getAttribute("data-cat")   || "").toLowerCase();
      var title = (story.getAttribute("data-title") || "").toLowerCase();

      var catOk    = activeCat === "all" || cat === activeCat;
      var queryOk  = query === "" || title.indexOf(query) !== -1;
      return catOk && queryOk;
    }

    /** Re-evaluate every card and toggle the empty-state message. */
    function apply() {
      var visible = 0;
      stories.forEach(function (story) {
        var show = matches(story);
        story.classList.toggle("is-hidden", !show);
        if (show) { visible++; }
      });
      if (noResults) { noResults.hidden = visible !== 0; }
    }

    // --- search input ----------------------------------------------------
    if (input) {
      input.addEventListener("input", function () {
        query = input.value.trim().toLowerCase();
        apply();
      });
      // A native <input type="search"> clear button fires "search"; reset too.
      input.addEventListener("search", function () {
        query = input.value.trim().toLowerCase();
        apply();
      });
      // Never let the surrounding <form role="search"> navigate away.
      var form = input.closest("form.search") || input.closest("form");
      if (form) { form.addEventListener("submit", function (e) { e.preventDefault(); }); }
    }

    // --- category chips (event-delegated could work, but chips are few) ---
    if (chips.length) {
      chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
          activeCat = (chip.getAttribute("data-filter") || "all").toLowerCase();
          // "all" resets the category dimension; search query is preserved.
          chips.forEach(function (c) {
            c.setAttribute("aria-pressed", c === chip ? "true" : "false");
          });
          apply();
        });
      });
    }

    // Initial pass (handles pre-filled inputs / browser-restored state).
    if (input && input.value) { query = input.value.trim().toLowerCase(); }
    apply();
  }

  /* ============================================================ 4. TICKER === */

  function initTicker() {
    var ticker = $("#ticker");
    if (!ticker) { return; }

    var track = $(".ticker__track", ticker);
    if (!track) { return; }

    // Duplicate the track's content once so a -50% translate loops seamlessly.
    // Guard against double-running (e.g. bfcache restores) with a data flag.
    if (track.getAttribute("data-duplicated") !== "true" && track.children.length) {
      var clone = track.cloneNode(true);
      // Hide the duplicated copy from assistive tech (no double reads) and
      // pull its links out of the tab order (no redundant focus stops).
      $$("*", clone).forEach(function (n) {
        n.setAttribute("aria-hidden", "true");
        if (n.matches("a, button, input, select, textarea, [tabindex]")) {
          n.setAttribute("tabindex", "-1");
        }
      });
      Array.prototype.forEach.call(clone.childNodes, function (n) {
        track.appendChild(n.cloneNode(true));
      });
      track.setAttribute("data-duplicated", "true");
    }

    // Respect reduced motion: kill the animation entirely.
    if (prefersReducedMotion()) {
      track.style.animation = "none";
      return;
    }

    // JS-driven pause on hover/focus (the CSS already pauses on :hover, but
    // this also covers keyboard focus within the ticker and is explicit).
    var pause  = function () { track.style.animationPlayState = "paused";  };
    var resume = function () { track.style.animationPlayState = "running"; };
    ticker.addEventListener("mouseenter", pause);
    ticker.addEventListener("mouseleave", resume);
    ticker.addEventListener("focusin",  pause);
    ticker.addEventListener("focusout", resume);
  }

  /* ======================================================= 5. BACK-TO-TOP === */

  function initBackToTop() {
    var btn = $("#to-top");
    if (!btn) { return; }

    var THRESHOLD = 600;          // px scrolled before the button appears

    var update = rafThrottle(function () {
      btn.hidden = (window.pageYOffset || document.documentElement.scrollTop) < THRESHOLD;
    });

    window.addEventListener("scroll", update, { passive: true });
    update();                     // set correct initial state

    btn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth"
      });
    });
  }

  /* ===================================================== 6. REVEAL-ON-SCROLL */

  function initReveal() {
    var items = $$(".reveal");
    if (!items.length) { return; }

    // No IntersectionObserver (or reduced motion): just show everything.
    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);   // reveal once, then stop watching
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ========================================================== 7. AUTO YEAR == */

  function initYear() {
    var year = String(new Date().getFullYear());
    $$("[data-year]").forEach(function (el) { el.textContent = year; });
  }

  /* ========================================================= 8. NEWSLETTER == */

  function initNewsletter() {
    var form = $(".newsletter");
    if (!form) { return; }

    var input  = form.querySelector('input[type="email"]');
    var status = form.querySelector(".newsletter__status");

    // RFC-pragmatic email check (good enough for client-side UX feedback).
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setStatus(message, ok) {
      if (!status) { return; }
      status.textContent = message;
      status.classList.toggle("is-success", !!ok);
      status.classList.toggle("is-error",   !ok);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();         // never actually submit — always

      var value = input ? input.value.trim() : "";

      if (value === "") {
        setStatus("Please enter your email address.", false);
        if (input) { input.focus(); }
        return;
      }
      if (!EMAIL_RE.test(value)) {
        setStatus("That doesn't look like a valid email address.", false);
        if (input) { input.focus(); }
        return;
      }

      setStatus("Thanks — you're on the list.", true);
      form.reset();
    });
  }

  /* ============================================ 9. ARTICLE: READING PROGRESS */

  function initReadingProgress() {
    var bar     = $("#read-progress");
    var article = $(".article__body");
    if (!bar || !article) { return; }

    var fill = bar.querySelector("span") || bar;

    var update = rafThrottle(function () {
      var rect      = article.getBoundingClientRect();
      var viewport  = window.innerHeight || document.documentElement.clientHeight;
      // Total distance over which the article scrolls past the viewport.
      var total     = rect.height - viewport;
      var scrolled  = -rect.top;  // how far the article's top is above the fold
      var ratio     = total > 0 ? scrolled / total : (rect.top <= 0 ? 1 : 0);
      ratio = Math.max(0, Math.min(1, ratio));
      fill.style.width = (ratio * 100).toFixed(2) + "%";
    });

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ============================================== 10. ARTICLE: TABLE OF CONTENTS */

  function initToc() {
    var toc  = $("#toc");
    var body = $(".article__body");
    if (!toc || !body) { return; }

    var headings = $$("h2[id]", body);
    if (!headings.length) { return; }   // leave the (empty) nav hidden via CSS

    // --- build the list --------------------------------------------------
    var title = document.createElement("p");
    title.className = "toc__title";
    title.textContent = "On this page";

    var list = document.createElement("ol");
    var links = [];

    headings.forEach(function (h) {
      var li = document.createElement("li");
      var a  = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      a.setAttribute("data-toc-link", h.id);
      li.appendChild(a);
      list.appendChild(li);
      links.push(a);
    });

    toc.appendChild(title);
    toc.appendChild(list);

    // --- smooth in-page scrolling ---------------------------------------
    toc.addEventListener("click", function (e) {
      var link = e.target.closest("a[href^='#']");
      if (!link) { return; }
      var target = document.getElementById(link.getAttribute("href").slice(1));
      if (!target) { return; }
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start"
      });
      // Update the address bar without a jump, and move focus for a11y.
      if (history.replaceState) { history.replaceState(null, "", "#" + target.id); }
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });

    // --- scroll-spy: highlight the heading currently in view -------------
    function setActive(id) {
      links.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("data-toc-link") === id);
      });
    }

    if ("IntersectionObserver" in window) {
      // Track which headings are within a band near the top of the viewport.
      var visible = {};
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting;
        });
        // Choose the last heading (in document order) that is currently active.
        var current = null;
        headings.forEach(function (h) { if (visible[h.id]) { current = h.id; } });
        // If none are inside the band, fall back to the last one we scrolled past.
        if (!current) {
          for (var i = headings.length - 1; i >= 0; i--) {
            if (headings[i].getBoundingClientRect().top < 120) { current = headings[i].id; break; }
          }
        }
        if (current) { setActive(current); }
      }, { rootMargin: "-100px 0px -65% 0px", threshold: 0 });

      headings.forEach(function (h) { spy.observe(h); });
    } else {
      // Fallback scroll-spy without IntersectionObserver.
      var update = rafThrottle(function () {
        var current = headings[0].id;
        headings.forEach(function (h) {
          if (h.getBoundingClientRect().top < 120) { current = h.id; }
        });
        setActive(current);
      });
      window.addEventListener("scroll", update, { passive: true });
      update();
    }
  }

  /* ================================================= 11. ARTICLE: SHARE === */

  function initShare() {
    var buttons = $$("[data-share]");
    if (!buttons.length) { return; }

    var status = $(".share__status");

    function announce(message) {
      if (!status) { return; }
      status.textContent = message;
      // Clear after a moment so the live region can re-announce a repeat copy.
      window.clearTimeout(announce._t);
      announce._t = window.setTimeout(function () { status.textContent = ""; }, 4000);
    }

    function copyUrl() {
      var url = window.location.href;

      var done = function () { announce("Link copied to clipboard"); };
      var fail = function () { announce("Couldn't copy — press ⌘/Ctrl+C"); };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(legacyCopy);
      } else {
        legacyCopy();
      }

      // execCommand fallback for browsers without the async Clipboard API.
      function legacyCopy() {
        try {
          var ta = document.createElement("textarea");
          ta.value = url;
          ta.setAttribute("readonly", "");
          ta.style.position = "absolute";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          var ok = document.execCommand("copy");
          document.body.removeChild(ta);
          ok ? done() : fail();
        } catch (e) {
          fail();
        }
      }
    }

    /** Build the share text from the page title (without the site suffix). */
    function shareText() {
      var h = $(".article__headline");
      return (h ? h.textContent : document.title).trim();
    }

    function openIntent(network) {
      var url   = encodeURIComponent(window.location.href);
      var text  = encodeURIComponent(shareText());
      var href;
      if (network === "x") {
        href = "https://twitter.com/intent/tweet?text=" + text + "&url=" + url;
      } else if (network === "bluesky") {
        href = "https://bsky.app/intent/compose?text=" + text + "%20" + url;
      }
      if (href) {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    }

    // Event delegation across all share controls.
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-share]");
      if (!el) { return; }
      var kind = el.getAttribute("data-share");

      if (kind === "copy") {
        e.preventDefault();
        copyUrl();
      } else if (kind === "x" || kind === "bluesky") {
        // <a data-share> elements: prevent the bare href and open the intent.
        e.preventDefault();
        openIntent(kind);
      }
    });
  }

  /* ============================================ 12. SOURCING DISCLOSURES === */

  /** Expand/collapse the sourcing ledgers. Each .sourcing__toggle controls an
   *  <ol> via aria-controls; the ledger shows only when .is-open is present,
   *  so we keep aria-expanded and that class (and the a11y tree) in lock-step. */
  function initDisclosures() {
    var toggles = $$(".sourcing__toggle[aria-controls]");
    if (!toggles.length) { return; }

    toggles.forEach(function (btn) {
      var region = document.getElementById(btn.getAttribute("aria-controls"));
      if (!region) { return; }

      // Normalise the initial state from the markup's aria-expanded.
      var open = btn.getAttribute("aria-expanded") === "true";
      region.classList.toggle("is-open", open);
      region.hidden = !open;

      btn.addEventListener("click", function () {
        open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        region.classList.toggle("is-open", open);
        region.hidden = !open;
      });
    });
  }

  /* ================================================================= BOOT === */

  ready(function () {
    initTheme();
    initNav();
    initFilter();
    initTicker();
    initBackToTop();
    initReveal();
    initYear();
    initNewsletter();
    initDisclosures();

    // Article-only modules (each self-guards, but grouped for clarity).
    initReadingProgress();
    initToc();
    initShare();
  });
})();
