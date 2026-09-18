/* Blocco stats: contatore animato quando la fascia entra nel viewport.
   Markup: <span class="stats__number" data-count="28">0</span> — il valore finale è in data-count,
   così senza JS (o con reduced-motion) resta comunque leggibile. */
(function () {
  var items = document.querySelectorAll('.stats__number[data-count]');
  if (!items.length) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(el) {
    el.firstChild.nodeValue = el.getAttribute('data-count');
    el.closest('.stats__item').classList.add('is-counted');
  }

  function animate(el) {
    var end = parseInt(el.getAttribute('data-count'), 10);
    var duration = 1100;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.firstChild.nodeValue = String(Math.round(end * eased));
      if (t < 1) requestAnimationFrame(step); else show(el);
    }
    requestAnimationFrame(step);
  }

  // Senza JS il markup mostra già il valore finale; qui lo azzeriamo solo se animeremo.
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(show);
    return;
  }

  items.forEach(function (el) { el.firstChild.nodeValue = '0'; });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      animate(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.4 });

  items.forEach(function (el) { io.observe(el); });
})();
