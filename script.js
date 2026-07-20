/* =============================================================================
   MERIDIAN — site behaviour. Vanilla JS, no dependencies, <script defer>.
   Every module guards on the elements it needs, so this runs safely on every
   page (home, section listing, article).
   ============================================================================= */
(function () {
  "use strict";

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = function () {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };
  function rafThrottle(fn) {
    var q = false;
    return function () { if (q) return; q = true; requestAnimationFrame(function () { q = false; fn(); }); };
  }

  /* --------------------------------------------------------------- theme --- */
  function initTheme() {
    var KEY = "meridian-theme";
    var root = document.documentElement;
    var toggles = $$("#theme-toggle, [data-theme-toggle]");
    var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

    function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
    function preferred() {
      var s = stored();
      if (s === "light" || s === "dark") return s;
      return (media && media.matches) ? "dark" : "light";
    }
    function apply(theme) {
      root.setAttribute("data-theme", theme);
      var dark = theme === "dark";
      toggles.forEach(function (t) {
        t.setAttribute("aria-pressed", dark ? "true" : "false");
        t.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      });
    }
    apply(preferred());
    toggles.forEach(function (t) {
      t.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        apply(next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
      });
    });
    if (media) {
      var onChange = function (e) { if (stored() !== "light" && stored() !== "dark") apply(e.matches ? "dark" : "light"); };
      if (media.addEventListener) media.addEventListener("change", onChange);
      else if (media.addListener) media.addListener(onChange);
    }
  }

  /* ----------------------------------------------------------- mobile nav -- */
  function initNav() {
    var toggle = $(".nav-toggle");
    var list = $("#nav-list");
    if (!toggle || !list) return;
    function open() { return toggle.getAttribute("aria-expanded") === "true"; }
    function set(o) { toggle.setAttribute("aria-expanded", o ? "true" : "false"); list.classList.toggle("is-open", o); }
    toggle.addEventListener("click", function (e) { e.stopPropagation(); set(!open()); });
    document.addEventListener("click", function (e) { if (open() && !list.contains(e.target) && !toggle.contains(e.target)) set(false); });
    document.addEventListener("keydown", function (e) { if ((e.key === "Escape" || e.key === "Esc") && open()) { set(false); toggle.focus(); } });
    list.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
  }

  /* ------------------------------------------------------ search + chips --- */
  function initFilter() {
    var stories = $$(".story");
    if (!stories.length) return;
    var input = $("#q");
    var chips = $$(".chip");
    var none = $("#no-results");
    var cat = "all", q = "";

    function pass(el) {
      var c = (el.getAttribute("data-cat") || "").toLowerCase();
      var t = (el.getAttribute("data-title") || "").toLowerCase();
      return (cat === "all" || c === cat) && (q === "" || t.indexOf(q) !== -1);
    }
    function run() {
      var n = 0;
      stories.forEach(function (el) { var ok = pass(el); el.classList.toggle("is-hidden", !ok); if (ok) n++; });
      if (none) none.hidden = n !== 0;
    }
    if (input) {
      var sync = function () { q = input.value.trim().toLowerCase(); run(); };
      input.addEventListener("input", sync);
      input.addEventListener("search", sync);
      var form = input.closest("form");
      if (form) form.addEventListener("submit", function (e) { e.preventDefault(); });
    }
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        cat = (chip.getAttribute("data-filter") || "all").toLowerCase();
        chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
        run();
      });
    });

    // Activate a category from ?cat=… in the URL (category nav links point here).
    function applyCatFromUrl() {
      var requested = "";
      try { requested = (new URLSearchParams(location.search).get("cat") || "").toLowerCase(); } catch (e) {}
      var match = null;
      chips.forEach(function (c) { if (c.getAttribute("data-filter") === requested) match = c; });
      if (match) {
        cat = requested;
        chips.forEach(function (c) { c.setAttribute("aria-pressed", c === match ? "true" : "false"); });
      }
      run();
    }
    applyCatFromUrl();
  }

  /* ----------------------------------------------------- date + year ------ */
  function initDates() {
    var now = new Date();
    var year = String(now.getFullYear());
    $$("[data-year]").forEach(function (el) { el.textContent = year; });
    var dateEls = $$("[data-date]");
    if (dateEls.length) {
      var fmt;
      try { fmt = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now); }
      catch (e) { fmt = now.toDateString(); }
      dateEls.forEach(function (el) { el.textContent = fmt; });
    }
  }

  /* ------------------------------------------------------- newsletter ----- */
  function initNewsletter() {
    var form = $(".newsletter__form");
    if (!form) return;
    var input = form.querySelector('input[type="email"]');
    var status = form.querySelector(".newsletter__status");
    var RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    function say(msg, ok) { if (!status) return; status.textContent = msg; status.classList.toggle("is-ok", ok); status.classList.toggle("is-error", !ok); }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input ? input.value.trim() : "";
      if (!v) { say("Please enter your email address.", false); if (input) input.focus(); return; }
      if (!RE.test(v)) { say("That doesn't look like a valid email address.", false); if (input) input.focus(); return; }
      say("Thank you — you're on the list.", true); form.reset();
    });
  }

  /* --------------------------------------------------------- back to top -- */
  function initBackToTop() {
    var btn = $("#to-top");
    if (!btn) return;
    var update = rafThrottle(function () {
      btn.classList.toggle("is-shown", (window.pageYOffset || document.documentElement.scrollTop) > 700);
    });
    window.addEventListener("scroll", update, { passive: true });
    update();
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion() ? "auto" : "smooth" }); });
  }

  /* ----------------------------------------------------- reveal on scroll - */
  function initReveal() {
    var items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window) || reduceMotion()) { items.forEach(function (el) { el.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); obs.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------- disclosures (sourced) -- */
  function initDisclosures() {
    $$(".sourced__toggle[aria-controls]").forEach(function (btn) {
      var region = document.getElementById(btn.getAttribute("aria-controls"));
      if (!region) return;
      var open = btn.getAttribute("aria-expanded") === "true";
      region.hidden = !open;
      btn.addEventListener("click", function () {
        open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        region.hidden = !open;
      });
    });
  }

  /* ----------------------------------------- article: reading progress ---- */
  function initProgress() {
    var bar = $(".read-progress span");
    var body = $(".prose");
    if (!bar || !body) return;
    var update = rafThrottle(function () {
      var rect = body.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var total = rect.height - vh;
      var ratio = total > 0 ? (-rect.top) / total : (rect.top <= 0 ? 1 : 0);
      bar.style.width = (Math.max(0, Math.min(1, ratio)) * 100).toFixed(1) + "%";
    });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ------------------------------------------------- article: contents ---- */
  function initToc() {
    var toc = $("#toc");
    var body = $(".prose");
    if (!toc || !body) return;
    var hs = $$("h2[id]", body);
    if (!hs.length) { toc.style.display = "none"; return; }

    var title = document.createElement("p"); title.className = "toc__title"; title.textContent = "In this article";
    var ol = document.createElement("ol");
    var links = hs.map(function (h) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id; a.textContent = h.textContent; a.setAttribute("data-for", h.id);
      li.appendChild(a); ol.appendChild(li); return a;
    });
    toc.appendChild(title); toc.appendChild(ol);

    toc.addEventListener("click", function (e) {
      var a = e.target.closest("a[href^='#']"); if (!a) return;
      var t = document.getElementById(a.getAttribute("href").slice(1)); if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", "#" + t.id);
      t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true });
    });

    function active(id) { links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("data-for") === id); }); }
    if ("IntersectionObserver" in window) {
      var vis = {};
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { vis[en.target.id] = en.isIntersecting; });
        var cur = null;
        hs.forEach(function (h) { if (vis[h.id]) cur = h.id; });
        if (!cur) { for (var i = hs.length - 1; i >= 0; i--) { if (hs[i].getBoundingClientRect().top < 120) { cur = hs[i].id; break; } } }
        if (cur) active(cur);
      }, { rootMargin: "-90px 0px -65% 0px" });
      hs.forEach(function (h) { spy.observe(h); });
    }
  }

  /* ----------------------------------------------------- article: share --- */
  function initShare() {
    var btns = $$("[data-share]");
    if (!btns.length) return;
    var status = $(".share__status");
    function say(m) { if (!status) return; status.textContent = m; clearTimeout(say._t); say._t = setTimeout(function () { status.textContent = ""; }, 3500); }
    function text() { var h = $(".article__headline"); return (h ? h.textContent : document.title).trim(); }
    function copy() {
      var url = location.href;
      var done = function () { say("Link copied"); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done).catch(legacy);
      else legacy();
      function legacy() {
        try { var ta = document.createElement("textarea"); ta.value = url; ta.style.position = "fixed"; ta.style.left = "-9999px"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); done(); }
        catch (e) { say("Press ⌘/Ctrl+C to copy"); }
      }
    }
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-share]"); if (!el) return;
      var k = el.getAttribute("data-share");
      var u = encodeURIComponent(location.href), t = encodeURIComponent(text());
      if (k === "copy") { e.preventDefault(); copy(); }
      else if (k === "x") { e.preventDefault(); window.open("https://twitter.com/intent/tweet?text=" + t + "&url=" + u, "_blank", "noopener"); }
      else if (k === "bluesky") { e.preventDefault(); window.open("https://bsky.app/intent/compose?text=" + t + "%20" + u, "_blank", "noopener"); }
    });
  }

  /* ------------------------------------------------------------- boot ----- */
  function boot() {
    initTheme(); initNav(); initFilter(); initDates(); initNewsletter();
    initBackToTop(); initReveal(); initDisclosures();
    initProgress(); initToc(); initShare();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
