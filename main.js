(() => {
  const nav = document.querySelector('.site-nav');
  const menu = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');

  const closeMenu = () => {
    if (!menu || !links) return;
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  menu?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  links?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  addEventListener('scroll', () => nav?.classList.toggle('scrolled', scrollY > 24), { passive: true });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

  const target = new Date('2026-11-14T16:00:00-05:00').getTime();
  const tick = () => {
    const remaining = Math.max(0, target - Date.now());
    const values = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining % 86400000) / 3600000),
      minutes: Math.floor((remaining % 3600000) / 60000)
    };
    Object.entries(values).forEach(([key, value]) => {
      const el = document.querySelector(`[data-count="${key}"]`);
      if (el) el.textContent = String(value).padStart(2, '0');
    });
  };
  tick();
  setInterval(tick, 30000);
})();
