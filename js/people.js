/* Blocco people, variante --scroller: duplica le card per il loop continuo e
   calcola la durata dell'animazione in base alla larghezza della traccia
   (velocità costante ~40px/s). Con prefers-reduced-motion non duplica: resta scroll manuale. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var tracks = document.querySelectorAll('.people--scroller .people__track');
  tracks.forEach(function (track) {
    var cards = Array.prototype.slice.call(track.children);
    if (cards.length < 2) return;
    cards.forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a, button').forEach(function (el) { el.tabIndex = -1; });
      track.appendChild(clone);
    });
    var speed = 40; // px al secondo
    var half = track.scrollWidth / 2;
    track.style.setProperty('--people-scroller-duration', Math.round(half / speed) + 's');
    track.classList.add('is-cloned');
  });
})();
