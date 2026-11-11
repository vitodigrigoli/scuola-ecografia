/* Genera le pagine con lo stesso shell (header/footer). Uso: node content/build-pages.js
   - shell (head, header, script) definito qui
   - contenuto di ogni pagina in content/pages/<id>.html (i blocchi vengono aggiunti uno alla volta)
   Finché non c'è un build step vero, questo evita di tenere 4 copie dell'header a mano. */
const fs = require('fs');
const path = require('path');
const config = require('./config');
const seo = require('./seo');

const casiPagine = fs.existsSync(path.join(__dirname, 'casi-pagine.json'))
  ? JSON.parse(fs.readFileSync(path.join(__dirname, 'casi-pagine.json'), 'utf8'))
  : [];

const pages = [
  { file: 'index.html',     id: 'home',      title: 'Scuola di Ecografia Muscoloscheletrica ANFI', h1: 'Home' },
  { file: 'metodo.html',    id: 'metodo',    title: 'Il metodo — Scuola di Ecografia Muscoloscheletrica ANFI', h1: 'Il metodo' },
  { file: 'programma.html', id: 'programma', title: 'Programma — Scuola di Ecografia Muscoloscheletrica ANFI', h1: 'Programma' },
  { file: 'relatori.html',  id: 'relatori',  title: 'Relatori — Scuola di Ecografia Muscoloscheletrica ANFI', h1: 'Relatori' },
  { file: 'prenota.html',   id: 'prenota',   title: 'Prenota — Scuola di Ecografia Muscoloscheletrica ANFI', h1: 'Prenota' },
  { file: 'privacy-policy.html', id: 'privacy-policy', title: 'Privacy Policy — Scuola di Ecografia Muscoloscheletrica ANFI', h1: 'Privacy Policy' },
  { file: 'cookie-policy.html',  id: 'cookie-policy',  title: 'Cookie Policy — Scuola di Ecografia Muscoloscheletrica ANFI', h1: 'Cookie Policy' },
  // casi clinici solo se la sezione è online (content/config.js)
  ...(config.casiOnline ? [
    { file: 'casi-clinici.html', id: 'casi-clinici', title: 'Casi clinici — Scuola di Ecografia Muscoloscheletrica ANFI', h1: 'Casi clinici' },
    ...casiPagine.map(p => ({ ...p, h1: 'Caso clinico', nav: 'casi-clinici' })),
  ] : []),
];

const links = [
  { id: 'metodo',    href: 'metodo.html',    label: 'Il metodo' },
  { id: 'programma', href: 'programma.html', label: 'Programma' },
  { id: 'relatori',  href: 'relatori.html',  label: 'Relatori' },
  ...(config.casiOnline ? [{ id: 'casi-clinici', href: 'casi-clinici.html', label: 'Casi clinici' }] : []),
  { id: 'prenota',   href: 'prenota.html',   label: 'Prenota' },
  { id: 'faq',       href: 'index.html#faq', label: 'FAQ' },
];

const icon = (name, extra = '') => `<svg class="icon${extra ? ' ' + extra : ''}" aria-hidden="true"><use href="#icon-${name}"/></svg>`;

// Sprite inline in ogni pagina: <use href="#icon-x"> funziona anche da file:// (lo sprite esterno no)
const sprite = fs.readFileSync(path.join(__dirname, '..', 'assets', 'icons', 'sprite.svg'), 'utf8').trim();

function header(active) {
  const nav = links.map(l => {
    const isActive = l.id === active;
    return `          <li><a class="header__link${isActive ? ' header__link--active' : ''}" href="${l.href}"${isActive ? ' aria-current="page"' : ''}>${l.label}</a></li>`;
  }).join('\n');

  return `  <header class="header header--floating" data-header>
    <div class="header__inner">
      <a class="header__brand" href="index.html" aria-label="Scuola di Ecografia Muscoloscheletrica — Home">
        <img class="header__logo" src="assets/logo/scuola-ecografia-wordmark.png" alt="Scuola di Ecografia Muscoloscheletrica" width="1640" height="260">
      </a>

      <nav class="header__nav" id="header-nav" aria-label="Navigazione principale">
        <ul class="header__links">
${nav}
        </ul>
        <div class="header__extras">
          <button class="header__toggle" type="button" data-theme-toggle aria-pressed="false" aria-label="Attiva tema chiaro">
            <span class="header__toggle-knob">
              ${icon('moon', 'header__toggle-icon header__toggle-icon--moon')}
              ${icon('sun', 'header__toggle-icon header__toggle-icon--sun')}
            </span>
          </button>
          <a class="header__login" href="https://associazioneanfi.it/account-iscrizione/" rel="noopener">Login</a>
        </div>
      </nav>

      <a class="header__cta" href="prenota.html">Prenota il corso ${icon('arrow-right')}</a>

      <button class="header__burger" type="button" data-header-burger aria-expanded="false" aria-controls="header-nav" aria-label="Apri il menu">
        ${icon('menu', 'header__burger-icon header__burger-icon--open')}
        ${icon('close', 'header__burger-icon header__burger-icon--close')}
      </button>
    </div>
  </header>`;
}

