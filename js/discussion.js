/* Discussione dei casi clinici — ANTEPRIMA.
   Il sito è statico: non esiste un backend. Questo script simula la pubblicazione di un
   referto per mostrare il template: il commento compare in pagina con lo stato
   "in moderazione" e sparisce al ricaricamento. Nessun dato viene salvato o inviato.

   Markup atteso:
     form.discussion__form  con  [name=nome], [name=referto], [name=consenso]
     .discussion__list      dove inserire il nuovo referto
     .discussion__count     contatore da aggiornare
     .discussion__feedback  messaggio di conferma (aria-live) */
(function () {
  var form = document.querySelector('.discussion__form');
  if (!form) return;

  var lista = document.querySelector('.discussion__list');
  var conteggio = document.querySelector('.discussion__count');
  var feedback = document.querySelector('.discussion__feedback');
  var pubblicati = lista ? lista.querySelectorAll('.discussion__item').length : 0;

  var MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
  function oggi() {
    var d = new Date();
    return d.getDate() + ' ' + MESI[d.getMonth()] + ' ' + d.getFullYear();
  }

  function iniziali(nome) {
    return nome.trim().split(/\s+/).map(function (p) { return p[0]; }).join('').slice(0, 2).toUpperCase() || '?';
  }

  // il link "Lascia il tuo referto" porta al modulo: dopo lo scroll il cursore è già nel campo
  document.querySelectorAll('a[href="#scrivi"]').forEach(function (a) {
    a.addEventListener('click', function () {
      setTimeout(function () {
        var t = form.querySelector('[name="referto"]');
        if (t) t.focus({ preventScroll: true });
      }, 400);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = (form.elements.nome.value || '').trim();
    var testo = (form.elements.referto.value || '').trim();
    if (!nome || !testo) return; // required se ne occupa il browser

    var item = document.createElement('article');
    item.className = 'discussion__item discussion__item--pending';
    item.innerHTML =
      '<div class="discussion__meta">' +
        '<span class="chip chip--sm"><span class="chip__initials" aria-hidden="true"></span></span>' +
        '<span class="badge badge--soft badge--sm">In moderazione</span>' +
        '<span class="discussion__date"></span>' +
      '</div>' +
      '<p class="discussion__text"></p>';
    item.querySelector('.chip__initials').textContent = iniziali(nome);
    item.querySelector('.chip').append(nome);
    item.querySelector('.discussion__date').textContent = oggi();
    item.querySelector('.discussion__text').textContent = testo;

    if (lista) lista.prepend(item);
    pubblicati++;
    if (conteggio) {
      var icona = conteggio.querySelector('.icon');
      conteggio.textContent = pubblicati + (pubblicati === 1 ? ' referto pubblicato' : ' referti pubblicati');
      if (icona) conteggio.prepend(icona);
    }
    if (feedback) feedback.classList.add('is-visible');

    form.reset();
    item.setAttribute('tabindex', '-1');
    item.focus({ preventScroll: true });
    item.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
})();
