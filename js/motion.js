/* Comparsa allo scroll (css/motion.css): un elemento con [data-animate] o
   [data-animate-group] riceve .is-in quando il suo bordo alto entra nello schermo
   (oltre il 92% dell'altezza), una volta sola. Gli attributi li mette content/build-pages.js.

   Perché un controllo allo scroll e non solo IntersectionObserver: con uno scroll veloce,
   o con un salto a un'ancora (#faq), un elemento può passare da sotto a sopra lo schermo
   senza mai risultare "visibile" e resterebbe nascosto. Qui, durante lo scroll, si
   guardano solo gli elementi ancora in attesa (la lista si svuota man mano), al massimo ogni
   100 ms e una volta quando lo scroll si ferma; anche al caricamento completo e ai cambi di ancora:
     - entra nello schermo        → .is-in (animazione);
     - è già sopra lo schermo     → .is-in .is-instant (compare subito, senza animazione).
   Gira solo se l'<head> ha messo html.motion (niente prefers-reduced-motion). */
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('motion')) return;
  window.__motion = true; // l'<head> non deve più togliere .motion

  var MAX_STAGGER = 8;   // oltre l'ottava card il ritardo non cresce più
  var TRIGGER = 0.92;    // frazione dell'altezza dello schermo oltre cui si attiva

  Array.prototype.forEach.call(document.querySelectorAll('[data-animate-group]'), function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty('--i', Math.min(i, MAX_STAGGER));
    });
  });

  var pending = Array.prototype.slice.call(document.querySelectorAll('[data-animate], [data-animate-group]'));
  var last = 0;
  var trailing = null;

  function check() {
    var limit = window.innerHeight * TRIGGER;
    pending = pending.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0) { el.classList.add('is-in', 'is-instant'); return false; }
      if (r.top < limit) { el.classList.add('is-in'); return false; }
      return true;
    });
    if (!pending.length) {
      ['scroll', 'resize', 'hashchange', 'load'].forEach(function (t) { window.removeEventListener(t, onScroll); });
    }
  }

  // al massimo un controllo ogni 100 ms durante lo scroll, più uno finale quando si ferma
  // (niente requestAnimationFrame: non dipende dal ritmo dei fotogrammi)
  function onScroll() {
    var now = Date.now();
    if (now - last > 100) { last = now; check(); }
    clearTimeout(trailing);
    trailing = setTimeout(check, 120);
  }

  ['scroll', 'resize', 'hashchange', 'load'].forEach(function (t) {
    window.addEventListener(t, onScroll, { passive: true });
  });
  check();
})();
