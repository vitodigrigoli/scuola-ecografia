/* Blocco header: menu mobile + stato scrolled. */
(function () {
  var header = document.querySelector('[data-header]');
  if (!header) return;

  var burger = header.querySelector('[data-header-burger]');
  var nav = header.querySelector('.header__nav');

  function setOpen(open) {
    header.classList.toggle('is-open', open);
    if (burger) burger.setAttribute('aria-expanded', String(open));
  }

  if (burger) {
    burger.addEventListener('click', function () {
      setOpen(!header.classList.contains('is-open'));
    });
  }

  // chiudi al click su un link, con ESC, o cliccando fuori
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.header__link')) setOpen(false);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) setOpen(false);
  });

  // stato scrolled (bordo più marcato nella variante floating)
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
