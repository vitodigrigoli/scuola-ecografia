/* Genera content/pages/programma.html leggendo le tabelle del programma da content/contenuti.md
   (sezione "## Programma dettagliato"): una sola fonte per gli orari.
   Uso: node content/build-program.js && node content/build-pages.js */
const fs = require('fs');
const path = require('path');

const md = fs.readFileSync(path.join(__dirname, 'contenuti.md'), 'utf8');
const start = md.indexOf('## Programma dettagliato');
const end = md.indexOf('# RELATORI', start);
const lines = md.slice(start, end).split('\n');

const ic = (n) => `<svg class="icon" aria-hidden="true"><use href="#icon-${n}"/></svg>`;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const photoDir = path.join(__dirname, '..', 'assets', 'img', 'people', 'relatori');
const photo = (name) => { const s = slug(name); const f = fs.readdirSync(photoDir).find(x => x.replace(/\.\w+$/, '') === s); return f ? `assets/img/people/relatori/${f}` : null; };
const initials = (name) => name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
const chip = (p) => {
  const src = photo(p.name);
  const av = src ? `<img class="chip__avatar" src="${src}" alt="" width="48" height="48" loading="lazy">` : `<span class="chip__initials" aria-hidden="true">${initials(p.name)}</span>`;
  return `<a class="chip chip--sm" href="relatori.html#${slug(p.name)}">${av}${esc(p.name)}</a>`;
};
const typeLabel = { lezione: 'Lezione', live: 'Live ecografica', pratica: 'Prove pratiche', casi: 'Casi clinici', pausa: 'Pausa', organizzativo: 'Organizzazione' };

