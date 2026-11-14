# Scuola di Ecografia Muscoloscheletrica — sito

Rifacimento delle pagine della Scuola di Ecografia ANFI (`associazioneanfi.it/scuola/…`) come sito statico, con look & feel di riferimento **Learnn** (dark, accent blu, card con bordi).

**Preview:** https://vitodigrigoli.github.io/scuola-ecografia/

## Struttura

```
index.html · metodo.html · programma.html · relatori.html · prenota.html · casi-clinici.html
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
  cases.js          hub casi: evidenzia il distretto visibile
  lightbox.js       galleria a schermo pieno (dialog nativo)
  discussion.js     modulo referto simulato (anteprima, nessun salvataggio)
assets/
  logo/             wordmark
  icons/sprite.svg  set icone SVG (niente emoji, niente PNG)
content/
  contenuti.md      TUTTI i testi delle pagine ANFI, già organizzati per blocco
  build-pages.js    genera tutte le pagine dallo stesso shell (node content/build-pages.js)
  build-program.js  genera pages/programma.html dalle tabelle di contenuti.md (poi build-pages)
  build-relatori.js genera pages/relatori.html da docenti/tutor/comitati di contenuti.md (poi build-pages)
  build-prenota.js  genera pages/prenota.html riusando Costi ed Edizioni di pages/home.html (poi build-pages)
  build-metodo.js   genera pages/metodo.html riusando le recensioni di pages/home.html (poi build-pages)
  build-casi.js     genera pages/casi-clinici.html da casi.md + casi/*.md
  build-caso.js     genera pages/caso-<slug>.html (poi build-pages legge casi-pagine.json)
  casi/             un markdown per caso + script dei segnaposto immagine
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
| `breadcrumb` | ✔ fatto | pagina caso |
| `photo` | ✔ fatto — foto larga 16:7 con didascalia (srcset 900/1600) | home (gruppo), metodo (postazione) |
| `photos` | ✔ fatto — striscia di foto delle edizioni nello scroller | home |
| `consent` | ✔ fatto — informativa cookie in basso (solo strumenti tecnici: informa, non chiede consenso); `js/consent.js`, chiusura ricordata in localStorage | tutte |
| `gallery` + `lightbox` | ✔ fatto (griglia 3-2-1, oltre 6 immagini solo nel lightbox; `<dialog>` + `js/lightbox.js`: frecce, tastiera, swipe, miniature, focus di ritorno) | pagina caso |
| `prose` | ✔ fatto (`--narrow`, `--lead`) — corpo articolo | pagina caso |
| `reveal` | ✔ fatto — referto dietro spoiler | pagina caso |
| `references` | ✔ fatto — dentro la soluzione, accanto al ragionamento | pagina caso |
| `actions` | ✔ fatto (`--start`, `--tight`) — riga di bottoni sotto un contenuto | pagina caso |
| `field` | ✔ fatto (`--check`, `--half`, `.form__row`, `.form__actions`) — campi di modulo riusabili | pagina caso |
| `discussion` | ✔ fatto — modulo "scrivi il tuo referto" **simulato** (`js/discussion.js`: il referto compare in pagina come "in moderazione", non viene salvato) | pagina caso |
| `case-card` | ✔ fatto (`--sm`, `--wide`, `--soon`) — scheda caso clinico | casi clinici |
| `cases` / `cases-nav` | ✔ fatto — sezione categoria: griglia a 4 colonne su desktop, scroller manuale su tablet/mobile + barra distretti sticky (`js/cases.js`); le ancore si fermano sotto la barra | casi clinici |
| `scroller` | ✔ fatto (`--contained`, `--manual`, `--desktop-grid`: griglia da 1100px in su) — striscia a scorrimento continuo full-bleed; la **sezione ospitante** deve avere `overflow-x: clip` | home, casi clinici |
| `chip` | ✔ fatto (`--sm`) — pillola persona con mini-ritratto; usata da roster e program | relatori, programma |
| `badge` | ✔ fatto (`--outline`, `--accent`, `--soft`, `--muted`, `--success`, `--sm`) | tutte |
| `text-block` | ✔ fatto — intestazione di sezione o testo a 2 colonne (`--split`, `--top`, `--center`, `--flush`, `--tight`; pill `__facts`) | tutte |
| `header` | ✔ fatto (`--floating`, `--static`, menu mobile, toggle tema) | tutte |
| `footer` | ✔ fatto — barra minimal (logo, © ANFI, C.F., email, legali); `--full` aggiunge le colonne di link | tutte |
| `hero` | ✔ fatto (`--centered`, `--compact`; video locale in assets/video/, versione mobile sotto 768px) | home |
| `stats` | ✔ fatto (`--bordered`, `--cards`, `--compact`, `--three`, `--five`, `--scroller` = fascia continua in home; contatore animato in `js/stats.js`) | home |
| `features` | ✔ fatto (`--icons` = Obiettivi, `--icons --inline` = Didattica, `--numbered`, `--figures` = pratica del Metodo, `--cols-2/3`) | home, metodo |
| `percorso` | ✔ fatto (`--cards`, `--connected`; `__media` = immagine opzionale: ecografia in home, foto dell'aula nel Metodo) | home, prenota, metodo |
| `media-text` | ✔ fatto (`--media-left`, `--contain`, `--framed`) = Materiale/Atlante (con `--contain`, senza riquadro) | home, metodo |
| `cta-banner` | ✔ fatto (`--glow`, `--card`, `--left`) = Prenotazioni / chiusura pagina | home |
| `people` | ✔ fatto (`--scroller` continuo con `js/marquee.js`, `--cols-3/4/5`, `--compact`, `--overlay`, `--clamp`; tag e lista relazioni opzionali) = Organizzatori, Docenti, Tutor | home, relatori |
| `notice` | ✔ fatto (`--accent`, `--muted`, `--warning`) callout con icona | home |
| `venues` | ✔ fatto (`--compact`; `__head` = città + pillola edizione) = Sedi | home |
| `sponsors` | ✔ fatto — griglia unica di tessere bianche uguali: 16 loghi su due righe da 8 (4×4 sotto i 1024px); colonne in `--sponsors-cols` | home |
| `roster` | ✔ fatto (`--stacked`) — elenchi di persone per ruolo, usa `chip` | relatori |
| `editions` | ✔ fatto (card `--open`/`--soldout`, senza modificatore = in corso; blocco `--two`; sotto i 1100px la card `--open` sale in cima a tutta riga) | home, prenota |
| `pricing` | ✔ fatto — una riga per quota (`__plan`, `--featured`) + pannello `__included` con le voci comuni; `--selector` = pillola a tre categorie con una quota alla volta (radio e `:has()`, niente JS) | home (`--selector`), prenota |
| `faq` | ✔ fatto (`<details name>` esclusivo, `--split`, `--cards`) | home |
| `testimonials` | ✔ fatto (`--masonry`, `--grid`, `--compact`; avatar iniziali su gradiente) | home |
| `program` | ✔ fatto (nav sticky, sessioni `--lezione/--live/--pratica/--casi/--pausa/--organizzativo`, descrizioni in `<details>`; generato da `content/build-program.js`) | programma |
| Prenota | ✔ fatto con blocchi esistenti: hero, pricing (riuso home), percorso --cards + notice, editions (riuso home), cta-banner; generata da `content/build-prenota.js` | prenota |
| Il metodo | ✔ fatto con blocchi esistenti: hero, percorso --connected, features (--figures per la pratica), media-text, testimonials (riuso home), cta-banner; generata da `content/build-metodo.js` | metodo |
| Relatori | ✔ fatto con `people --cols-3 --square` (docenti in `--masonry`: tag, affiliazione, relazioni; id = slug del nome), `people --compact --square` (tutor, senza affiliazione), `roster` (comitati: righe con chip-avatar); generato da `content/build-relatori.js` | relatori |


## Messa online

Due profili in [content/config.js](content/config.js):

- **Anteprima** (default, è quella nel repository e su GitHub Pages): tutte le pagine visibili per la revisione (anche Il metodo e i casi clinici), `noindex` e `robots.txt` chiuso. Si rigenera con i soliti comandi (`node content/build-metodo.js && node content/build-pages.js`).
- **Produzione** (scuoladiecografia.com): `node content/pubblica.js` rigenera con `SITO=produzione`, crea `scuoladiecografia-sito.zip` sul Desktop con i soli file pubblici e rimette il repository in anteprima. Lo zip va caricato in `public_html` da Site Tools → Gestione File ed estratto lì.

Interruttori (valore in produzione):

- **metodoOnline** (`false`): pagina «Il metodo» nascosta, niente `metodo.html`, voce di menu né sitemap; il sorgente resta in `content/`.
- **casiOnline** (`false`): casi clinici nascosti, niente pagine, voce di menu né card nel Metodo; i sorgenti restano in `content/`.
- **ga4Id** (oggi `GTM-NHTPWQXG`): con l'ID l'avviso cookie diventa una richiesta di consenso (Accetta e Rifiuta identici), GA4 parte **solo** dopo Accetta, nel footer compare «Preferenze cookie» e le policy mostrano le sezioni su GA4 (blocchi `<!-- se:ga4 -->`). Non incollare lo snippet di Google nelle pagine.
- **indicizzabile** (`true`): senza meta `noindex` e con `robots.txt` aperto; dopo il lancio su scuoladiecografia.com inviare `sitemap.xml` in Google Search Console.
- **siteUrl**: `https://scuoladiecografia.com`, usato per URL canonici, Open Graph e sitemap. Titoli, descrizioni e dati strutturati sono in [content/seo.js](content/seo.js).

**Hosting SiteGround**: nella cartella del sito vanno caricati solo i file pubblici (gli `*.html` in radice, `favicon.ico`, `site.webmanifest`, `robots.txt`, `sitemap.xml`, `assets/`, `css/`, `js/`), non `content/`, `design-reference/`, `_preview.html`, `README.md`. Data center nell'UE.

**Privacy e Cookie Policy** ([content/pages/privacy-policy.html](content/pages/privacy-policy.html), [cookie-policy.html](content/pages/cookie-policy.html)): titolare Fisiaforma S.R.L., da far validare a chi segue la parte legale.
