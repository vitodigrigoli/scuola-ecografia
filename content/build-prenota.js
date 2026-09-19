/* Genera content/pages/prenota.html riusando le sezioni Costi ed Edizioni di pages/home.html
   (una sola fonte per prezzi e date). Uso: node content/build-prenota.js && node content/build-pages.js */
const fs = require('fs');
const path = require('path');

const home = fs.readFileSync(path.join(__dirname, 'pages', 'home.html'), 'utf8');
const ic = (n) => `<svg class="icon" aria-hidden="true"><use href="#icon-${n}"/></svg>`;

// estrae una sezione della home dal suo commento-marker fino al prossimo marker
function section(marker) {
  const start = home.indexOf(`    <!-- ============================== ${marker}`);
  if (start < 0) throw new Error('sezione non trovata: ' + marker);
  const next = home.indexOf('    <!-- ==============================', start + 10);
  return home.slice(start, next < 0 ? undefined : next).trimEnd();
}

// Costi: identica alla home (con id diverso per non duplicare l'ancora "costi" usata nei link)
const FISIAFORMA = 'https://fisiaforma.it/prodotto/quinta-edizione-scuola-di-ecografia-muscoloscheletrica-anfi/';
const pricing = section('PRICING')
  .replace('id="costi"', 'id="quote"')
  // qui siamo già su Prenota: le CTA vanno dritte al provider
  .split(`href="prenota.html">Prenota il corso ${ic('arrow-right')}`).join(`href="${FISIAFORMA}" target="_blank" rel="noopener">Pre-iscriviti ${ic('external')}`);

// Edizioni: solo Quinta (aperta) e Quarta (sold out), su due colonne
let editions = section('EDITIONS').replace('class="section editions"', 'class="section editions editions--two"');
editions = editions.replace(/\s*<article class="editions__card editions__card--soldout">\s*<div class="editions__head">\s*<p class="editions__eyebrow">Terza edizione<\/p>[\s\S]*?<\/article>/, '');
editions = editions.replace('<h2 class="text-block__title" id="editions-title">Le prossime edizioni</h2>', '<h2 class="text-block__title" id="editions-title">Edizioni in corso</h2>')
  .replace('<p class="text-block__text">Ogni edizione si sviluppa in quattro weekend. Le edizioni precedenti sono andate sold out: la pre-iscrizione alla quinta è già aperta sul sito del provider.</p>',
    '<p class="text-block__text">La quarta edizione (Catania 2027) è sold out. La pre-iscrizione alla quinta, in una sede del nord Italia, è già disponibile sul sito del provider.</p>');

const page = `    <!-- ============================== PAGE HERO ============================== -->
    <section class="hero hero--compact hero--centered" aria-labelledby="page-title">
      <div class="hero__inner container">
        <div class="hero__content">
          <p class="hero__badge"><span class="hero__badge-dot" aria-hidden="true"></span>Quinta edizione · Pre-iscrizioni aperte</p>
          <h1 class="hero__title" id="page-title">Prenota il tuo posto</h1>
          <p class="hero__subtitle">Cinquanta posti per edizione, riservati ai medici. L'iscrizione si completa sul sito del provider Fisiaforma, con pagamento in due rate.</p>
          <ul class="hero__meta">
            <li class="hero__meta-item">${ic('users')}Massimo 50 partecipanti</li>
            <li class="hero__meta-item">${ic('calendar')}4 weekend</li>
            <li class="hero__meta-item">${ic('check')}Due rate 50% + 50%</li>
          </ul>
          <div class="hero__actions">
            <a class="btn btn--primary btn--lg" href="https://fisiaforma.it/prodotto/quinta-edizione-scuola-di-ecografia-muscoloscheletrica-anfi/" target="_blank" rel="noopener">Pre-iscriviti alla quinta edizione ${ic('external')}</a>
            <a class="btn btn--secondary btn--lg" href="#quote">Vedi le quote</a>
          </div>
        </div>
      </div>
    </section>

${pricing}

    <!-- ============================== COME FUNZIONA (percorso --cards) ============================== -->
    <section class="section percorso percorso--cards" id="come-funziona" aria-labelledby="come-title">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">Iscrizione</p>
          <h2 class="text-block__title" id="come-title">Come funziona l'iscrizione</h2>
          <p class="text-block__text">Tre passaggi: scegli la quota, completa la pre-iscrizione sul provider, versa le due rate secondo le scadenze della scheda d'iscrizione.</p>
        </div>

        <div class="percorso__steps">
          <div class="percorso__step">
            <p class="percorso__number" aria-hidden="true">01</p>
            <h3 class="percorso__title">Scegli la tua quota</h3>
            <ul class="percorso__list">
              <li class="percorso__item">${ic('check')}Non socio ANFI, Socio ANFI o Specializzando socio</li>
              <li class="percorso__item">${ic('check')}Se vuoi diventare socio, fallo prima dell'iscrizione sul sito ANFI</li>
            </ul>
          </div>
          <div class="percorso__step">
            <p class="percorso__number" aria-hidden="true">02</p>
            <h3 class="percorso__title">Pre-iscriviti su Fisiaforma</h3>
            <ul class="percorso__list">
              <li class="percorso__item">${ic('check')}Il provider gestisce iscrizioni e pagamenti</li>
              <li class="percorso__item">${ic('check')}Posti limitati: la pre-iscrizione garantisce la priorità in lista</li>
            </ul>
          </div>
          <div class="percorso__step">
            <p class="percorso__number" aria-hidden="true">03</p>
            <h3 class="percorso__title">Paga in due rate</h3>
            <ul class="percorso__list">
              <li class="percorso__item">${ic('check')}Prima rata (50%) all'iscrizione</li>
              <li class="percorso__item">${ic('check')}Seconda rata (50%) a distanza di 2 mesi dalla prima</li>
            </ul>
          </div>
        </div>

        <div class="percorso__actions">
          <div class="notice notice--muted">
            <span class="notice__icon">${ic('info')}</span>
            <div class="notice__body">
              <p class="notice__title">Politica di recesso</p>
              <p class="notice__text">Rinuncia comunicata per email alla Segreteria entro 3 mesi dall'inizio del corso: rimborso integrale. Entro 2 mesi: rimborso del 50%. Oltre: nessun rimborso. La rinuncia fa decadere la priorità in lista d'attesa. <a href="index.html#faq">Tutte le risposte nelle FAQ</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

${editions}

    <!-- ============================== CTA (cta-banner) ============================== -->
    <section class="section cta-banner cta-banner--glow" id="aggiornamenti" aria-labelledby="cta-title">
      <div class="cta-banner__inner container">
        <h2 class="cta-banner__title" id="cta-title">Non vuoi perdere <em>la prossima edizione?</em></h2>
        <p class="cta-banner__text">Lascia il tuo contatto: ti avvisiamo appena vengono confermate date e sede della quinta edizione.</p>
        <div class="cta-banner__actions">
          <a class="btn btn--primary btn--lg" href="https://145504523.hs-sites-eu1.com/interesse_scuola_anfi5" target="_blank" rel="noopener">Rimani aggiornato ${ic('external')}</a>
          <a class="btn btn--secondary btn--lg" href="mailto:info@associazioneanfi.it">${ic('mail')}Scrivi alla segreteria</a>
        </div>
      </div>
    </section>
`;

fs.writeFileSync(path.join(__dirname, 'pages', 'prenota.html'), page);
console.log('prenota.html generato (pricing ed edizioni riprese dalla home)');
