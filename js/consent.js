/* Blocco consent: avviso cookie e, se c'è GA4, gestione del consenso.
   Due modalità, decise dal markup (content/build-pages.js → content/config.js):
   - senza data-ga4: avviso informativo, "Ho capito" lo chiude per sempre (solo strumenti tecnici);
   - con data-ga4="GTM-…" o "G-…": richiesta di consenso. GA4 viene caricato SOLO dopo "Accetta";
     "Rifiuta" non carica nulla. La scelta vale 6 mesi, poi si richiede (Linee guida Garante
     10/06/2021). "Preferenze cookie" nel footer ([data-consent="open"]) riapre l'avviso;
     se il consenso viene revocato si cancellano i cookie di GA e si ricarica la pagina.
   La scelta è salvata in localStorage['consent'] come JSON { v, analytics, ts }.
   Cambiando VERSION la scelta viene richiesta a tutti (es. policy aggiornata). */
(function () {
  var el = document.getElementById('consent');
  if (!el) return;

  var KEY = 'consent';
  var VERSION = '2026-11-11';
  var MAX_AGE = 1000 * 60 * 60 * 24 * 182; // ~6 mesi
  var gaId = el.getAttribute('data-ga4');

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var c = JSON.parse(raw);
      if (!c || c.v !== VERSION || Date.now() - c.ts > MAX_AGE) return null;
      return c;
    } catch (e) { return null; }
  }

  function save(analytics) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: VERSION, analytics: !!analytics, ts: Date.now() }));
    } catch (e) { /* storage non disponibile: la scelta vale solo per questa pagina */ }
  }

  function show() {
    el.hidden = false;
    requestAnimationFrame(function () { el.classList.add('is-visible'); });
    // richiesta di consenso: la pagina sotto è bloccata, la tastiera va subito sulla card
    if (gaId) {
      var panel = el.querySelector('.consent__panel');
      if (panel) panel.focus({ preventScroll: true });
    }
  }

  function hide() {
    el.classList.remove('is-visible');
    setTimeout(function () { el.hidden = true; }, 200);
  }

  // GA4: script iniettato solo qui, dopo il consenso. Pubblicità sempre negata (Consent Mode v2).
  function loadGA() {
    if (!gaId || window.__gaLoaded) return;
    window.__gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    var s = document.createElement('script');
    s.async = true;
    if (/^GTM-/.test(gaId)) {
      // contenitore del tag Google (GTM-…): come lo snippet fornito da Google, GA4 è configurato
      // dentro il contenitore, quindi niente gtag('config')
      s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(gaId);
    } else {
      // ID di misurazione GA4 (G-…)
      window.gtag('config', gaId);
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
    }
    document.head.appendChild(s);
  }

  // revoca: via i cookie _ga e _ga_<ID> su questo dominio e su quello padre
  function clearGA() {
    var host = location.hostname;
    var domains = ['', host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name !== '_ga' && name.indexOf('_ga_') !== 0) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  // --- modalità informativa (nessun GA4)
  if (!gaId) {
    try { if (localStorage.getItem(KEY) === VERSION) return; } catch (e) { /* mostra */ }
    show();
    el.addEventListener('click', function (e) {
      if (!e.target.closest('[data-consent="ok"]')) return;
      try { localStorage.setItem(KEY, VERSION); } catch (err) { /* niente persistenza */ }
      hide();
    });
    return;
  }

  // --- modalità consenso (GA4)
  var choice = read();
  if (choice && choice.analytics) loadGA();
  if (!choice) show();

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-consent]');
    if (!btn) return;
    var action = btn.getAttribute('data-consent');
    if (action === 'open') { show(); return; }
    if (action !== 'accept' && action !== 'reject') return;

    var wasOn = !!(read() || {}).analytics;
    save(action === 'accept');
    hide();
    if (action === 'accept') loadGA();
    else if (wasOn || window.__gaLoaded) { clearGA(); location.reload(); }
  });
})();
