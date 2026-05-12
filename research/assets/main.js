
(function(){
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if(toggle && nav){
    toggle.addEventListener('click',()=>{
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  const archive = document.querySelector('[data-archive]');
  const filters = document.querySelector('[data-filters]');
  const search = document.querySelector('[data-search]');
  let active = 'all';
  function apply(){
    if(!archive) return;
    const term = (search && search.value || '').trim().toLowerCase();
    archive.querySelectorAll('.publication-card').forEach(card=>{
      const cats = (card.getAttribute('data-category') || '').split(/\s+/);
      const text = (card.getAttribute('data-text') || card.textContent || '').toLowerCase();
      const categoryOk = active === 'all' || cats.includes(active);
      const searchOk = !term || text.includes(term);
      card.classList.toggle('is-hidden', !(categoryOk && searchOk));
    });
  }
  if(filters){
    filters.addEventListener('click', e=>{
      const btn = e.target.closest('[data-filter]');
      if(!btn) return;
      filters.querySelectorAll('.filter').forEach(b=>b.classList.remove('is-active'));
      btn.classList.add('is-active');
      active = btn.getAttribute('data-filter') || 'all';
      apply();
    });
  }
  if(search) search.addEventListener('input', apply);
})();