function footer() {
  const ext = icon('external');
  const link = (href, label, external) => `            <li><a class="footer__link" href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}>${label}${external ? ' ' + ext : ''}</a></li>`;
  return `  <footer class="footer">
    <div class="container">
      <div class="footer__bar">
        <a class="footer__brand" href="index.html" aria-label="Scuola di Ecografia Muscoloscheletrica — Home"><img class="footer__logo" src="assets/logo/scuola-ecografia-wordmark.png" alt="Scuola di Ecografia Muscoloscheletrica" width="1640" height="260"></a>
        <p class="footer__meta">
          <span>© ${new Date().getFullYear()} Fisiaforma&nbsp;S.R.L.</span>
          <span>P.IVA 02546630035</span>
          <a href="mailto:segreteria@scuoladiecografia.com">segreteria@scuoladiecografia.com</a>
        </p>
        <ul class="footer__legal">
${link('privacy-policy.html', 'Privacy Policy')}
${link('cookie-policy.html', 'Cookie Policy')}
${config.ga4Id ? `
            <li><button class="footer__link" type="button" data-consent="open">Preferenze cookie</button></li>` : ''}
        </ul>
      </div>
    </div>
  </footer>`;
}

/* Avviso cookie (blocks/consent.css + js/consent.js), in due modalità secondo content/config.js:
   - senza GA4: solo strumenti tecnici, l'avviso informa e si chiude ("Ho capito");
   - con GA4: richiesta di consenso, "Rifiuta" e "Accetta" con lo stesso peso; GA4 parte solo
     dopo "Accetta". L'ID viaggia in data-ga4, il JS non ne ha una copia propria.
   Resta nascosto finché il JS non verifica che la scelta non sia già stata fatta. */
function consent() {
  if (!config.ga4Id) {
    return `  <aside class="consent" id="consent" aria-label="Informativa sui cookie" hidden>
    <div class="consent__panel">
    <p class="consent__text">Questo sito usa solo strumenti tecnici necessari al suo funzionamento, come la memoria del tema chiaro o scuro. Nessun cookie di profilazione o di statistica. <a class="consent__link" href="cookie-policy.html">Cookie Policy</a></p>
    <div class="consent__actions">
      <button class="btn btn--primary btn--sm" type="button" data-consent="ok">Ho capito</button>
    </div>
    </div>
  </aside>`;
  }
  return `  <div class="consent consent--choice" id="consent" role="dialog" aria-modal="true" aria-label="Preferenze cookie" data-ga4="${config.ga4Id}" hidden>
    <div class="consent__panel" tabindex="-1">
    <p class="consent__text">Usiamo strumenti tecnici per far funzionare il sito e, solo se accetti, Google Analytics per capire in forma aggregata come viene usato. Puoi cambiare idea in qualsiasi momento da «Preferenze cookie» in fondo alla pagina. <a class="consent__link" href="cookie-policy.html">Cookie Policy</a></p>
    <div class="consent__actions">
      <button class="btn btn--secondary btn--sm" type="button" data-consent="reject">Rifiuta</button>
      <button class="btn btn--secondary btn--sm" type="button" data-consent="accept">Accetta</button>
    </div>
    </div>
  </div>`;
}

/* Blocchi condizionali nelle pagine: <!-- se:ga4 -->…<!-- /se:ga4 --> compare solo con GA4
   attivo, <!-- se:no-ga4 -->…<!-- /se:no-ga4 --> solo senza (usati in privacy e cookie policy). */
