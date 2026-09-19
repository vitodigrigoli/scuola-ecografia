/* Blocco program: evidenzia nella nav l'incontro visibile durante lo scroll. */
(function () {
  var nav = document.querySelector('.program__nav');
  if (!nav || !('IntersectionObserver' in window)) return;
  var links = Array.prototype.slice.call(nav.querySelectorAll('.program__nav-link'));
  var meetings = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if (!meetings.length) return;

  function activate(id) {
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', on);
      a.classList.remove('program__nav-link--active');
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  // l'incontro "corrente" è l'ultimo il cui inizio è sopra la metà dello schermo
  var io = new IntersectionObserver(function () {
    var current = meetings[0];
    var line = window.innerHeight * 0.5;
    meetings.forEach(function (m) { if (m.getBoundingClientRect().top <= line) current = m; });
    activate(current.id);
  }, { rootMargin: '-50% 0px -50% 0px', threshold: [0, 1] });

  meetings.forEach(function (m) { io.observe(m); });
  window.addEventListener('scroll', function () { io.takeRecords(); }, { passive: true });
  activate(meetings[0].id);
})();
