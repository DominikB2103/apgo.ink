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
  var publications = Array.prototype.slice.call(document.querySelectorAll('[data-publications] [data-category]'));

  if (filterGroup && publications.length) {
    filterGroup.addEventListener('click', function (event) {
      var button = event.target.closest('[data-filter]');
      if (!button) return;

      var filter = button.getAttribute('data-filter');
      Array.prototype.forEach.call(filterGroup.querySelectorAll('[data-filter]'), function (item) {
        item.classList.toggle('is-active', item === button);
      });

      publications.forEach(function (publication) {
        var match = filter === 'all' || publication.getAttribute('data-category') === filter;
        publication.classList.toggle('is-hidden', !match);
      });
    });
  }
})();
