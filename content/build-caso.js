/* Genera la pagina di ogni caso pubblicato: content/pages/caso-<slug>.html
   Riusa dati e helper di build-casi.js (che genera l'hub).
   Uso: node content/build-caso.js && node content/build-pages.js

   ORDINE DELLA PAGINA (il caso è un esercizio, non un articolo):
     breadcrumb → hero (+ 2 CTA: lascia il referto / vedi la soluzione)
     → il caso (anamnesi ed esame obiettivo) → le immagini
     → LA SOLUZIONE: un unico spoiler che contiene referto E ragionamento
       (se il ragionamento restasse fuori dallo spoiler svelerebbe la diagnosi)
     → autore e fonti → discussione → casi correlati → CTA

   Un caso senza `referto` nel frontmatter è un caso ancora aperto: al posto dello
   spoiler compare l'avviso con la data di pubblicazione della soluzione e il bottone
   nell'hero è disattivato. */
const fs = require('fs');
const path = require('path');
const { casi, etichette, pubblicati, prose, cardCaso, ic, esc, attr, dataIt } = require('./build-casi.js');

const DIR = __dirname;
const SOGLIA_GRIGLIA = 6;      // oltre questa soglia le immagini si vedono solo nel lightbox
const GIORNI_SOLUZIONE = 30;   // quando manca `soluzione_dal`: soluzione a 30 giorni dalla pubblicazione
const FORM_REFERTO = 'https://forms.gle/EwwnQbRFmznda1fW9';

/* Blocco markdown del frontmatter → uno o più paragrafi HTML (**grassetto** incluso).
   `etichetta` compare solo sul primo paragrafo (es. "Anamnesi."). */
function paragrafi(txt, apri, chiudi, etichetta = '') {
  if (!txt) return '';
  return String(txt).trim().split(/\n{2,}/).map((p, i) => {
    const testo = esc(p.replace(/\s*\n\s*/g, ' ')).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    const label = i === 0 && etichetta ? `<strong class="text-block__label">${etichetta}</strong> ` : '';
    return apri + label + testo + chiudi;
  }).join('\n');
}

function traGiorni(iso) {
  const d = new Date(iso + 'T00:00:00');
  const oggi = new Date();
  return Math.ceil((d - oggi) / 86400000);
}

/* Discussione: MOCKUP per la preview — testi d'esempio, nessun backend.
   Il motore reale (Giscus / Supabase / servizio) va scelto col cliente. */
const COMMENTI = [
  {
    nome: 'Dott. Riccardo Prezioso', foto: 'riccardo-prezioso.png', data: '12 luglio 2026',
    testo: 'Formazione iperecogena del sovraspinoso con cono d’ombra sfumato e falda in borsa: nel mio referto l’ho descritta come calcificazione in riassorbimento. Il confronto con la controlaterale aiuta molto a pesare la borsite.',
  },
  {
    nome: 'Dott.ssa Francesca Serpi', foto: 'francesca-serpi.png', data: '12 luglio 2026',
    testo: 'Concordo. Segnalo solo che il cono d’ombra incompleto va cercato in almeno due piani prima di definirla “molle”: su un solo piano si rischia di sovrastimare il riassorbimento.',
  },
  {
    nome: 'Dott. Nicolò Vitale', foto: 'nicolo-vitale.png', data: '13 luglio 2026', autore: true,
    testo: 'Esatto, e infatti le prime due scansioni pubblicate sono lo stesso deposito in asse corto e in asse lungo. È la coppia che uso sempre per decidere se proporre il needling.',
  },
];

