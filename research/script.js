const documents = [
  {
    title: "Geometric stability in compact energy systems",
    type: "News",
    date: "2026-05-11",
    tags: ["geometry", "analysis", "preprints"],
    summary: "A short editorial update on new work connecting variational energy estimates, curvature control, and compactness arguments.",
    url: "documents/geometric-stability/",
    image: "assets/news-observatory.svg",
    featured: true
  },
  {
    title: "Energy monotonicity principle",
    type: "Theorems",
    date: "2026-05-08",
    tags: ["theorem", "analysis", "stability"],
    summary: "A theorem brief on residual-controlled energy hierarchies and the conditions under which monotonicity survives perturbation.",
    url: "documents/energy-monotonicity/",
    image: "assets/theorem-geometry.svg",
    featured: true
  },
  {
    title: "Microstructure atlas: measured phase boundaries",
    type: "Discoveries",
    date: "2026-05-04",
    tags: ["materials", "measurement", "field notes"],
    summary: "A discovery note describing a compact visual record of phase-boundary behavior across a controlled sample series.",
    url: "documents/microstructure-atlas/",
    image: "assets/discovery-microstructure.svg",
    featured: true
  },
  {
    title: "Spectral gap criterion for stable operators",
    type: "Theorems",
    date: "2026-04-29",
    tags: ["spectral", "operators", "geometry"],
    summary: "A concise theorem page on eigenvalue separation, compact operators, and the role of curvature-like lower bounds.",
    url: "documents/spectral-gap/",
    image: "assets/theorem-geometry.svg",
    featured: false
  },
  {
    title: "Prime-gap note: density, scale, and obstruction",
    type: "Documents",
    date: "2026-04-21",
    tags: ["number theory", "review", "proof sketch"],
    summary: "An editorial note framing prime-gap estimates through scale, density heuristics, and the limits of elementary obstruction arguments.",
    url: "documents/prime-gap-note/",
    image: "assets/field-correspondence.svg",
    featured: false
  },
  {
    title: "Field correspondence from the northern archive",
    type: "Discoveries",
    date: "2026-04-12",
    tags: ["archive", "observation", "field notes"],
    summary: "A disciplined field-note entry preserving correspondence, coordinates, and a small set of observations for later verification.",
    url: "documents/field-correspondence/",
    image: "assets/field-correspondence.svg",
    featured: false
  }
];

const state = {
  query: "",
  section: "all",
  tag: "all",
  slide: 0
};

const formatDate = (isoDate) => new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric"
}).format(new Date(`${isoDate}T12:00:00`));

const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

function createFeatureCard(item) {
  const article = document.createElement("article");
  article.className = "feature-card";
  article.innerHTML = `
    <a class="feature-card-image" href="${item.url}" aria-label="Read ${item.title}">
      <img src="${item.image}" alt="">
    </a>
    <div class="feature-card-body">
      <div class="kicker-line"><span>${item.type}</span><time datetime="${item.date}">${formatDate(item.date)}</time></div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <a class="card-link" href="${item.url}">Open document</a>
    </div>
  `;
  return article;
}

function createResultCard(item) {
  const article = document.createElement("article");
  article.className = "result-card";
  article.innerHTML = `
    <div class="kicker-line"><span>${item.type}</span><time datetime="${item.date}">${formatDate(item.date)}</time></div>
    <h3>${item.title}</h3>
    <p>${item.summary}</p>
    <div class="tags">${item.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
    <div class="result-card-footer"><span>${item.tags.length} tags</span><a href="${item.url}">Read</a></div>
  `;
  return article;
}

function renderFeatured() {
  const grid = document.querySelector("[data-featured-grid]");
  if (!grid) return;
  grid.innerHTML = "";
  documents
    .filter(item => item.featured)
    .sort(byDateDesc)
    .forEach(item => grid.appendChild(createFeatureCard(item)));
}

function renderTags() {
  const row = document.querySelector("[data-tag-row]");
  if (!row) return;
  const tags = ["all", ...Array.from(new Set(documents.flatMap(item => item.tags))).sort()];
  row.innerHTML = "";

  tags.forEach(tag => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tag-chip${state.tag === tag ? " is-active" : ""}`;
    button.textContent = tag === "all" ? "All tags" : tag;
    button.setAttribute("aria-pressed", String(state.tag === tag));
    button.addEventListener("click", () => {
      state.tag = state.tag === tag && tag !== "all" ? "all" : tag;
      renderTags();
      renderResults();
    });
    row.appendChild(button);
  });
}

function getFilteredDocuments() {
  const normalizedQuery = state.query.trim().toLowerCase();

  return documents
    .filter(item => state.section === "all" || item.type === state.section)
    .filter(item => state.tag === "all" || item.tags.includes(state.tag))
    .filter(item => {
      if (!normalizedQuery) return true;
      const searchable = [item.title, item.type, item.summary, ...item.tags].join(" ").toLowerCase();
      return searchable.includes(normalizedQuery);
    })
    .sort(byDateDesc);
}

function renderResults() {
  const grid = document.querySelector("[data-results-grid]");
  const count = document.querySelector("[data-result-count]");
  if (!grid) return;

  const filtered = getFilteredDocuments();
  grid.innerHTML = "";
  filtered.forEach(item => grid.appendChild(createResultCard(item)));

  if (filtered.length === 0) {
    const empty = document.createElement("article");
    empty.className = "result-card";
    empty.innerHTML = `<h3>No results found</h3><p>Try a broader term, choose another section, or clear the active tag.</p>`;
    grid.appendChild(empty);
  }

  if (count) count.textContent = filtered.length;
}

function setupSearch() {
  const input = document.querySelector("[data-search-input]");
  const section = document.querySelector("[data-section-filter]");
  const total = document.querySelector("[data-count-total]");

  if (total) total.textContent = String(documents.length).padStart(2, "0");

  if (input) {
    input.addEventListener("input", event => {
      state.query = event.target.value;
      renderResults();
    });
  }

  if (section) {
    section.addEventListener("change", event => {
      state.section = event.target.value;
      renderResults();
    });
  }
}

function setupCarousel() {
  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  const prev = document.querySelector("[data-carousel-prev]");
  const next = document.querySelector("[data-carousel-next]");
  if (!slides.length) return;

  const showSlide = (index) => {
    state.slide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === state.slide);
    });
  };

  prev?.addEventListener("click", () => showSlide(state.slide - 1));
  next?.addEventListener("click", () => showSlide(state.slide + 1));

  window.setInterval(() => {
    if (document.hidden) return;
    showSlide(state.slide + 1);
  }, 7600);
}

function setupHeaderElevation() {
  const header = document.querySelector("[data-elevate]");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

renderFeatured();
renderTags();
renderResults();
setupSearch();
setupCarousel();
setupHeaderElevation();
