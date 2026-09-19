# Scuola di Ecografia Muscoloscheletrica — sito

Rifacimento delle pagine della Scuola di Ecografia ANFI (`associazioneanfi.it/scuola/…`) come sito statico, con look & feel di riferimento **Learnn** (dark, accent viola, card con bordi).

**Preview:** https://vitodigrigoli.github.io/scuola-ecografia/

## Struttura

```
index.html · programma.html · relatori.html · prenota.html
css/
  tokens.css        variabili globali (colori per tema, tipografia, spazi, raggi) — fonte: design-reference/tokens.json
  base.css          reset, scala tipografica, .container / .section, .icon
  main.css          entry point: importa tokens, base e un file per blocco
  blocks/           un file CSS per blocco BEM (header.css, hero.css, …)
js/
  theme.js          toggle giorno/notte (default dark, persistenza localStorage)
  header.js         menu mobile + stato scrolled
  stats.js          contatori animati
  marquee.js        scorrimento continuo per [data-marquee] (Organizzatori, Sponsor mobile)
  program.js        nav del programma: evidenzia l'incontro visibile
assets/
  logo/             wordmark
  icons/sprite.svg  set icone SVG (niente emoji, niente PNG)
content/
  contenuti.md      TUTTI i testi delle pagine ANFI, già organizzati per blocco
  build-pages.js    genera le 4 pagine dallo stesso shell (node content/build-pages.js)
  build-program.js  genera pages/programma.html dalle tabelle di contenuti.md (poi build-pages)
  build-relatori.js genera pages/relatori.html da docenti/tutor/comitati di contenuti.md (poi build-pages)
design-reference/   design system Cowork originale (token, README dei componenti): solo consultazione
```

Nessun build step: GitHub Pages serve la root del branch `main`. Il sito vive sotto `/scuola-ecografia/`, quindi **tutti i path sono relativi** (`css/…`, `assets/…`), mai `/css/…`.

## Convenzioni CSS

- **BEM**: `.blocco`, `.blocco__elemento`, `.blocco--variazione`. Stati gestiti da JS con `.is-*` (`.is-open`, `.is-scrolled`). Un solo livello di annidamento, niente selettori di tag dentro i blocchi.
- **Variabili a due livelli**: i token globali stanno in `tokens.css`; ogni blocco dichiara in testa le proprie variabili locali con fallback ai token (`.header { --header-bg: var(--surface-elev-2); }`). Le **variazioni** (`--floating`, `--static`) ridefiniscono solo le variabili locali, non le regole.
- **Tema**: `html[data-theme="light"]` sovrascrive solo i token. I blocchi non conoscono il tema (es. il logo usa `--logo-filter`).
- **Icone**: sempre dallo sprite (iniettato inline in ogni pagina dal generatore, così funziona anche da `file://`), `currentColor`: `<svg class="icon"><use href="#icon-check"/></svg>`.
- Mai valori grezzi (colori, px di spaziatura) nei blocchi: solo variabili.
- **Scala tipografica**: solo i token `--text-*` di `tokens.css` (`body` 14, `body-lg` 17, `caption` 12, `label` 11…). Niente `font-size` intermedi ad hoc nei blocchi.

## Sviluppare un blocco

1. Leggi i testi del blocco in `content/contenuti.md` (cerca `> Blocco: nome`).
2. Crea `css/blocks/nome.css` con l'intestazione (struttura, variazioni, stati) e aggiungilo a `css/main.css`.
3. Inserisci il markup in `content/pages/<pagina>.html` (o in `content/build-pages.js` se è condiviso da tutte le pagine) e rigenera con `node content/build-pages.js`.
4. Verifica a 1440px e a 400px, in dark e in light.

## Sviluppo locale

```
npx serve .
```

Per vedere una sola sezione a più larghezze/temi (file locale, non versionato — crealo da questo snippet se manca): `_preview.html?page=index.html&sec=prenotazioni&w=1300,400,860&theme=dark,dark,light[&open=details]`.

## Blocchi

| Blocco | Stato | Pagine |
|---|---|---|
| `btn` | ✔ fatto (`--primary`, `--secondary`, `--ghost`, `--accent`, `--lg`, `--sm`, `--block`) | tutte |
| `badge` | ✔ fatto (`--outline`, `--accent`, `--soft`, `--muted`, `--success`, `--sm`) | tutte |
| `text-block` | ✔ fatto — intestazione di sezione o testo a 2 colonne (`--split`, `--top`, `--center`, `--flush`, `--tight`; pill `__facts`) | tutte |
| `header` | ✔ fatto (`--floating`, `--static`, menu mobile, toggle tema) | tutte |
| `footer` | ✔ fatto — barra minimal (logo, © ANFI, C.F., email, legali); `--full` aggiunge le colonne di link | tutte |
| `hero` | ✔ fatto (`--centered`, `--compact`; video ANFI in hotlink per la preview) | home |
| `stats` | ✔ fatto (`--bordered`, `--cards`, `--compact`; contatore animato in `js/stats.js`) | home |
| `features` | ✔ fatto (`--numbered` = Obiettivi, `--icons --inline` = Didattica, `--plain`, `--cols-2/3`) | home |
| `percorso` | ✔ fatto (`--cards`, `--connected`) | home |
| `media-text` | ✔ fatto (`--media-left`, `--contain`, `--framed`) = Materiale/Atlante | home |
| `cta-banner` | ✔ fatto (`--glow`, `--card`, `--left`) = Prenotazioni / chiusura pagina | home |
| `people` | ✔ fatto (`--scroller` continuo con `js/marquee.js`, `--cols-3/4/5`, `--compact`, `--overlay`, `--clamp`; tag e lista relazioni opzionali) = Organizzatori, Docenti, Tutor | home, relatori |
| `notice` | ✔ fatto (`--accent`, `--muted`, `--warning`) callout con icona | home |
| `venues` | ✔ fatto (`--compact`) = Sedi | home |
| `sponsors` | ✔ fatto — fascia chiara "Con il supporto di" (opzione A), marquee su mobile, accordion edizioni precedenti (`--no-past`) | home, relatori |
| `editions` | ✔ fatto (card `--open`/`--soldout`, blocco `--two`) | home, prenota |
| `pricing` | ✔ fatto (card `--featured`, blocco `--two`) | home, prenota |
| `faq` | ✔ fatto (`<details name>` esclusivo, `--split`, `--cards`) | home |
| story (Chi siamo) | ✔ fatto con `text-block --split --top` + `notice` | home |
| `testimonials` | ✔ fatto (`--masonry`, `--grid`, `--compact`; avatar iniziali su gradiente) | home |
| `program` | ✔ fatto (nav sticky, sessioni `--lezione/--live/--pratica/--casi/--pausa/--organizzativo`, descrizioni in `<details>`; generato da `content/build-program.js`) | programma |
| Relatori | ✔ fatto con `people --cols-3 --square` (docenti: tag, affiliazione, relazioni; id = slug del nome), `people --compact --square` (tutor), `features --cols-3` + `features__list` (comitati); generato da `content/build-relatori.js` | relatori |
