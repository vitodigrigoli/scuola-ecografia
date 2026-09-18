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
assets/
  logo/             wordmark
  icons/sprite.svg  set icone SVG (niente emoji, niente PNG)
content/
  contenuti.md      TUTTI i testi delle pagine ANFI, già organizzati per blocco
  build-pages.js    genera le 4 pagine dallo stesso shell (node content/build-pages.js)
design-reference/   design system Cowork originale (token, README dei componenti): solo consultazione
```

Nessun build step: GitHub Pages serve la root del branch `main`. Il sito vive sotto `/scuola-ecografia/`, quindi **tutti i path sono relativi** (`css/…`, `assets/…`), mai `/css/…`.

## Convenzioni CSS

- **BEM**: `.blocco`, `.blocco__elemento`, `.blocco--variazione`. Stati gestiti da JS con `.is-*` (`.is-open`, `.is-scrolled`). Un solo livello di annidamento, niente selettori di tag dentro i blocchi.
- **Variabili a due livelli**: i token globali stanno in `tokens.css`; ogni blocco dichiara in testa le proprie variabili locali con fallback ai token (`.header { --header-bg: var(--surface-elev-2); }`). Le **variazioni** (`--floating`, `--static`) ridefiniscono solo le variabili locali, non le regole.
- **Tema**: `html[data-theme="light"]` sovrascrive solo i token. I blocchi non conoscono il tema (es. il logo usa `--logo-filter`).
- **Icone**: sempre dallo sprite, `currentColor`: `<svg class="icon"><use href="assets/icons/sprite.svg#icon-check"/></svg>`.
- Mai valori grezzi (colori, px di spaziatura) nei blocchi: solo variabili.

## Sviluppare un blocco

1. Leggi i testi del blocco in `content/contenuti.md` (cerca `> Blocco: nome`).
2. Crea `css/blocks/nome.css` con l'intestazione (struttura, variazioni, stati) e aggiungilo a `css/main.css`.
3. Inserisci il markup in `content/pages/<pagina>.html` (o in `content/build-pages.js` se è condiviso da tutte le pagine) e rigenera con `node content/build-pages.js`.
4. Verifica a 1440px e a 400px, in dark e in light.

## Sviluppo locale

```
npx serve .
```

## Blocchi

| Blocco | Stato | Pagine |
|---|---|---|
| `btn` | ✔ fatto (`--primary`, `--secondary`, `--ghost`, `--accent`, `--lg`, `--sm`, `--block`) | tutte |
| `header` | ✔ fatto (`--floating`, `--static`, menu mobile, toggle tema) | tutte |
| `hero` | ✔ fatto (`--centered`, `--compact`; video ANFI in hotlink per la preview) | home |
| `stats` `editions` `objectives` `intro` `didattica` `percorso` `materiale` `pricing` `booking-cta` `organizers` `people` `venues` `story` `faq` `testimonials` `sponsors` `footer` | da fare | vedi `content/contenuti.md` |
| `page-hero` `program` `speakers` `committee` | da fare | pagine interne |
