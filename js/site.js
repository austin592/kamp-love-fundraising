(() => {
  const toggle = document.querySelector('.globalnav-toggle');
  const menu = document.querySelector('.globalnav-links');
  if (toggle && menu) {
    const close = () => { toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); };
    const open = () => { toggle.setAttribute('aria-expanded', 'true'); menu.classList.add('is-open'); };
    toggle.addEventListener('click', () => {
      toggle.getAttribute('aria-expanded') === 'true' ? close() : open();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) close();
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll(
    '.tile, .specs > div, .stats .stat, .cards-2 > .card, .cards-3 > .card, .cards-4 > .card, .splits > .b, .traj > .y, .scenarios > .scenario, .ol-vision > li, .flow > .step, .opp-grid > .opp'
  );
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
    }
  }, { threshold: 0.05, rootMargin: '0px 0px -8% 0px' });
  requestAnimationFrame(() => {
    document.documentElement.classList.add('js-anim');
    targets.forEach((el) => io.observe(el));
  });
})();