// --- parsing ---
const meetings = [];
let m = null, day = null;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  let x;
  if ((x = l.match(/^### (\d)° Incontro/))) {
    const sub = lines[i + 1].match(/^\*\*(.+?)\*\* — (.+)$/);
    m = { n: +x[1], title: sub[1], dates: sub[2].replace(/\s*–\s*/, '–'), days: [] };
    meetings.push(m); i++; continue;
  }
  if ((x = l.match(/^#### (Sabato|Domenica) – (.+)$/))) {
    day = { name: x[1], date: x[2], sessions: [] };
    m.days.push(day); continue;
  }
  if (/^\| \d/.test(l)) {
    const cells = l.split('|').slice(1, -1).map(c => c.trim());
    const [time, title, type, who, desc] = cells;
    const speakers = who ? who.split(/,\s*(?=[A-ZÀ-Ý])/).map(s => {
      const mm = s.match(/^(.+?)\s*\((.+)\)$/);
      return mm ? { name: mm[1].trim(), role: mm[2].trim() } : { name: s.trim(), role: '' };
    }) : [];
    day.sessions.push({ time, title: title.replace(/^\*\*|\*\*$/g, ''), type, speakers, desc });
  }
}

// --- markup ---
function session(s) {
  const has = !!s.desc;
  const tag = has ? 'details' : 'div';
  const speaker = s.speakers.length
    ? `<p class="program__speaker">${s.speakers.map(p => `${chip(p)}${p.role ? `<span class="program__role">${esc(p.role)}</span>` : ''}`).join('')}</p>`
    : '';
  const aside = s.type === 'pausa' ? '' : `<span class="badge badge--sm program__type">${typeLabel[s.type] || s.type}</span>`;
  const chevron = has ? `<span class="program__chevron" aria-hidden="true">${ic('chevron-down')}</span>` : '';
  return `            <${tag} class="program__session program__session--${s.type}">
              <${has ? 'summary' : 'div'} class="program__summary">
                <span class="program__time">${esc(s.time)}</span>
                <div class="program__main"><p class="program__title">${esc(s.title)}</p>${speaker}</div>
                <span class="program__aside">${aside}${chevron}</span>
              </${has ? 'summary' : 'div'}>${has ? `\n              <p class="program__desc">${esc(s.desc)}</p>` : ''}
            </${tag}>`;
}

const nav = meetings.map((mt, i) => `        <a class="program__nav-link${i === 0 ? ' program__nav-link--active' : ''}" href="#incontro-${mt.n}">${mt.n}° incontro · ${esc(mt.dates.replace(' 2026', ''))}</a>`).join('\n');

const body = meetings.map(mt => `      <article class="program__meeting" id="incontro-${mt.n}">
        <div class="program__meeting-head">
          <p class="program__meeting-number" aria-hidden="true">0${mt.n}</p>
          <h2 class="program__meeting-title">${esc(mt.title)}</h2>
          <p class="program__meeting-meta"><span>${ic('calendar')}${esc(mt.dates)}</span><span>${ic('map-pin')}Il Principe Hotel, Catania</span></p>
        </div>
${mt.days.map(d => `        <div class="program__day">
          <h3 class="program__day-title">${d.name} ${esc(d.date)}</h3>
          <div class="program__sessions">
${d.sessions.map(session).join('\n')}
          </div>
        </div>`).join('\n')}
      </article>`).join('\n\n');

const page = `    <!-- ============================== PAGE HERO (hero --compact --centered) ============================== -->
    <section class="hero hero--compact hero--centered" aria-labelledby="page-title">
      <div class="hero__inner container">
        <div class="hero__content">
          <p class="hero__badge"><span class="hero__badge-dot" aria-hidden="true"></span>Terza edizione · 2026</p>
          <h1 class="hero__title" id="page-title">Quattro incontri, otto giornate, un metodo</h1>
          <p class="hero__subtitle">Ogni argomento segue lo stesso schema: lezione, live ecografica proiettata a schermo e prove pratiche alle postazioni con il tutor. Il terzo e il quarto incontro aggiungono casi clinici e refertazione.</p>
          <ul class="hero__meta">
            <li class="hero__meta-item">${ic('calendar')}4 weekend · sabato e domenica</li>
            <li class="hero__meta-item">${ic('map-pin')}Il Principe Hotel, Catania</li>
            <li class="hero__meta-item">${ic('users')}1 tutor ogni 5 discenti</li>
          </ul>
          <div class="hero__actions">
            <a class="btn btn--secondary" href="https://associazioneanfi.it/programma-scuola-3ed_c/" target="_blank" rel="noopener">${ic('document')}Scarica il programma in PDF</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== PROGRAM ============================== -->
    <section class="section program" id="programma" aria-label="Programma dettagliato">
      <div class="container">
        <nav class="program__nav" aria-label="Incontri">
${nav}
        </nav>

${body}
      </div>
    </section>

    <!-- ============================== INTRO (text-block) ============================== -->
    <section class="section" id="formazione" aria-labelledby="intro-title">
      <div class="container">
        <div class="text-block text-block--split text-block--top text-block--flush">
          <h2 class="text-block__title" id="intro-title">Formazione avanzata in ecografia muscoloscheletrica</h2>
          <div class="text-block__body">
            <p class="text-block__text">La Scuola di Ecografia è rivolta <strong>esclusivamente a medici</strong> e si prefigge l'obiettivo di migliorare la competenza diagnostica e terapeutica promuovendo standard elevati nella gestione delle patologie muscoloscheletriche.</p>
            <p class="text-block__text">Il numero massimo di partecipanti è limitato a <strong>50</strong> per poter garantire un rapporto di <strong>1:5 tra docenti e discenti</strong>, assicurando un ambiente di apprendimento ottimale e focalizzato.</p>
            <div class="text-block__actions">
              <a class="btn btn--primary" href="prenota.html">Prenota il corso ${ic('arrow-right')}</a>
              <a class="btn btn--secondary" href="relatori.html">I relatori ${ic('arrow-right')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

fs.writeFileSync(path.join(__dirname, 'pages', 'programma.html'), page);
console.log('programma.html:', meetings.length, 'incontri,', meetings.reduce((a, mt) => a + mt.days.reduce((b, d) => b + d.sessions.length, 0), 0), 'sessioni');
