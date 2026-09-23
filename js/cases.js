/* Hub dei casi clinici: evidenzia nella barra sticky il distretto visibile.
   Stessa logica di js/program.js ma su .cases-nav (sezioni .cases con id = categoria). */
(function () {
  var nav = document.querySelector('.cases-nav');
  if (!nav || !('IntersectionObserver' in window)) return;
  var links = Array.prototype.slice.call(nav.querySelectorAll('.cases-nav__link'));
  var sezioni = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if (!sezioni.length) return;

  function activate(id) {
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', on);
      if (on) {
        a.setAttribute('aria-current', 'true');
        // tiene la voce attiva visibile quando la barra scorre su mobile
        var list = a.parentElement;
        if (list.scrollWidth > list.clientWidth) {
          var target = a.offsetLeft - (list.clientWidth - a.offsetWidth) / 2;
          list.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
        }
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  var io = new IntersectionObserver(function () {
    var current = sezioni[0];
    var line = window.innerHeight * 0.4;
    sezioni.forEach(function (s) { if (s.getBoundingClientRect().top <= line) current = s; });
    activate(current.id);
  }, { rootMargin: '-40% 0px -60% 0px', threshold: [0, 1] });

  sezioni.forEach(function (s) { io.observe(s); });
  window.addEventListener('scroll', function () { io.takeRecords(); }, { passive: true });
  activate(sezioni[0].id);
})();
