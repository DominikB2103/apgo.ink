const archiveItems = [
  {
    title: "A short note on spectral gaps in sparse operators",
    section: "Discoveries",
    type: "Research Note",
    date: "2026-05-04",
    url: "documents/spectral-gap-note/",
    tags: ["operator theory", "spectra", "analysis"],
    excerpt: "A compact note describing a stable test case for gap persistence under sparse perturbations, with assumptions and a proof sketch kept close to the statement."
  },
  {
    title: "Noether symmetry, stated for working readers",
    section: "Theorems",
    type: "Theorem Brief",
    date: "2026-04-18",
    url: "documents/noether-symmetry/",
    tags: ["symmetry", "variational methods", "physics"],
    excerpt: "A careful theorem card connecting continuous symmetries with conserved quantities, written for readers who want the statement before the surrounding history."
  },
  {
    title: "Prime distribution: an editorial primer",
    section: "Theorems",
    type: "Primer",
    date: "2026-03-27",
    url: "documents/_template/",
    tags: ["number theory", "asymptotics", "template"],
    excerpt: "A complete article template showing how an expository document can handle notation, references, figures, and result summaries."
  },
  {
    title: "Instrument drift reported in low-temperature arrays",
    section: "News",
    type: "Briefing",
    date: "2026-03-12",
    url: "#archive",
    tags: ["measurement", "instrumentation", "materials"],
    excerpt: "A concise news-style entry for experimental corrections, apparatus reports, and dated updates that need context without a full article."
  },
  {
    title: "New bounds for a model counting problem",
    section: "Discoveries",
    type: "Preprint Watch",
    date: "2026-02-26",
    url: "#archive",
    tags: ["complexity", "combinatorics", "bounds"],
    excerpt: "A discovery record format for tracking claims, constraints, and verification notes as a result moves from observation to durable reference."
  },
  {
    title: "A compact catalogue of useful inequalities",
    section: "Theorems",
    type: "Reference",
    date: "2026-01-30",
    url: "#archive",
    tags: ["analysis", "inequalities", "reference"],
    excerpt: "A reference-style entry for theorem statements, proof dependencies, and quick links to longer HTML documents."
  }
];

const carouselItems = [
  {
    label: "Theorem I",
    title: "Noether Correspondence",
    field: "Variational calculus",
    statement: "Every differentiable symmetry of the action of a physical system determines a conserved quantity whenever the Euler–Lagrange equations are satisfied.",
    note: "Use theorem cards for compact formal statements with a field label, a stable title, and a link to a longer proof when available."
  },
  {
    label: "Theorem II",
    title: "Prime Number Asymptotic",
    field: "Analytic number theory",
    statement: "The number of primes not exceeding x is asymptotic to x / log x as x tends to infinity.",
    note: "The homepage should preview the intellectual substance of the archive rather than fill space with decorative summaries."
  },
  {
    label: "Theorem III",
    title: "Arzelà–Ascoli Criterion",
    field: "Functional analysis",
    statement: "Every uniformly bounded and equicontinuous family of real-valued functions on a compact metric space has a uniformly convergent subsequence.",
    note: "Short statements work best when the assumptions are visible and the language is stable enough to quote."
  }
];

function formatDate(input) {
  const date = new Date(`${input}T00:00:00`);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function normalise(value) {
  return value.toLowerCase().trim();
}

function sectionClass(section) {
  return section.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function renderResults() {
  const container = document.querySelector("[data-results]");
  if (!container) return;

  const query = normalise(document.querySelector("#searchInput")?.value || "");
  const activeFilter = document.querySelector(".filter-btn[aria-pressed='true']")?.dataset.filter || "All";
  const sortValue = document.querySelector("#sortSelect")?.value || "newest";

  let items = archiveItems.filter((item) => {
    const tagMatch = item.tags.some((tag) => tag === activeFilter.toLowerCase());
    const filterMatch = activeFilter === "All" || item.section === activeFilter || tagMatch;
    const haystack = normalise([item.title, item.section, item.type, item.excerpt, ...item.tags].join(" "));
    return filterMatch && (!query || haystack.includes(query));
  });

  items = items.sort((a, b) => {
    if (sortValue === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortValue === "az") return a.title.localeCompare(b.title);
    return new Date(b.date) - new Date(a.date);
  });

  const count = document.querySelector("[data-result-count]");
  if (count) count.textContent = `${items.length} record${items.length === 1 ? "" : "s"}`;

  if (!items.length) {
    container.innerHTML = `<div class="no-results"><strong>No matching records.</strong><br>Try a broader query, another section, or a field tag.</div>`;
    return;
  }

  container.innerHTML = items.map((item) => `
    <article class="result-card ${sectionClass(item.section)}">
      <div class="result-top">
        <span class="section-pill">${item.section}</span>
        <time datetime="${item.date}">${formatDate(item.date)}</time>
      </div>
      <h3><a href="${item.url}">${item.title}</a></h3>
      <p class="result-type">${item.type}</p>
      <p>${item.excerpt}</p>
      <div class="card-foot" aria-label="Tags">
        ${item.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}
      </div>
      <a class="read-link" href="${item.url}">Read record</a>
    </article>
  `).join("");
}

function setupFilters() {
  const filters = document.querySelector("[data-filters]");
  if (!filters) return;
  const baseFilters = ["All", "News", "Discoveries", "Theorems", "analysis", "physics", "number theory", "instrumentation"];
  filters.innerHTML = baseFilters.map((filter, index) => `
    <button class="filter-btn" type="button" data-filter="${filter}" aria-pressed="${index === 0 ? "true" : "false"}">${filter}</button>
  `).join("");

  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;
    filters.querySelectorAll(".filter-btn").forEach((item) => item.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
    renderResults();
  });
}

let carouselIndex = 0;
function renderCarousel() {
  const card = document.querySelector("[data-theorem-card]");
  if (!card) return;
  const item = carouselItems[carouselIndex];
  card.innerHTML = `
    <div class="theorem-card-header"><span>${item.label}</span><span>${item.field}</span></div>
    <div class="theorem-card-body">
      <h3>${item.title}</h3>
      <div class="theorem-statement">${item.statement}</div>
    </div>
    <div class="theorem-card-footer">${item.note}</div>
  `;
}

function setupCarousel() {
  const prev = document.querySelector("[data-carousel-prev]");
  const next = document.querySelector("[data-carousel-next]");
  if (!prev || !next) return;
  prev.addEventListener("click", () => {
    carouselIndex = (carouselIndex - 1 + carouselItems.length) % carouselItems.length;
    renderCarousel();
  });
  next.addEventListener("click", () => {
    carouselIndex = (carouselIndex + 1) % carouselItems.length;
    renderCarousel();
  });
  renderCarousel();
}

function setupSearch() {
  setupFilters();
  document.querySelector("#searchInput")?.addEventListener("input", renderResults);
  document.querySelector("#sortSelect")?.addEventListener("change", renderResults);
  renderResults();
}

document.addEventListener("DOMContentLoaded", () => {
  setupSearch();
  setupCarousel();
});
