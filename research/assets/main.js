(() => {
  const indexPath = './assets/research-index.json';
  const form = document.querySelector('[data-search-form]');
  const input = document.querySelector('[data-search-input]');
  const clear = document.querySelector('[data-clear-search]');
  const results = document.querySelector('[data-results]');
  const empty = document.querySelector('[data-empty-state]');
  const resultCount = document.querySelector('[data-result-count]');
  const totalCount = document.querySelector('[data-total-count]');
  const totalLabel = document.querySelector('[data-total-label]');

  let records = [];

  const normalize = (value) => String(value || '').toLowerCase().trim();

  function setCount(count, total) {
    if (resultCount) resultCount.textContent = `${count} ${count === 1 ? 'record' : 'records'}`;
    if (totalCount) totalCount.textContent = String(total);
    if (totalLabel) totalLabel.textContent = total === 0 ? 'None indexed' : `${total} indexed`;
  }

  function recordText(record) {
    return normalize([
      record.title,
      record.authors,
      record.abstract,
      record.summary,
      record.date,
      record.type,
      ...(Array.isArray(record.keywords) ? record.keywords : [])
    ].join(' '));
  }

  function render(list) {
    if (!results || !empty) return;
    results.innerHTML = '';
    setCount(list.length, records.length);

    if (!list.length) {
      empty.hidden = false;
      return;
    }

    empty.hidden = true;
    const fragment = document.createDocumentFragment();

    list.forEach((record) => {
      const article = document.createElement('article');
      article.className = 'result-card';

      const body = document.createElement('div');
      const title = document.createElement('h3');
      title.className = 'result-title';
      title.textContent = record.title || 'Untitled record';

      const summary = document.createElement('p');
      summary.className = 'result-summary';
      summary.textContent = record.abstract || record.summary || '';

      const meta = document.createElement('div');
      meta.className = 'result-meta';
      meta.textContent = [record.type, record.date].filter(Boolean).join(' · ');

      body.append(title, summary);
      article.append(body, meta);
      fragment.append(article);
    });

    results.append(fragment);
  }

  function search() {
    const query = normalize(input && input.value);
    if (!query) {
      render(records);
      return;
    }
    render(records.filter((record) => recordText(record).includes(query)));
  }

  async function loadIndex() {
    try {
      const response = await fetch(indexPath, { cache: 'no-store' });
      if (!response.ok) throw new Error('Index unavailable');
      const json = await response.json();
      records = Array.isArray(json) ? json : [];
    } catch (_) {
      records = [];
    }
    records.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    search();
  }

  if (form) form.addEventListener('submit', (event) => event.preventDefault());
  if (input) input.addEventListener('input', search);
  if (clear) clear.addEventListener('click', () => {
    if (input) input.value = '';
    search();
    if (input) input.focus();
  });

  loadIndex();
})();