function paginaCaso(c) {
  const { meta, corpo } = pubblicati[c.slug];
  const dir = `assets/img/casi/${c.categoria}-${meta.numero}/`;
  const imgs = meta.immagini;
  const autore = meta.autore || {};
  const paz = meta.paziente || {};
  const cat = etichette[c.categoria];

  const referto = (meta.referto || '').trim();
  const haSoluzione = !!referto;
  const dataSoluzione = meta.soluzione_dal
    || new Date(new Date(meta.data + 'T00:00:00').getTime() + GIORNI_SOLUZIONE * 86400000).toISOString().slice(0, 10);
  const giorniMancanti = haSoluzione ? 0 : traGiorni(dataSoluzione);

  const galleryItems = imgs.map((im, i) => `          <button class="gallery__item" type="button"${i >= SOGLIA_GRIGLIA ? ' hidden' : ''} aria-label="Ingrandisci: ${attr(im.didascalia)}">
            <figure class="gallery__media">
              <img src="${dir}${im.file}" alt="${attr(im.didascalia)}" width="800" height="600" loading="${i < 3 ? 'eager' : 'lazy'}">
            </figure>
            <figcaption class="gallery__caption"><span class="gallery__index">${String(i + 1).padStart(2, '0')}</span>${esc(im.didascalia)}</figcaption>
          </button>`).join('\n');

  const fonti = (meta.fonti || []).map(f =>
    `            <li class="references__item"><a class="references__link" href="${attr(f.url)}" target="_blank" rel="noopener">${esc(f.testo)} ${ic('external')}</a></li>`).join('\n');

  const correlati = (meta.correlati || [])
    .map(slug => casi.find(x => x.slug === slug))
    .filter(Boolean)
    .map(x => cardCaso(x).replace('case-card case-card--sm', 'case-card'))
    .join('\n');

  const commenti = COMMENTI.map(k => `          <article class="discussion__item${k.autore ? ' discussion__item--author' : ''}">
            <div class="discussion__meta">
              <span class="chip chip--sm"><img class="chip__avatar" src="assets/img/people/relatori/${k.foto}" alt="" width="48" height="48" loading="lazy">${esc(k.nome)}</span>
              ${k.autore ? '<span class="badge badge--soft badge--sm">Autore del caso</span>' : ''}
              <span class="discussion__date">${k.data}</span>
            </div>
            <p class="discussion__text">${esc(k.testo)}</p>
          </article>`).join('\n');

  // --- CTA dell'hero: sempre "lascia il referto", la soluzione solo se c'è ---
  const ctaSoluzione = haSoluzione
    ? `            <a class="btn btn--secondary btn--lg" href="#soluzione">${ic('eye')}Vedi la soluzione</a>`
    : `            <span class="btn btn--secondary btn--lg is-disabled" aria-disabled="true" title="La soluzione viene pubblicata dopo la chiusura dei referti">${ic('clock')}Soluzione dal ${dataIt(dataSoluzione)}</span>`;

  // --- Soluzione: referto + ragionamento in un unico spoiler ---
  const soluzione = haSoluzione
    ? `        <details class="reveal" id="referto">
          <summary class="reveal__summary">
            <span class="reveal__label">${ic('eye')}Mostra il referto e il ragionamento</span>
            <span class="reveal__hint">Apri solo dopo aver scritto il tuo</span>
          </summary>
          <div class="reveal__body">
            <div class="prose prose--narrow">
              <p class="prose__eyebrow">Referto dell'autore</p>
${paragrafi(referto, '              <p class="prose__p">', '</p>')}
            </div>
${corpo.trim() ? `            <div class="prose">
${prose(corpo)}
            </div>` : ''}
          </div>
        </details>`
    : `        <div class="notice notice--accent">
          <span class="notice__icon">${ic('clock')}</span>
          <div class="notice__body">
            <p class="notice__title">Soluzione in arrivo il ${dataIt(dataSoluzione)}</p>
            <p class="notice__text">Il caso è aperto${giorniMancanti > 0 ? ` ancora per ${giorniMancanti} giorn${giorniMancanti === 1 ? 'o' : 'i'}` : ''}: scrivi il tuo referto e lo confronterai con quello dell'autore, pubblicato qui insieme al ragionamento diagnostico.</p>
          </div>
        </div>

        <div class="gallery__actions">
          <a class="btn btn--primary btn--lg" href="${FORM_REFERTO}" target="_blank" rel="noopener">${ic('message')}Lascia il tuo referto</a>
        </div>`;

  return `    <!-- ============================== BREADCRUMB ============================== -->
    <nav class="breadcrumb" aria-label="Percorso">
      <div class="container">
        <ol class="breadcrumb__list">
          <li class="breadcrumb__item"><a class="breadcrumb__link" href="index.html">Home</a></li>
          <li class="breadcrumb__item"><a class="breadcrumb__link" href="casi-clinici.html">Casi clinici</a></li>
          <li class="breadcrumb__item"><a class="breadcrumb__link" href="casi-clinici.html#${c.categoria}">${esc(cat)}</a></li>
          <li class="breadcrumb__item"><span class="breadcrumb__current" aria-current="page">Caso ${meta.numero}</span></li>
        </ol>
      </div>
    </nav>

    <!-- ============================== HERO ============================== -->
    <section class="hero hero--compact" aria-labelledby="caso-title">
      <div class="hero__inner container">
        <div class="hero__content">
          <p class="hero__badge"><span class="hero__badge-dot" aria-hidden="true"></span>Caso ${meta.numero} · ${esc(cat)}${haSoluzione ? '' : ' · Aperto'}</p>
          <h1 class="hero__title" id="caso-title">${esc(meta.titolo)}</h1>
          <p class="hero__subtitle">${esc(meta.sottotitolo)}</p>

          <div class="hero__actions">
            <a class="btn btn--primary btn--lg" href="${FORM_REFERTO}" target="_blank" rel="noopener">${ic('message')}Lascia il tuo referto</a>
${ctaSoluzione}
          </div>

          <ul class="hero__meta">
            <li class="hero__meta-item">${ic('users')}${esc(paz.sesso)}, ${esc(paz.eta)}</li>
            <li class="hero__meta-item">${ic('probe')}${esc(paz.distretto)}</li>
            <li class="hero__meta-item">${ic('image')}${imgs.length} immagini</li>
            <li class="hero__meta-item">${ic('calendar')}${dataIt(meta.data)}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============================== IL CASO ============================== -->
    <section class="section" id="presentazione" aria-labelledby="pres-title">
      <div class="container">
        <div class="text-block text-block--split text-block--top text-block--sticky text-block--flush">
          <div class="text-block__head">
            <p class="text-block__eyebrow">Il caso</p>
            <h2 class="text-block__title" id="pres-title">Anamnesi ed esame obiettivo</h2>
          </div>
          <div class="text-block__body">
${paragrafi(meta.anamnesi, '            <p class="text-block__text">', '</p>', 'Anamnesi.')}
${paragrafi(meta.esame_obiettivo, '            <p class="text-block__text">', '</p>', 'Esame obiettivo.')}
            <ul class="text-block__facts">
${(meta.facts || []).map(f => `              <li class="text-block__fact">${ic(f.icona)}${esc(f.testo)}</li>`).join('\n')}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== IMMAGINI ============================== -->
    <section class="section gallery" id="immagini" aria-labelledby="img-title" data-lightbox-title="Caso ${meta.numero} · ${attr(meta.titolo)}">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">Immagini</p>
          <h2 class="text-block__title" id="img-title">Le ${imgs.length} scansioni del caso</h2>
          <p class="text-block__text">Clicca un'immagine per vederla a schermo pieno e scorrere tutte le scansioni con le relative didascalie.</p>
        </div>

        <div class="gallery__grid">
${galleryItems}
        </div>

        <div class="gallery__actions">
          <button class="btn btn--secondary" type="button" data-lightbox-open="0">${ic('expand')}Vedi tutte le ${imgs.length} immagini</button>
        </div>
      </div>
    </section>

    <!-- ============================== LA SOLUZIONE ============================== -->
    <section class="section" id="soluzione" aria-labelledby="sol-title">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">La soluzione</p>
          <h2 class="text-block__title" id="sol-title">${haSoluzione ? 'Prova a refertare, poi confronta' : 'Il caso è ancora aperto'}</h2>
          <p class="text-block__text">${haSoluzione
            ? 'Scrivi il tuo referto prima di aprire quello dell\'autore: referto e ragionamento diagnostico sono qui sotto, coperti apposta.'
            : 'I referti dei partecipanti sono in raccolta. Alla chiusura pubblichiamo qui il referto dell\'autore e il ragionamento diagnostico.'}</p>
        </div>

${soluzione}
      </div>
    </section>

    <!-- ============================== AUTORE + FONTI ============================== -->
    <section class="section" id="autore" aria-label="Autore e riferimenti">
      <div class="container">
        <div class="author">
          <figure class="author__photo"><img src="assets/img/people/relatori/nicolo-vitale.png" alt="${attr(autore.nome)}" width="500" height="500" loading="lazy"></figure>
          <div class="author__body">
            <p class="author__eyebrow">Il caso è firmato da</p>
            <p class="author__name">${esc(autore.nome)}</p>
            <p class="author__role">${esc(autore.ruolo)}</p>
            <p class="author__affiliation">${esc(autore.affiliazione)}</p>
            <a class="author__link" href="${attr(autore.scheda)}">Vedi la scheda e le sue relazioni ${ic('arrow-right')}</a>
          </div>
        </div>
${fonti ? `
        <div class="references">
          <p class="references__title">${ic('quote')}Fonti e riferimenti</p>
          <ol class="references__list">
${fonti}
          </ol>
        </div>` : ''}
      </div>
    </section>

    <!-- ============================== DISCUSSIONE (mockup) ============================== -->
    <section class="section discussion" id="discussione" aria-labelledby="disc-title">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">Discussione</p>
          <h2 class="text-block__title" id="disc-title">Il referto dei colleghi</h2>
          <p class="text-block__text">Ogni caso è aperto al confronto: pubblica il tuo referto e leggi quello degli altri partecipanti.</p>
        </div>

        <div class="discussion__head">
          <p class="discussion__count">${ic('message')}${haSoluzione ? COMMENTI.length + ' referti pubblicati' : 'Referti in raccolta'}</p>
          <a class="btn btn--primary" href="${FORM_REFERTO}" target="_blank" rel="noopener">Lascia il tuo referto ${ic('external')}</a>
        </div>
${haSoluzione ? `
        <div class="discussion__list">
${commenti}
        </div>
` : ''}
        <div class="notice notice--muted">
          <span class="notice__icon">${ic('info')}</span>
          <div class="notice__body">
            <p class="notice__title">Come funziona la discussione</p>
            <p class="notice__text">${haSoluzione
              ? 'I referti sono moderati dalla redazione prima della pubblicazione e non devono contenere dati identificativi dei pazienti. <strong>In questa preview i tre interventi sono d\'esempio</strong>: il sistema di pubblicazione dei commenti è ancora da attivare.'
              : 'I referti dei partecipanti vengono pubblicati insieme alla soluzione, dopo la moderazione della redazione. <strong>In questa preview il sistema di pubblicazione dei commenti è ancora da attivare.</strong>'}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== CORRELATI ============================== -->
    <section class="section cases cases--grid" id="correlati" aria-labelledby="corr-title">
      <div class="container">
        <div class="text-block text-block--split text-block--tight">
          <p class="text-block__eyebrow">Continua</p>
          <h2 class="text-block__title" id="corr-title">Altri casi di ${esc(cat.toLowerCase())}</h2>
        </div>
        <div class="cases__grid">
${correlati}
        </div>
      </div>
    </section>

    <!-- ============================== CTA ============================== -->
    <section class="section cta-banner cta-banner--glow" aria-labelledby="cta-caso-title">
      <div class="cta-banner__inner container">
        <h2 class="cta-banner__title" id="cta-caso-title">Hai un caso che <em>vale la pena raccontare?</em></h2>
        <p class="cta-banner__text">Anamnesi, esame obiettivo e le tue immagini ecografiche: la redazione della Scuola ti aiuta a trasformarlo in un caso pubblicato.</p>
        <div class="cta-banner__actions">
          <a class="btn btn--primary btn--lg" href="mailto:info@associazioneanfi.it?subject=Proposta%20di%20caso%20clinico">Proponi un caso clinico ${ic('mail')}</a>
          <a class="btn btn--secondary btn--lg" href="casi-clinici.html">Tutti i casi ${ic('arrow-right')}</a>
        </div>
      </div>
    </section>
`;
}

const pagine = casi.filter(c => c.stato === 'pubblicato').map(c => {
  fs.writeFileSync(path.join(DIR, 'pages', 'caso-' + c.slug + '.html'), paginaCaso(c));
  return {
    file: 'caso-' + c.slug + '.html',
    id: 'caso-' + c.slug,
    title: pubblicati[c.slug].meta.titolo + ' — Casi clinici · Scuola di Ecografia Muscoloscheletrica ANFI',
  };
});

fs.writeFileSync(path.join(DIR, 'casi-pagine.json'), JSON.stringify(pagine, null, 2) + '\n');
console.log('pagine caso:', pagine.map(p => p.file).join(', ') || 'nessuna');
