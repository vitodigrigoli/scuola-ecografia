/* Lightbox delle immagini ecografiche.
   Legge le immagini dalla .gallery della pagina, costruisce un <dialog> una volta sola e
   lo apre sull'indice cliccato. Niente librerie: <dialog> dà Esc, focus trap e backdrop.

   Markup atteso:
     .gallery__item[data-index]  → contiene <img data-full="…"> (o src) e .gallery__caption
     [data-lightbox-open]        → bottone "vedi tutte": apre dalla prima immagine

   Tastiera: ← → per scorrere, Esc per chiudere (nativo). Touch: swipe orizzontale. */
(function () {
  var gallery = document.querySelector('.gallery');
  if (!gallery || typeof HTMLDialogElement === 'undefined') return;

  var items = Array.prototype.slice.call(gallery.querySelectorAll('.gallery__item'));
  if (!items.length) return;

  var shots = items.map(function (item) {
    var img = item.querySelector('img');
    var cap = item.querySelector('.gallery__caption');
    return {
      src: img.getAttribute('data-full') || img.getAttribute('src'),
      alt: img.getAttribute('alt') || '',
      caption: cap ? cap.textContent.replace(/^\s*\d+\s*/, '').trim() : '',
    };
  });

  var titolo = gallery.getAttribute('data-lightbox-title') || '';
  var current = 0;
  var lastTrigger = null;

  // --- markup, costruito una volta ---
  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Immagini ecografiche del caso');
  dialog.innerHTML =
    '<div class="lightbox__inner">' +
      '<div class="lightbox__bar">' +
        '<p class="lightbox__title">' + titolo + '</p>' +
        '<p class="lightbox__counter" aria-live="polite"></p>' +
        '<button class="lightbox__close" type="button" aria-label="Chiudi">' +
          '<svg class="icon" aria-hidden="true"><use href="#icon-close"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="lightbox__stage">' +
        '<button class="lightbox__prev" type="button" aria-label="Immagine precedente">' +
          '<svg class="icon" aria-hidden="true"><use href="#icon-chevron-left"/></svg></button>' +
        '<figure class="lightbox__figure">' +
          '<img alt="">' +
          '<figcaption class="lightbox__caption"></figcaption>' +
        '</figure>' +
        '<button class="lightbox__next" type="button" aria-label="Immagine successiva">' +
          '<svg class="icon" aria-hidden="true"><use href="#icon-chevron-right"/></svg></button>' +
      '</div>' +
      '<div class="lightbox__thumbs" role="tablist" aria-label="Miniature"></div>' +
    '</div>';
  document.body.appendChild(dialog);

  var img = dialog.querySelector('.lightbox__figure img');
  var caption = dialog.querySelector('.lightbox__caption');
  var counter = dialog.querySelector('.lightbox__counter');
  var prev = dialog.querySelector('.lightbox__prev');
  var next = dialog.querySelector('.lightbox__next');
  var thumbs = dialog.querySelector('.lightbox__thumbs');

  shots.forEach(function (s, i) {
    var b = document.createElement('button');
    b.className = 'lightbox__thumb';
    b.type = 'button';
    b.setAttribute('aria-label', 'Immagine ' + (i + 1) + ': ' + s.caption);
    b.innerHTML = '<img src="' + s.src + '" alt="" loading="lazy">';
    b.addEventListener('click', function () { show(i); });
    thumbs.appendChild(b);
  });
  var thumbList = Array.prototype.slice.call(thumbs.children);

  function show(i) {
    current = (i + shots.length) % shots.length;
    var s = shots[current];
    img.src = s.src;
    img.alt = s.alt;
    caption.innerHTML = '<span class="lightbox__caption-index">' + (current + 1) + '</span>' + s.caption;
    counter.textContent = (current + 1) + ' / ' + shots.length;
    thumbList.forEach(function (t, j) {
      t.classList.toggle('is-current', j === current);
      t.setAttribute('aria-selected', String(j === current));
    });
    var t = thumbList[current];
    if (t && thumbs.scrollWidth > thumbs.clientWidth) {
      thumbs.scrollTo({ left: Math.max(0, t.offsetLeft - (thumbs.clientWidth - t.offsetWidth) / 2), behavior: 'smooth' });
    }
  }

  function open(i, trigger) {
    lastTrigger = trigger || null;
    show(i);
    dialog.showModal();
  }

  dialog.querySelector('.lightbox__close').addEventListener('click', function () { dialog.close(); });
  prev.addEventListener('click', function () { show(current - 1); });
  next.addEventListener('click', function () { show(current + 1); });

  dialog.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
  });

  // chiusura cliccando sul fondo (fuori da figura, frecce e barre)
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog || e.target.classList.contains('lightbox__stage') || e.target.classList.contains('lightbox__inner')) dialog.close();
  });

  // il focus torna a chi ha aperto il lightbox (dopo il ripristino che fa il browser)
  dialog.addEventListener('close', function () {
    if (!lastTrigger) return;
    requestAnimationFrame(function () { lastTrigger.focus(); });
  });

  // swipe su touch
  var startX = null;
  dialog.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });

  // --- trigger ---
  items.forEach(function (item, i) {
    item.addEventListener('click', function () { open(i, item); });
  });
  document.querySelectorAll('[data-lightbox-open]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      open(parseInt(btn.getAttribute('data-lightbox-open'), 10) || 0, btn);
    });
  });
})();
