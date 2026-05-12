(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var root = document.querySelector('[data-filter-root]');
  if (!root) return;
  var input = root.querySelector('[data-search]');
  var buttons = Array.prototype.slice.call(root.querySelectorAll('[data-filter]'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.publication-card'));
  var active = 'all';

  function normalize(value) {
    return (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function render() {
    var query = normalize(input ? input.value : '');
    cards.forEach(function (card) {
      var kind = card.getAttribute('data-kind') || '';
      var title = normalize(card.getAttribute('data-title') + ' ' + card.textContent);
      var matchKind = active === 'all' || kind === active;
      var matchSearch = !query || title.indexOf(query) !== -1;
      card.hidden = !(matchKind && matchSearch);
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      active = button.getAttribute('data-filter');
      buttons.forEach(function (b) { b.classList.remove('is-active'); });
      button.classList.add('is-active');
      render();
    });
  });
  if (input) input.addEventListener('input', render);
})();
