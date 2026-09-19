/* Genera content/pages/relatori.html leggendo Docenti, Tutor e Comitati da content/contenuti.md
   (sezione "# RELATORI"). Uso: node content/build-relatori.js && node content/build-pages.js */
const fs = require('fs');
const path = require('path');

const md = fs.readFileSync(path.join(__dirname, 'contenuti.md'), 'utf8');
const sec = md.slice(md.indexOf('# RELATORI'), md.indexOf('# PRENOTA'));

const ic = (n) => `<svg class="icon" aria-hidden="true"><use href="#icon-${n}"/></svg>`;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const photoDir = path.join(__dirname, '..', 'assets', 'img', 'people', 'relatori');
const photo = (name) => { const s = slug(name); const f = fs.readdirSync(photoDir).find(x => x.replace(/\.\w+$/, '') === s); return f ? `assets/img/people/relatori/${f}` : null; };
const initials = (name) => name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();

// --- Docenti ---
const docBlock = sec.slice(sec.indexOf('## Docenti'), sec.indexOf('## Tutor'));
const docenti = [];
docBlock.split(/\n(?=### )/).slice(1).forEach(b => {
  const lines = b.split('\n');
  const name = lines[0].replace(/^### /, '').replace(/\s*\*\(.*\)\*\s*$/, '').trim();
  const tags = (b.match(/\*\*Tag:\*\* (.+)/) || [])[1]?.split(' · ') || [];
  const aff = (b.match(/\*\*Affiliazione:\*\* (.+)/) || [])[1] || '';
  let rel = [];
  const relInline = b.match(/\*\*Relazioni:\*\* (.+)/);
  if (relInline) rel = [relInline[1]];
  else rel = lines.filter(l => /^  - /.test(l)).map(l => l.replace(/^  - /, ''));
  docenti.push({ name, tags, aff, rel });
});

// --- Tutor ---
const tutBlock = sec.slice(sec.indexOf('## Tutor'), sec.indexOf('## Comitato'));
const tutor = tutBlock.split('\n').filter(l => /^\| [A-ZÀ-Ý]/.test(l) && !/^\| Nome/.test(l)).map(l => {
  const [name, tags, aff] = l.split('|').slice(1, -1).map(c => c.trim());
  return { name, tags: tags.split(' · '), aff: aff.replace(/\*\(non indicata\)\*/, '') };
});

// --- Comitati ---
const comBlock = sec.slice(sec.indexOf('## Comitato'));
const grab = (label) => (comBlock.match(new RegExp(`\\*\\*${label}:\\*\\* (.+)`)) || [])[1].split(' · ');
const direttore = grab('Direttore della Scuola');
const organizzativo = grab('Comitato Organizzativo');
const scientifico = grab('Comitato Scientifico');

// --- markup ---
const QUALIFICHE = ['Fisiatra', 'Radiologo', 'Reumatologo', 'Nefrologa', 'Medico dello sport'];
const tagHtml = (tags, skip) => tags.filter(t => t !== skip).map(t => `<span class="badge badge--sm ${QUALIFICHE.includes(t) ? 'badge--soft' : 'badge--outline'}">${esc(t)}</span>`).join('');

function card(p, { compact = false, skipTag } = {}) {
  const src = photo(p.name);
  const img = src
    ? `<img src="${src}" alt="${esc(p.name)}" width="500" height="500" loading="lazy">`
    : `<span class="people__initials" aria-hidden="true">${initials(p.name)}</span>`;
  const rel = !compact && p.rel.length
    ? `\n              <ul class="people__list">${p.rel.map(r => `\n                <li class="people__item">${ic('probe')}${esc(r)}</li>`).join('')}\n              </ul>`
    : '';
  return `          <article class="people__card" id="${slug(p.name)}">
            <figure class="people__photo">${img}</figure>
            <div class="people__body">
              <h3 class="people__name">${esc(p.name)}</h3>
              <div class="people__tags">${tagHtml(p.tags, skipTag)}</div>${p.aff ? `\n              <p class="people__text">${esc(p.aff)}</p>` : ''}${rel}
            </div>
          </article>`;
}

// chip con mini-ritratto (senza link: la scheda si trova sopra nella stessa pagina)
const chip = (n) => {
  const src = photo(n);
  const av = src
    ? `<img class="chip__avatar" src="${src}" alt="" width="64" height="64" loading="lazy">`
    : `<span class="chip__initials" aria-hidden="true">${initials(n)}</span>`;
  return `<span class="chip">${av}${esc(n)}</span>`;
};
const row = (label, names) => `        <div class="roster__row">
          <p class="roster__label">${label}${names.length > 1 ? ` <span class="roster__count">${names.length}</span>` : ''}</p>
          <div class="roster__list">${names.map(chip).join('')}</div>
        </div>`;

const page = `    <!-- ============================== PAGE HERO ============================== -->
    <section class="hero hero--compact hero--centered" aria-labelledby="page-title">
      <div class="hero__inner container">
        <div class="hero__content">
          <p class="hero__badge"><span class="hero__badge-dot" aria-hidden="true"></span>Terza edizione · 2026</p>
          <h1 class="hero__title" id="page-title">Chi insegna alla Scuola</h1>
          <p class="hero__subtitle">Fisiatri, radiologi, reumatologi e medici dello sport che usano l'ecografia nella pratica clinica quotidiana. Ogni docente è anche tutor alle postazioni.</p>
          <ul class="hero__meta">
            <li class="hero__meta-item">${ic('users')}${docenti.length} docenti</li>
            <li class="hero__meta-item">${ic('probe')}${tutor.length} tutor</li>
            <li class="hero__meta-item">${ic('award')}1 tutor ogni 5 discenti</li>
          </ul>
          <div class="hero__actions">
            <a class="btn btn--secondary" href="#docenti">Docenti</a>
            <a class="btn btn--secondary" href="#tutor">Tutor</a>
            <a class="btn btn--secondary" href="#comitati">Comitati</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== DOCENTI (people) ============================== -->
    <section class="section people people--cols-3 people--square people--masonry" id="docenti" aria-labelledby="docenti-title">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">Docenti</p>
          <h2 class="text-block__title" id="docenti-title">I relatori della terza edizione</h2>
          <p class="text-block__text">Per ogni docente trovi l'affiliazione e le relazioni che tiene durante i quattro incontri.</p>
        </div>
        <div class="people__grid">
${docenti.map(p => card(p, { skipTag: 'Docente' })).join('\n')}
        </div>
      </div>
    </section>

    <!-- ============================== TUTOR (people --compact) ============================== -->
    <section class="section people people--compact people--square" id="tutor" aria-labelledby="tutor-title">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">Tutor</p>
          <h2 class="text-block__title" id="tutor-title">Alle postazioni con te</h2>
          <p class="text-block__text">I tutor seguono i gruppi durante le prove pratiche: un tutor ogni cinque partecipanti, per tutta la durata della Scuola.</p>
        </div>
        <div class="people__grid">
${tutor.map(p => card({ ...p, rel: [], aff: '' }, { compact: true, skipTag: 'Tutor' })).join('\n')}
        </div>
      </div>
    </section>

    <!-- ============================== COMITATI (roster) ============================== -->
    <section class="section roster" id="comitati" aria-labelledby="comitati-title">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">Organizzazione</p>
          <h2 class="text-block__title" id="comitati-title">Direzione e comitati</h2>
          <p class="text-block__text">Chi dirige la Scuola, chi la organizza e chi ne garantisce il rigore scientifico.</p>
        </div>
${row('Direttore della Scuola', direttore)}
${row('Comitato organizzativo', organizzativo)}
${row('Comitato scientifico', scientifico)}
      </div>
    </section>
`;

fs.writeFileSync(path.join(__dirname, 'pages', 'relatori.html'), page);
console.log('relatori.html:', docenti.length, 'docenti,', tutor.length, 'tutor; foto mancanti:', [...docenti, ...tutor].filter(p => !photo(p.name)).map(p => p.name).join(', ') || 'nessuna');
