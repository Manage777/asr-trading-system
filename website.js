(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (menu && nav) {
    document.documentElement.classList.add('has-js');
    menu.hidden = false;
    const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
    });
    document.addEventListener('click', event => { if (!event.target.closest('.nav')) closeMenu(); });
    window.matchMedia('(max-width: 1150px)').addEventListener('change', closeMenu);
  }
})();
