/* Marquee continua (Organizzatori, Sponsor su mobile).
   Uso: <div data-marquee [data-marquee-speed="40"] [data-marquee-media="(max-width: 767px)"]> …figli… </div>
   - duplica i figli (aria-hidden) finché la traccia copre il viewport, per il loop senza stacco
   - imposta --marquee-copies e --marquee-duration in base alla larghezza reale (px/s costanti)
   - con prefers-reduced-motion non fa nulla: il CSS lascia lo scroll manuale
   - con data-marquee-media attiva solo quando la media query corrisponde */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function setup(track) {
    if (track.classList.contains('is-cloned')) return;
    var cards = Array.prototype.slice.call(track.children);
    if (cards.length < 2) return;
    // l'animazione scorre di una copia alla volta: quella copia deve coprire il
    // viewport, altrimenti su schermi larghi il loop mostra un vuoto
    var copie = 1 + Math.max(1, Math.ceil(window.innerWidth / Math.max(track.scrollWidth, 1)));
    for (var g = 1; g < copie; g++) {
      cards.forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('a, button').forEach(function (el) { el.tabIndex = -1; });
        track.appendChild(clone);
      });
    }
    var speed = parseFloat(track.getAttribute('data-marquee-speed')) || 40;
    var passo = track.scrollWidth / copie; // una copia: quanto scorre prima di ripetersi
    track.style.setProperty('--marquee-copies', copie);
    track.style.setProperty('--marquee-duration', Math.round(passo / speed) + 's');
    track.classList.add('is-cloned');
  }

  document.querySelectorAll('[data-marquee]').forEach(function (track) {
    var media = track.getAttribute('data-marquee-media');
    if (!media) return setup(track);
    var mq = window.matchMedia(media);
    if (mq.matches) setup(track);
    else mq.addEventListener('change', function (e) { if (e.matches) setup(track); }, { once: true });
  });
})();
