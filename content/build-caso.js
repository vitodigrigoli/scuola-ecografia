/* Genera la pagina di ogni caso pubblicato: content/pages/caso-<slug>.html
   Riusa dati e helper di build-casi.js (che genera l'hub).
   Uso: node content/build-caso.js && node content/build-pages.js */
const fs = require('fs');
const path = require('path');
const { casi, etichette, pubblicati, prose, cardCaso, ic, esc, attr, dataIt } = require('./build-casi.js');

const DIR = __dirname;
const SOGLIA_GRIGLIA = 6; // oltre questa soglia le immagini si vedono solo nel lightbox

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

/* Discussione: MOCKUP per la preview — testi d'esempio, nessun backend.
   Il motore reale (Giscus / Supabase / servizio) va scelto col cliente. */
const COMMENTI = [
  {
    nome: 'Dott. Riccardo Prezioso', foto: 'riccardo-prezioso.png', data: '12 settembre 2026',
    testo: 'Cuffia integra e capsula inferiore ispessita: l’ho refertata come capsulite. Aggiungo che nel mio protocollo misuro sempre anche in extrarotazione, la differenza con il controlaterale diventa ancora più evidente.',
  },
  {
    nome: 'Dott.ssa Francesca Serpi', foto: 'francesca-serpi.png', data: '12 settembre 2026',
    testo: 'Concordo sulla capsulite. Terrei però in diagnosi differenziale una borsite subacromiale iniziale: nelle immagini pubblicate lo spazio subacromiale non è documentato in dinamica.',
  },
  {
    nome: 'Dott. Nicolò Vitale', foto: 'nicolo-vitale.png', data: '13 settembre 2026', autore: true,
    testo: 'Osservazione corretta: in dinamica non c’era conflitto e la borsa era regolare, per questo la scansione non è tra quelle pubblicate. La aggiungo al prossimo aggiornamento del caso.',
  },
];

function paginaCaso(c) {
  const { meta, corpo } = pubblicati[c.slug];
  const dir = `assets/img/casi/${c.categoria === 'spalla' ? 'spalla' : c.categoria}-${meta.numero}/`;
  const imgs = meta.immagini;
  const autore = meta.autore || {};
  const paz = meta.paziente || {};
  const cat = etichette[c.categoria];

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

  const referto = (meta.referto || '').trim();

  // anamnesi, esame obiettivo e pill vengono dal frontmatter: nessun dato clinico nel generatore
  const pres = [
    paragrafi(meta.anamnesi, '            <p class="text-block__text">', '</p>', 'Anamnesi.'),
    paragrafi(meta.esame_obiettivo, '            <p class="text-block__text">', '</p>', 'Esame obiettivo.'),
  ].filter(Boolean).join('\n');
  const facts = (meta.facts || []).map(f => `              <li class="text-block__fact">${ic(f.icona)}${esc(f.testo)}</li>`).join('\n');

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
          <p class="hero__badge"><span class="hero__badge-dot" aria-hidden="true"></span>Caso ${meta.numero} · ${esc(cat)}</p>
          <h1 class="hero__title" id="caso-title">${esc(meta.titolo)}</h1>
          <p class="hero__subtitle">${esc(meta.sottotitolo)}</p>
          <ul class="hero__meta">
            <li class="hero__meta-item">${ic('users')}${esc(paz.sesso)}, ${esc(paz.eta)}</li>
            <li class="hero__meta-item">${ic('probe')}${esc(paz.distretto)}</li>
            <li class="hero__meta-item">${ic('image')}${imgs.length} immagini</li>
            <li class="hero__meta-item">${ic('calendar')}${dataIt(meta.data)}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============================== PRESENTAZIONE ============================== -->
    <section class="section" id="presentazione" aria-labelledby="pres-title">
      <div class="container">
        <div class="text-block text-block--split text-block--top text-block--sticky text-block--flush">
          <div class="text-block__head">
            <p class="text-block__eyebrow">Il caso</p>
            <h2 class="text-block__title" id="pres-title">Anamnesi ed esame obiettivo</h2>
          </div>
          <div class="text-block__body">
${pres}
            <ul class="text-block__facts">
${facts}
            </ul>
            <div class="notice notice--warning">
              <span class="notice__icon">${ic('info')}</span>
              <div class="notice__body">
                <p class="notice__text">Anamnesi ed esame obiettivo sono una <strong>proposta per la preview</strong>, coerente col referto ma non reale: quelli originali arrivano dalla redazione. Il referto, invece, è quello autentico del caso.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== GALLERIA ============================== -->
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
          <button class="btn btn--primary" type="button" data-lightbox-open="0">${ic('expand')}Vedi tutte le ${imgs.length} immagini</button>
        </div>
      </div>
    </section>

    <!-- ============================== REFERTO (spoiler) ============================== -->
    <section class="section" id="referto" aria-labelledby="referto-title">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">Referto</p>
          <h2 class="text-block__title" id="referto-title">Prova a refertare, poi confronta</h2>
          <p class="text-block__text">Scrivi il tuo referto prima di aprire quello dell'autore: è il modo in cui questo caso è stato pensato.</p>
        </div>

        <details class="reveal">
          <summary class="reveal__summary">
            <span class="reveal__label">${ic('eye')}Mostra il referto dell'autore</span>
            <span class="reveal__hint">Apri solo dopo aver scritto il tuo</span>
          </summary>
          <div class="reveal__body">
            <div class="prose prose--narrow">
${paragrafi(referto, '              <p class="prose__p">', '</p>')}
            </div>
          </div>
        </details>
      </div>
    </section>

    <!-- ============================== CORPO ============================== -->
    <section class="section" id="ragionamento" aria-labelledby="corpo-title">
      <div class="container">
        <div class="text-block text-block--split text-block--top text-block--sticky text-block--flush">
          <div class="text-block__head">
            <p class="text-block__eyebrow">Il ragionamento</p>
            <h2 class="text-block__title" id="corpo-title">Come si arriva alla diagnosi</h2>
          </div>
          <div class="prose prose--lead">
${prose(corpo)}
          </div>
        </div>
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

        <div class="references">
          <p class="references__title">${ic('quote')}Fonti e riferimenti</p>
          <ol class="references__list">
${fonti}
          </ol>
        </div>
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
          <p class="discussion__count">${ic('message')}${COMMENTI.length} referti pubblicati</p>
          <a class="btn btn--primary" href="https://forms.gle/EwwnQbRFmznda1fW9" target="_blank" rel="noopener">Scrivi il tuo referto ${ic('external')}</a>
        </div>

        <div class="discussion__list">
${commenti}
        </div>

        <div class="notice notice--muted">
          <span class="notice__icon">${ic('info')}</span>
          <div class="notice__body">
            <p class="notice__title">Come funziona la discussione</p>
            <p class="notice__text">I referti sono moderati dalla redazione prima della pubblicazione e non devono contenere dati identificativi dei pazienti. <strong>In questa preview i tre interventi sono d'esempio</strong>: il sistema di pubblicazione dei commenti è ancora da attivare.</p>
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
