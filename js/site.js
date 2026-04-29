(() => {
  const fc = document.getElementById('floatingCta');
  const hero = document.querySelector('.tile.hero, .tile.hero-xl');
  const give = document.getElementById('give');
  if (fc && hero) {
    let heroVisible = true, giveVisible = false;
    const update = () => fc.classList.toggle('is-visible', !heroVisible && !giveVisible);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroVisible = e.isIntersecting;
        if (give && e.target === give) giveVisible = e.isIntersecting;
      }
      update();
    }, { threshold: 0, rootMargin: '-44px 0px 0px 0px' });
    io.observe(hero);
    if (give) io.observe(give);
  }

  const campusSelect = document.getElementById('campusSelect');
  if (campusSelect) {
    const update = () => {
      const slug = campusSelect.value;
      document.querySelectorAll('a[data-donate-base]').forEach((a) => {
        const base = a.dataset.donateBase;
        a.href = slug ? `${base}?default_campaign=${slug}` : base;
      });
    };
    campusSelect.addEventListener('change', update);
    update();
  }

  document.querySelectorAll('.video-play').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.yt;
      if (!id) return;
      const title = btn.getAttribute('aria-label') || 'YouTube video';
      const tile = btn.closest('.video-tile');
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      tile.appendChild(iframe);
      btn.remove();
      const img = tile.querySelector('img');
      if (img) img.remove();
    });
  });

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