function condizionali(html) {
  const tieni = { 'ga4': !!config.ga4Id, 'no-ga4': !config.ga4Id };
  return html.replace(/[ \t]*<!-- se:([a-z0-9-]+) -->\n?([\s\S]*?)[ \t]*<!-- \/se:\1 -->\n?/g,
    (m, chiave, contenuto) => (tieni[chiave] ? contenuto : ''))
    // {{ga4Id}}: l'ID del tag Google preso da content/config.js, così le policy restano allineate
    .replace(/{{ga4Id}}/g, config.ga4Id)
    // {{ga4Cookie}}: nome del cookie di sessione di GA4, _ga_ + ID di misurazione senza «G-»
    .replace(/{{ga4Cookie}}/g, () => {
      const id = config.ga4MeasurementId || (/^G-/.test(config.ga4Id) ? config.ga4Id : '');
      return id ? '_ga_' + id.replace(/^G-/, '') : '_ga_&lt;ID&gt;';
    });
}

/* Animazioni di comparsa (css/motion.css): attributi messi qui, così valgono in tutte le pagine
   senza toccare i sorgenti. Intestazioni di sezione, griglie di card (i figli entrano in
   sequenza) e foto grandi. Niente su prezzi, FAQ, scroller e testi delle policy. */
const ANIMA = {
  testo: ['text-block'],
  gruppo: ['features__grid', 'percorso__steps', 'testimonials__grid', 'editions__grid', 'venues__grid', 'people__grid'],
  foto: ['photo', 'media-text__figure'],
};
function animazioni(html) {
  const tag = (classi, attr) => new RegExp('(<[a-z]+\\s[^>]*?class="(?:' + classi.join('|') + ')(?=[\\s"])[^"]*")', 'g');
  return html
    .replace(tag(ANIMA.testo), '$1 data-animate')
    .replace(tag(ANIMA.gruppo), '$1 data-animate-group')
    .replace(tag(ANIMA.foto), '$1 data-animate="photo"');
}

function body(p) {
  const partial = path.join(__dirname, 'pages', p.id + '.html');
  if (fs.existsSync(partial)) return animazioni(condizionali(fs.readFileSync(partial, 'utf8'))).trimEnd();
  return `    <!-- I blocchi di pagina verranno aggiunti uno alla volta in content/pages/${p.id}.html -->
    <section class="section">
      <div class="container">
        <p class="label" style="color: var(--accent)">In costruzione</p>
        <h1 class="h1" style="margin-top: var(--space-3)">${p.h1}</h1>
        <p class="body-lg" style="color: var(--ink-dim); margin-top: var(--space-4); max-width: 60ch">I contenuti di questa pagina sono raccolti in <code>content/contenuti.md</code> e verranno impaginati blocco per blocco.</p>
      </div>
    </section>`;
}

/* Metadati SEO (content/seo.js): titolo, descrizione, canonico, Open Graph, dati strutturati.
   Le pagine dei casi clinici non hanno una voce in seo.js e usano titolo e descrizione generici. */
const OG_IMAGE = { src: 'assets/img/og/scuola-ecografia.jpg', w: 1200, h: 630,
  alt: 'Foto di gruppo dei discenti del corso di ecografia muscoloscheletrica con i diplomi' };
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const urlDi = (p) => config.siteUrl + '/' + (p.file === 'index.html' ? '' : p.file);

function meta(p) {
  const m = seo.pagine[p.id] || {};
  const title = m.title || p.title;
  const description = m.description || seo.pagine.home.description;
  const url = urlDi(p);
  const img = config.siteUrl + '/' + OG_IMAGE.src;
  const ld = p.id === 'home' ? seo.home(config.siteUrl) : m.breadcrumb ? [seo.breadcrumb(config.siteUrl, m.breadcrumb, url)] : [];
  const json = ld.length ? JSON.stringify({ '@context': 'https://schema.org', '@graph': ld }, null, 2)
    .replace(/</g, '\\u003c') // niente "</script>" accidentali dentro il JSON
    .split('\n').map((r) => '  ' + r).join('\n') : '';
  return `  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${url}">

  <!-- Anteprima dei link condivisi (Open Graph: WhatsApp, LinkedIn, Facebook; Twitter/X) -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(seo.NOME)}">
  <meta property="og:locale" content="it_IT">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${img}">
  <meta property="og:image:width" content="${OG_IMAGE.w}">
  <meta property="og:image:height" content="${OG_IMAGE.h}">
  <meta property="og:image:alt" content="${esc(OG_IMAGE.alt)}">
  <meta name="twitter:card" content="summary_large_image">${json ? `

  <!-- Dati strutturati (schema.org) -->
  <script type="application/ld+json">
${json}
  </script>` : ''}`;
}

