const archiveItems = [
  {
    title: "A short note on spectral gaps in sparse operators",
    section: "Discoveries",
    type: "Research Note",
    date: "2026-05-04",
    url: "documents/spectral-gap-note/",
    tags: ["operator theory", "spectra", "analysis"],
    excerpt: "A compact note describing a numerically stable test case for gap persistence under sparse perturbations. Includes assumptions, proof sketch, and reproducibility notes."
  },
  {
    title: "Noether symmetry, stated for working readers",
    section: "Theorems",
    type: "Theorem Brief",
    date: "2026-04-18",
    url: "documents/noether-symmetry/",
    tags: ["symmetry", "variational methods", "physics"],
    excerpt: "A restrained theorem card and explanatory proof outline linking continuous symmetries with conserved quantities."
  },
  {
    title: "Prime distribution: an editorial primer",
    section: "Theorems",
    type: "Primer",
    date: "2026-03-27",
    url: "documents/_template/",
    tags: ["number theory", "asymptotics", "template"],
    excerpt: "A template preview showing how an expository document can handle notation, references, figures, and result summaries."
  },
  {
    title: "Instrument drift reported in low-temperature arrays",
    section: "News",
    type: "Briefing",
    date: "2026-03-12",
    url: "#archive",
    tags: ["measurement", "instrumentation", "materials"],
    excerpt: "A concise house-style news item placeholder for timely updates, experimental corrections, and apparatus reports."
  },
  {
    title: "New bounds for a model counting problem",
    section: "Discoveries",
    type: "Preprint Watch",
    date: "2026-02-26",
    url: "#archive",
    tags: ["complexity", "combinatorics", "bounds"],
    excerpt: "A placeholder entry designed to demonstrate how discoveries are indexed and filtered by field and article type."
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
    statement: "Every differentiable symmetry of the action of a physical system has a corresponding conserved quantity, provided the Euler–Lagrange equations are satisfied.",
    note: "Displayed here as an editorial theorem card; the full article template supports assumptions, proof sketch, and references."
  },
  {
    label: "Theorem II",
    title: "Prime Number Asymptotic",
    field: "Analytic number theory",
    statement: "The number of primes not exceeding x is asymptotic to x / log x as x tends to infinity.",
    note: "Use this area for short theorem previews, not full proofs; longer expositions live in the document folders."
  },
  {
    label: "Theorem III",
    title: "Compactness Criterion",
    field: "Functional analysis",
    statement: "A uniformly bounded and equicontinuous family on a compact metric space has a uniformly convergent subsequence.",
    note: "A restrained carousel keeps the landing page dynamic without feeling promotional or decorative."
  }
];

function formatDate(input) {
  const date = new Date(`${input}T00:00:00`);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function normalise(value) {
  return value.toLowerCase().trim();
}

function renderResults() {
  const container = document.querySelector("[data-results]");
  if (!container) return;

  const query = normalise(document.querySelector("#searchInput")?.value || "");
  const activeFilter = document.querySelector(".filter-btn[aria-pressed='true']")?.dataset.filter || "All";
  const sortValue = document.querySelector("#sortSelect")?.value || "newest";

  let items = archiveItems.filter((item) => {
    const filterMatch = activeFilter === "All" || item.section === activeFilter || item.tags.includes(activeFilter.toLowerCase());
    const haystack = normalise([item.title, item.section, item.type, item.excerpt, ...item.tags].join(" "));
    return filterMatch && (!query || haystack.includes(query));
  });

  items = items.sort((a, b) => {
    if (sortValue === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortValue === "az") return a.title.localeCompare(b.title);
    return new Date(b.date) - new Date(a.date);
  });

  const count = document.querySelector("[data-result-count]");
  if (count) count.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;

  if (!items.length) {
    container.innerHTML = `<div class="no-results"><strong>No matching records.</strong><br>Try a broader query, a different section, or a field tag.</div>`;
    return;
  }

  container.innerHTML = items.map((item) => `
    <article class="result-card">
      <small><span>${item.section}</span><span>${formatDate(item.date)}</span></small>
      <h3><a href="${item.url}">${item.title}</a></h3>
      <p>${item.excerpt}</p>
      <a class="read-link" href="${item.url}">Open record →</a>
      <div class="card-foot" aria-label="Tags">
        ${item.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function setupFilters() {
  const filters = document.querySelector("[data-filters]");
  if (!filters) return;
  const baseFilters = ["All", "News", "Discoveries", "Theorems", "analysis", "number theory", "physics"];
  filters.innerHTML = baseFilters.map((filter, index) => `
    <button class="filter-btn" type="button" data-filter="${filter}" aria-pressed="${index === 0 ? "true" : "false"}">${filter}</button>
  `).join("") + `<span class="result-count" data-result-count>0 items</span>`;

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
