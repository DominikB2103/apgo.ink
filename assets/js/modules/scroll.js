export function initScrollButtons(){
  document.querySelectorAll('[data-back-to-top]').forEach((button) => {
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  });
}