function page(p) {
  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${meta(p)}
${config.indicizzabile ? '' : '  <meta name="robots" content="noindex">\n'}
  <!-- Favicon (assets/favicon/, favicon.ico e site.webmanifest in radice) -->
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16.png">
  <link rel="apple-touch-icon" href="assets/favicon/apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)">

  <!-- Tema: applicato prima del paint per evitare il flash (default dark) -->
  <script>
    (function () {
      try {
        if (localStorage.getItem('theme') === 'light') document.documentElement.setAttribute('data-theme', 'light');
      } catch (e) {}
    })();
  </script>

  <!-- Animazioni di comparsa (css/motion.css, js/motion.js): attive solo se il browser le regge e
       non c'è "riduci movimento". Se js/motion.js non parte entro 3 s, i contenuti tornano visibili. -->
  <script>
    (function () {
      var d = document.documentElement;
      if (!window.matchMedia || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      d.classList.add('motion');
      setTimeout(function () { if (!window.__motion) d.classList.remove('motion'); }, 3000);
    })();
  </script>

  <!-- Transizione di pagina nativa: l'iscrizione sta qui e non nel CSS esterno, così il browser la
       legge prima del primo disegno anche se i fogli di stile (in @import) arrivano dopo o dalla cache.
       Le animazioni sono in css/page-transitions.css. -->
  <style>@view-transition { navigation: auto; }</style>
  <script>
    // una transizione annullata (es. pagina dalla cache, stato non valido) non è un errore:
    // la navigazione avviene comunque, si evita solo il messaggio in console
    (function () {
      function quiet(e) {
        var vt = e.viewTransition;
        if (!vt) return;
        [vt.ready, vt.finished, vt.updateCallbackDone].forEach(function (p) { if (p) p.catch(function () {}); });
      }
      addEventListener('pageswap', quiet);
      addEventListener('pagereveal', quiet);
    })();
  </script>

  <!-- Font locale (css/fonts.css): precaricato, così parte insieme all'HTML e non dopo il CSS -->
  <link rel="preload" href="assets/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="css/main.css">
</head>
<body class="page" data-page="${p.id}">
${sprite}

${header(p.nav || p.id)}

  <main id="main">
${body(p)}
  </main>

${footer()}

${consent()}

  <script src="js/theme.js"></script>
  <script src="js/consent.js"></script>
  <script src="js/motion.js"></script>
  <script src="js/header.js"></script>
  <script src="js/stats.js"></script>
  <script src="js/marquee.js"></script>
  <script src="js/program.js"></script>
  <script src="js/cases.js"></script>
  <script src="js/lightbox.js"></script>
  <script src="js/discussion.js"></script>
</body>
</html>
`;
}

for (const p of pages) {
  fs.writeFileSync(path.join(__dirname, '..', p.file), page(p));
  console.log('scritto', p.file);
}

/* sitemap.xml e robots.txt: seguono config.indicizzabile. Finché è false il sito chiede di non
   essere indicizzato (anteprima); al lancio, con true, si aprono da soli. */
const oggi = new Date().toISOString().slice(0, 10);
const priorita = { home: '1.0', 'privacy-policy': '0.2', 'cookie-policy': '0.2' };
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${urlDi(p)}</loc>
    <lastmod>${oggi}</lastmod>
    <priority>${priorita[p.id] || '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), sitemap);
const robots = config.indicizzabile
  ? `User-agent: *\nAllow: /\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`
  : `# Anteprima: indicizzazione disattivata (content/config.js → indicizzabile: false)\nUser-agent: *\nDisallow: /\n`;
fs.writeFileSync(path.join(__dirname, '..', 'robots.txt'), robots);
console.log('scritti sitemap.xml e robots.txt (indicizzabile: ' + config.indicizzabile + ')');
