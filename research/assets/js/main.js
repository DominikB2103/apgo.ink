(function () {
  const documents = Array.isArray(window.ASTERION_DOCUMENTS) ? window.ASTERION_DOCUMENTS : [];

  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('#primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const slides = Array.from(document.querySelectorAll('.theorem-slide'));
  const previous = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  let activeSlide = 0;

  function showSlide(index) {
    if (!slides.length) return;
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeSlide);
    });
  }

  if (previous) previous.addEventListener('click', () => showSlide(activeSlide - 1));
  if (next) next.addEventListener('click', () => showSlide(activeSlide + 1));

  const searchInput = document.querySelector('#archive-search');
  const resultGrid = document.querySelector('[data-results]');
  const status = document.querySelector('[data-result-status]');
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const clearButton = document.querySelector('[data-clear-search]');
  let activeFilter = 'all';

  function normalise(value) {
    return String(value || '').trim().toLowerCase();
  }

  function matchesSearch(item, query) {
    if (!query) return true;
    const haystack = [item.title, item.section, item.date, item.excerpt, ...(item.tags || [])]
      .map(normalise)
      .join(' ');
    return haystack.includes(query);
  }

  function matchesFilter(item) {
    return activeFilter === 'all' || item.section === activeFilter;
  }

  function sectionLabel(section) {
    return String(section || '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, character => character.toUpperCase());
  }

  function renderResults() {
    if (!resultGrid || !status) return;
    const query = normalise(searchInput ? searchInput.value : '');
    const filtered = documents.filter(item => matchesFilter(item) && matchesSearch(item, query));

    status.textContent = `${filtered.length} ${filtered.length === 1 ? 'document' : 'documents'} shown`;

    if (!filtered.length) {
      resultGrid.innerHTML = '<div class="no-results">No documents match the current search. Try a broader term or select All.</div>';
      return;
    }

    resultGrid.innerHTML = filtered.map(item => {
      const tags = (item.tags || []).map(tag => `<span>${tag}</span>`).join('');
      return `
        <a class="result-card" href="${item.url}">
          <span class="section-tag">${sectionLabel(item.section)}</span>
          <h3>${item.title}</h3>
          <p>${item.excerpt}</p>
          <div class="tag-list" aria-label="Tags for ${item.title}">${tags}</div>
        </a>
      `;
    }).join('');
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach(candidate => candidate.classList.toggle('is-active', candidate === button));
      renderResults();
    });
  });

  if (searchInput) searchInput.addEventListener('input', renderResults);
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      activeFilter = 'all';
      filterButtons.forEach(button => button.classList.toggle('is-active', button.dataset.filter === 'all'));
      renderResults();
      if (searchInput) searchInput.focus();
    });
  }

  renderResults();
})();
