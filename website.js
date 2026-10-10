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
  const image = document.getElementById('gallery-image');
  if (!image) return;
  const views = {
    workspace: {title:'A connected trading workspace', description:'Price structure, analysis and execution controls shown together, with the ASR system switched off.', alt:'Actual ASR NinjaTrader workspace with price chart, session regions, indicators and execution panel', height:1004},
    price: {title:'Price-driven chart structure', description:'ASRPriceBars displayed with session regions and supporting overlays on an actual NinjaTrader chart.', alt:'ASR price bars on a NinjaTrader chart with session regions and supporting overlays', height:999},
    structure: {title:'Market structure at a glance', description:'A development capture of the ASR Structure indicator. Its classification describes indicator output, not a guaranteed forecast.', alt:'ASR Structure indicator showing a bearish classification in a development capture', height:256},
    volatility: {title:'Context for changing market activity', description:'A development capture of the ASR Volatility indicator beneath the chart. The classification is descriptive market context.', alt:'ASR Volatility indicator beneath a NinjaTrader price chart', height:338}
  };
  const switcher = document.querySelector('.gallery-switcher');
  const openLink = document.getElementById('gallery-open');
  const originalLink = document.getElementById('gallery-original');
  const dialog = document.getElementById('screenshot-dialog');
  let currentTitle = views.workspace.title;
  switcher.hidden = false;
  switcher.addEventListener('click', event => {
    const button = event.target.closest('button[data-image]');
    if (!button) return;
    const key = button.dataset.image, view = views[key];
    if (!view) return;
    image.src = 'assets/' + key + '.png'; image.alt = view.alt;
    image.height = view.height;
    currentTitle = view.title;
    document.getElementById('gallery-caption').textContent = view.title;
    document.getElementById('gallery-description').textContent = view.description;
    openLink.href = image.src; originalLink.href = image.src;
    openLink.setAttribute('aria-label', 'Enlarge screenshot: ' + view.title);
    switcher.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
  openLink.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    const enlarged = document.getElementById('enlarged-screenshot');
    enlarged.src = image.src; enlarged.alt = image.alt;
    document.getElementById('screenshot-title').textContent = currentTitle;
    dialog.showModal();
  });
  document.getElementById('close-screenshot').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
})();
