/* Genera l'hub dei casi clinici (content/pages/casi-clinici.html) e la pagina di ogni caso
   pubblicato (content/pages/caso-<slug>.html) leggendo:
     - content/casi.md          indice: categorie, slug, titoli, n° immagini, stato
     - content/casi/<slug>.md   il caso: frontmatter + corpo (blocchi di testo dell'articolo)
   Uso: node content/build-casi.js && node content/build-pages.js */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const ic = (n, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#icon-${n}"/></svg>`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
const dataIt = (iso) => { const [y, m, d] = iso.split('-'); return `${+d} ${MESI[+m - 1]} ${y}`; };
// "l'8/l'11 ottobre" ma "il 5 ottobre": otto e undici iniziano per vocale
const ilGiorno = (iso) => `${[8, 11].includes(+iso.split('-')[2]) ? "l'" : 'il '}${dataIt(iso)}`;

/* ------------------------------------------------------------------ indice */
const indice = fs.readFileSync(path.join(DIR, 'casi.md'), 'utf8');
const righe = (blocco, cols) => blocco.split('\n')
  .filter(l => /^\| [a-z]/.test(l) && !/^\| ?-/.test(l))
  .map(l => l.split('|').slice(1, -1).map(c => c.trim()))
  .filter(c => c.length === cols);

const casi = righe(indice.slice(indice.indexOf('| Categoria | Slug'), indice.indexOf('## Etichette')), 6)
  .map(([categoria, slug, titolo, immagini, data, stato]) => ({ categoria, slug, titolo, immagini: +immagini, data, stato }));

const etichette = {};
const titoliSezione = {};
righe(indice.slice(indice.indexOf('## Etichette')), 3).forEach(([cat, label, titolo]) => {
  etichette[cat] = label;
  titoliSezione[cat] = titolo;
});
const categorie = [...new Set(casi.map(c => c.categoria))];

/* ------------------------------------------------- casi pubblicati (file) */
function frontmatter(txt) {
  // YAML minimo: chiavi annidate a 2 spazi, liste "- " e "- { k: v, … }", blocchi "|"
  const m = txt.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('frontmatter mancante');
  const data = {};
  const lines = m[1].split('\n');
  let key = null, mode = null, indent = 0;
  const blocchi = new Set(); // chiavi scritte come blocco "|": vanno unite in una stringa
  const inline = (s) => {
    const o = {};
    s.replace(/^\{|\}$/g, '').split(/,\s*(?=[a-z_]+:)/).forEach(p => {
      const i = p.indexOf(':');
      o[p.slice(0, i).trim()] = p.slice(i + 1).trim().replace(/^["']|["']$/g, '');
    });
    return o;
  };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    // dentro un blocco "|" le righe vuote separano i paragrafi: non vanno scartate
    if (!l.trim()) {
      if (mode === 'block') data[key].push('');
      continue;
    }
    const top = l.match(/^([a-z_]+):\s*(.*)$/);
    if (top) {
      key = top[1];
      const v = top[2];
      if (v === '|') { mode = 'block'; data[key] = []; indent = 0; blocchi.add(key); continue; }
      if (v === '') { mode = 'nested'; data[key] = undefined; continue; }
      mode = null; data[key] = v.replace(/^["']|["']$/g, '');
      continue;
    }
    if (mode === 'block') {
      if (!indent) indent = l.match(/^\s*/)[0].length;
      data[key].push(l.slice(indent));
      continue;
    }
    const item = l.match(/^\s+-\s*(.*)$/);
    if (item) {
      data[key] = Array.isArray(data[key]) ? data[key] : [];
      data[key].push(item[1].startsWith('{') ? inline(item[1]) : item[1].replace(/^["']|["']$/g, ''));
      continue;
    }
    const sub = l.match(/^\s+([a-z_]+):\s*(.*)$/);
    if (sub) {
      if (typeof data[key] !== 'object' || Array.isArray(data[key]) || !data[key]) data[key] = {};
      data[key][sub[1]] = sub[2].replace(/^["']|["']$/g, '');
    }
  }
  // i blocchi "|" sono arrivati come array di righe: diventano una stringa sola
  blocchi.forEach(k => { data[k] = data[k].join('\n').trim(); });
  return { meta: data, corpo: m[2] };
}

/* markdown → prose: ## h2, paragrafi, liste, **bold**, `code` */
function prose(md) {
  const inlineMd = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  const out = [];
  let list = null;
  const closeList = () => { if (list) { out.push(`            <ul class="prose__list">\n${list.join('\n')}\n            </ul>`); list = null; } };
  md.split('\n\n').forEach(block => {
    const b = block.trim();
    if (!b) return;
    if (b.startsWith('## ')) { closeList(); out.push(`            <h2 class="prose__h2">${inlineMd(b.slice(3))}</h2>`); return; }
    if (b.startsWith('### ')) { closeList(); out.push(`            <h3 class="prose__h3">${inlineMd(b.slice(4))}</h3>`); return; }
    if (/^-\s/.test(b)) {
      list = b.split('\n').map(l => `              <li>${inlineMd(l.replace(/^-\s*/, ''))}</li>`);
      closeList();
      return;
    }
    closeList();
    out.push(`            <p class="prose__p">${inlineMd(b.replace(/\n/g, ' '))}</p>`);
  });
  closeList();
  return out.join('\n');
}

const pubblicati = {};
casi.filter(c => c.stato === 'pubblicato').forEach(c => {
  const file = path.join(DIR, 'casi', c.slug + '.md');
  if (!fs.existsSync(file)) throw new Error('caso pubblicato senza file: ' + c.slug);
  pubblicati[c.slug] = frontmatter(fs.readFileSync(file, 'utf8'));
});

/* ---------------------------------------------------------------- markup */
function cardCaso(c) {
  const pub = c.stato === 'pubblicato';
  const tag = pub ? 'a' : 'article';
  const href = pub ? ` href="caso-${c.slug}.html"` : '';
  const cover = `assets/img/casi/cover/${c.categoria}.svg`;
  const soon = pub ? '' : ' case-card--soon';
  return `            <${tag} class="case-card case-card--sm${soon}"${href}>
              <figure class="case-card__media">
                <img src="${cover}" alt="" width="800" height="500" loading="lazy">
                <span class="badge badge--soft badge--sm case-card__badge">${esc(etichette[c.categoria])}</span>
              </figure>
              <div class="case-card__body">
                <h3 class="case-card__title">${esc(c.titolo)}</h3>
                <p class="case-card__meta">
                  <span class="case-card__meta-item">${ic('image')}${c.immagini} immagini</span>
                  <span class="case-card__meta-item">${ic('calendar')}${dataIt(c.data)}</span>
                  ${pub ? '' : '<span class="case-card__meta-item">In preparazione</span>'}
                </p>
              </div>
            </${tag}>`;
}

function sezioneCategoria(cat) {
  const lista = casi.filter(c => c.categoria === cat);
  return `    <!-- ============================== CASI · ${cat.toUpperCase()} ============================== -->
    <section class="section cases" id="${cat}" aria-labelledby="cat-${cat}-title">
      <div class="container">
        <div class="text-block text-block--split text-block--tight">
          <p class="text-block__eyebrow">${lista.length} cas${lista.length === 1 ? 'o' : 'i'}</p>
          <h2 class="text-block__title" id="cat-${cat}-title">${esc(titoliSezione[cat])}</h2>
        </div>
      </div>

      <div class="scroller scroller--manual scroller--desktop-grid">
        <div class="scroller__viewport">
          <div class="scroller__track">
${lista.map(cardCaso).join('\n')}
          </div>
        </div>
      </div>
    </section>`;
}

const hub = `    <!-- ============================== PAGE HERO ============================== -->
    <section class="hero hero--compact hero--centered" aria-labelledby="page-title">
      <div class="hero__inner container">
        <div class="hero__content">
          <p class="hero__badge"><span class="hero__badge-dot" aria-hidden="true"></span>Un caso nuovo ogni mese</p>
          <h1 class="hero__title" id="page-title">Casi clinici</h1>
          <p class="hero__subtitle">Ogni caso parte come lo trovi in ambulatorio: anamnesi, esame obiettivo e le immagini ecografiche. Prova a refertare, poi apri il referto e confronta il tuo ragionamento con quello dell'autore.</p>
          <ul class="hero__meta">
            <li class="hero__meta-item">${ic('image')}5–10 immagini per caso</li>
            <li class="hero__meta-item">${ic('probe')}${categorie.length} distretti</li>
            <li class="hero__meta-item">${ic('users')}Discussione tra colleghi</li>
          </ul>
          <div class="hero__actions">
            <a class="btn btn--primary btn--lg" href="#spalla">Vedi i casi ${ic('arrow-right')}</a>
            <a class="btn btn--secondary btn--lg" href="mailto:info@associazioneanfi.it?subject=Proposta%20di%20caso%20clinico">Proponi un caso ${ic('mail')}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== NAV CATEGORIE ============================== -->
    <div class="cases-nav">
      <div class="container">
        <nav class="cases-nav__list" aria-label="Distretti">
${categorie.map((cat, i) => `          <a class="cases-nav__link${i === 0 ? ' is-active' : ''}" href="#${cat}">${esc(etichette[cat])}<span class="cases-nav__count">${casi.filter(c => c.categoria === cat).length}</span></a>`).join('\n')}
        </nav>
      </div>
    </div>

${categorie.map(sezioneCategoria).join('\n\n')}

    <!-- ============================== CTA ============================== -->
    <section class="section cta-banner cta-banner--glow" id="proponi" aria-labelledby="cta-title">
      <div class="cta-banner__inner container">
        <h2 class="cta-banner__title" id="cta-title">Hai un caso che <em>vale la pena raccontare?</em></h2>
        <p class="cta-banner__text">Anamnesi, esame obiettivo e le tue immagini ecografiche: la redazione della Scuola ti aiuta a trasformarlo in un caso pubblicato.</p>
        <div class="cta-banner__actions">
          <a class="btn btn--primary btn--lg" href="mailto:info@associazioneanfi.it?subject=Proposta%20di%20caso%20clinico">Proponi un caso clinico ${ic('mail')}</a>
        </div>
        <p class="cta-banner__note">Nessun dato identificativo del paziente: la redazione anonimizza ogni caso prima della pubblicazione.</p>
      </div>
    </section>
`;

fs.writeFileSync(path.join(DIR, 'pages', 'casi-clinici.html'), hub);

console.log('casi-clinici.html:', casi.length, 'casi in', categorie.length, 'categorie;',
  Object.keys(pubblicati).length, 'pubblicat' + (Object.keys(pubblicati).length === 1 ? 'o' : 'i'));

module.exports = { casi, etichette, titoliSezione, pubblicati, prose, cardCaso, ic, esc, attr, dataIt, ilGiorno };
