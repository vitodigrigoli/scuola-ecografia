/* Genera le 4 pagine con lo stesso shell (header/footer). Uso: node content/build-pages.js
   - shell (head, header, script) definito qui
   - contenuto di ogni pagina in content/pages/<id>.html (i blocchi vengono aggiunti uno alla volta)
   Finché non c'è un build step vero, questo evita di tenere 4 copie dell'header a mano. */
const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'index.html',     id: 'home',      title: 'Scuola di Ecografia Muscoloscheletrica ANFI', h1: 'Home' },
  { file: 'programma.html', id: 'programma', title: 'Programma — Scuola di Ecografia Muscoloscheletrica ANFI', h1: 'Programma' },
  { file: 'relatori.html',  id: 'relatori',  title: 'Relatori — Scuola di Ecografia Muscoloscheletrica ANFI', h1: 'Relatori' },
  { file: 'prenota.html',   id: 'prenota',   title: 'Prenota — Scuola di Ecografia Muscoloscheletrica ANFI', h1: 'Prenota' },
];

const links = [
  { id: 'programma', href: 'programma.html', label: 'Programma' },
  { id: 'relatori',  href: 'relatori.html',  label: 'Relatori' },
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

function body(p) {
  const partial = path.join(__dirname, 'pages', p.id + '.html');
  if (fs.existsSync(partial)) return fs.readFileSync(partial, 'utf8').trimEnd();
  return `    <!-- I blocchi di pagina verranno aggiunti uno alla volta in content/pages/${p.id}.html -->
    <section class="section">
      <div class="container">
        <p class="label" style="color: var(--accent)">In costruzione</p>
        <h1 class="h1" style="margin-top: var(--space-3)">${p.h1}</h1>
        <p class="body-lg" style="color: var(--ink-dim); margin-top: var(--space-4); max-width: 60ch">I contenuti di questa pagina sono raccolti in <code>content/contenuti.md</code> e verranno impaginati blocco per blocco.</p>
      </div>
    </section>`;
}

function page(p) {
  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${p.title}</title>
  <meta name="description" content="La Scuola di Ecografia Muscoloscheletrica fatta da medici per i medici. Formazione avanzata ANFI: 4 weekend, rapporto tutor-discente 1:5, esame finale.">
  <meta name="robots" content="noindex">
  <link rel="icon" href="data:,">

  <!-- Tema: applicato prima del paint per evitare il flash (default dark) -->
  <script>
    (function () {
      try {
        if (localStorage.getItem('theme') === 'light') document.documentElement.setAttribute('data-theme', 'light');
      } catch (e) {}
    })();
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/main.css">
</head>
<body data-page="${p.id}">
${sprite}

${header(p.id)}

  <main id="main">
${body(p)}
  </main>

  <script src="js/theme.js"></script>
  <script src="js/header.js"></script>
  <script src="js/stats.js"></script>
</body>
</html>
`;
}

for (const p of pages) {
  fs.writeFileSync(path.join(__dirname, '..', p.file), page(p));
  console.log('scritto', p.file);
}
