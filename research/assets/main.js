(function () {
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (event) {
      if (event.target && event.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var filterGroup = document.querySelector('[data-filter-group]');
  var searchInput = document.querySelector('[data-publication-search]');
  var publications = Array.prototype.slice.call(document.querySelectorAll('[data-publications] [data-category]'));
  var activeFilter = 'all';

  function normalise(value) {
    return String(value || '').toLowerCase().trim();
  }

  function applyPublicationFilters() {
    var query = normalise(searchInput && searchInput.value);

    publications.forEach(function (publication) {
      var category = publication.getAttribute('data-category');
      var text = normalise(publication.textContent);
      var matchesCategory = activeFilter === 'all' || category === activeFilter;
      var matchesQuery = !query || text.indexOf(query) !== -1;
      publication.classList.toggle('is-hidden', !(matchesCategory && matchesQuery));
    });
  }

  if (filterGroup && publications.length) {
    filterGroup.addEventListener('click', function (event) {
      var button = event.target.closest('[data-filter]');
      if (!button) return;

      activeFilter = button.getAttribute('data-filter');
      Array.prototype.forEach.call(filterGroup.querySelectorAll('[data-filter]'), function (item) {
        item.classList.toggle('is-active', item === button);
      });
      applyPublicationFilters();
    });
  }

  if (searchInput && publications.length) {
    searchInput.addEventListener('input', applyPublicationFilters);
  }
})();
