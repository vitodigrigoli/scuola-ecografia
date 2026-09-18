# Contenuti — Scuola di Ecografia Muscoloscheletrica ANFI

Testi raccolti dalle pagine live di `associazioneanfi.it/scuola/` (18 settembre 2026) e riorganizzati per **blocco** del nuovo design (riferimento visivo: Learnn). Ogni blocco riporta:

- `> Blocco:` nome BEM del blocco nel nuovo sito
- `> Origine:` sezione della pagina ANFI da cui proviene il testo

I testi sono riportati **così come sono sul sito** (refusi inclusi, segnalati con `[sic]`), per poterli rivedere con il cliente.

---

## Mappa pagine ANFI → blocchi nuovo design

| Pagina ANFI | Nuova pagina | Blocchi (in ordine) |
|---|---|---|
| `/scuola/` | `index.html` | `header` · `hero` · `stats` · `editions` · `objectives` · `intro` · `didattica` · `percorso` · `materiale` · `pricing` · `booking-cta` · `organizers` · `people` · `venues` · `story` · `faq` · `testimonials` · `sponsors` · `footer` |
| `/scuola/programma/` | `programma.html` | `header` · `page-hero` · `program` (4 incontri × 2 giornate, timeline) · `intro` · `sponsors` · `footer` |
| `/scuola/relatori/` | `relatori.html` | `header` · `page-hero` · `speakers` (Docenti) · `speakers--tutor` (Tutor) · `committee` · `sponsors` · `footer` |
| `/scuola/prenota/` | `prenota.html` | `header` · `page-hero` · `pricing` · `editions` · `booking-cta` · `footer` |

Blocchi condivisi tra più pagine: `header`, `footer`, `pricing`, `editions`, `sponsors`, `booking-cta`, `intro`.

---

# HOME — `index.html`

## Header

> Blocco: `header`
> Origine: menu ANFI + sottomenu Scuola

Il menu ANFI generale (Associazione, Eventi, Letteratura, Area membri, Contatti) **non** viene replicato: il nuovo sito è dedicato alla sola Scuola. Nav del nuovo sito:

- Logo: `scuola-ecografia-wordmark.png` (link a Home)
- Programma → `programma.html`
- Relatori → `relatori.html`
- Prenota → `prenota.html`
- FAQ → `index.html#faq`
- Link ghost: **Login** → `https://associazioneanfi.it/account-iscrizione/` (Area membri ANFI)
- CTA: **Prenota il corso** → `prenota.html`
- Toggle giorno/notte

---

## Hero

> Blocco: `hero`
> Origine: intestazione pagina (video di sfondo `04_Header_Desktop_HB.webm` / `04_Header_Mobile_HB.webm`)

**Titolo:** La Scuola di Ecografia Muscoloscheletrica fatta da medici per i medici
*(sul sito: "Muscoloschelerica" [sic])*

**CTA:**
- Programma → `programma.html`
- Relatori → `relatori.html`
- Prenota → `prenota.html`

**Asset:** logo Scuola (`logo_scuola_ecografia.png`), video header desktop/mobile (da richiedere al cliente in alta qualità).

---

## Numeri della Scuola

> Blocco: `stats`
> Origine: contatori sotto l'hero (`et_pb_number_counter`)

| Valore | Etichetta |
|---|---|
| 4 | Incontri Formativi |
| 10 | Postazioni Ecografiche |
| 50 | Posti Disponibili |
| 28+ | Tutor & Relatori |

---

## Le prossime edizioni

> Blocco: `editions` (card con modificatori `--open` / `--soldout`)
> Origine: sezione "Le prossime edizioni"

**Titolo sezione:** Le prossime edizioni

### QUINTA EDIZIONE — `editions__card--open`
- Sottotitolo: Edizione settentrionale
- Periodo: Ottobre 2027 · Dicembre 2027 · Gennaio 2028 · Febbraio 2028
- Stato: **EVENTO APERTO**
- Nota: *Le date esatte e la sede sono in via di definizione
- CTA: **ACQUISTA IL BIGLIETTO** → `https://fisiaforma.it/prodotto/quinta-edizione-scuola-di-ecografia-muscoloscheletrica-anfi/`

### QUARTA EDIZIONE — `editions__card--soldout`
- Sottotitolo: CATANIA 2027
- Date: 16-17 Gennaio 2027 · 6-7 Marzo 2027 · 17-18 Aprile 2027 · 5-6 Giugno 2027
- Stato: **EVENTO SOLD OUT**
- CTA (disabilitata): SOLD OUT!

### TERZA EDIZIONE — `editions__card--soldout`
- Date: 11-12 Aprile 2026 · 06-07 Giugno 2026 · 10-11 Ottobre 2026 · 12-13 Dicembre 2026
- Stato: **EVENTO SOLD OUT**
- CTA (disabilitata): SOLD OUT!

---

## Obiettivi della Scuola

> Blocco: `features features--numbered` (griglia 4 tile numerate)
> Origine: sezione "Obiettivi della Scuola"

**Titolo sezione:** Obiettivi della Scuola

1. **Fornire una Base Solida** — Approfondire la comprensione anatomica e tecnica dell'ecografia muscoloscheletrica per costruire una solida base di competenze future.
2. **Aspetti Pratici e Applicativi** — Offrire sessioni pratiche e interattive, utilizzando ecografi di alta gamma per un'applicazione immediata delle competenze acquisite.
3. **Sviluppare Competenze Avanzate** — Specializzarsi nell'ecografia di articolazioni, muscoli e nervi per diagnosticare con precisione patologie complesse.
4. **Valutare le Competenze** — Concludere il percorso formativo con un esame finale che certifichi le competenze acquisite durante la Scuola.

---

## Formazione Avanzata in Ecografia Muscoloscheletrica

> Blocco: `text-block text-block--split --top --flush` (testo a due colonne, titolo + paragrafi + pill dati)
> Origine: sezione "Formazione Avanzata in Ecografia Muscoloscheletrica" (presente anche in fondo a Programma)

**Titolo:** Formazione Avanzata in Ecografia Muscoloscheletrica

La Scuola di Ecografia è rivolta esclusivamente a medici e si prefigge l'obiettivo di migliorare la competenza diagnostica e terapeutica promuovendo standard elevati nella gestione delle patologie muscoloscheletriche.

Il numero massimo di partecipanti è limitato a 50 per poter garantire un rapporto di 1:5 tra docenti e discenti, assicurando un ambiente di apprendimento ottimale e focalizzato.

---

## Didattica

> Blocco: `features features--icons` (4 tile con icona)
> Origine: sezione "Didattica" (icone PNG: education, ultrasonography, legal-document, exam → sostituire con icone SVG del set)

**Titolo sezione:** Didattica

1. **Incontri Tematici** *(icona: education → `book`)* — Lezioni teoriche condotte da esperti del settore per fornire una base solida sull'ecografia dei principali distretti anatomici. Studio individuale e di gruppo degli schemi di refertazione forniti. *(sul sito: "sell'ecografia" [sic])*
2. **Sessioni Pratiche** *(icona: ultrasonography → `probe`)* — Esercitazioni pratiche su modelli e volontari per applicare le conoscenze teoriche in un contesto clinico, includendo la presentazione e discussione di casi clinici e la simulazione di refertazione.
3. **Norme ed Etica** *(icona: legal-document → `document`)* — Approfondimenti sugli aspetti normativi, etici e di refertazione relativi all'ecografia MSK e sulla corretta indicazione all'esecuzione di esami diagnostici di secondo livello.
4. **Esame Finale** *(icona: exam → `award`)* — Valutazioni in itinere delle conoscenze sviluppate, esame conclusivo sulle competenze apprese durante il corso e consegna degli attestati ai partecipanti meritevoli.

---

## Percorso Formativo

> Blocco: `percorso` (3 colonne / step)
> Origine: sezione "Percorso Formativo" (i titoli delle colonne sul sito sono immagini: `Ecografia_Base-1.png`, `Ecografia_patol-1.png`, `Ecografia_II-1.png`)

**Titolo sezione:** Percorso Formativo

### 01 · Ecografia Base
- Articolazioni arto superiore (spalla, gomito, polso e mano)
- Articolazioni arto inferiore (anca, ginocchio, caviglia e piede)
- Muscolo (braccio, avambraccio, coscia e gamba)
- Rachide e parete addominale

### 02 · Ecografia Patologie
- Patologie arto superiore (spalla, gomito, polso e mano)
- Patologie arto inferiore (anca, ginocchio, caviglia e piede)
- Lesioni muscolari
- Patologie del nervo

### 03 · Ecografia Livello II
- Accessi infiltrativi
- Ecografia in reumatologia
- Tumefazioni e neoformazioni
- Ecografia del nervo
- Cenni di interventistica
- Cenni di ecografia vascolare

**CTA:**
- Visualizza Programma → `programma.html`
- Scarica in .pdf → `https://associazioneanfi.it/programma-scuola-3ed_c/`

---

## Materiale Didattico

> Blocco: `media-text media-text--framed --contain` (testo + immagine copertina; file locale `assets/img/atlante-cover.png`)
> Origine: sezione "Materiale Didattico" (immagine: `cover2_libro_ecografia-muscoloscheletrica-968x1024-1.png`)

**Titolo sezione:** Materiale Didattico

A tutti gli iscritti alla scuola viene fornito l'**Atlante illustrato di Ecografia Muscoloscheletrica** come testo di supporto per la didattica.

L'Atlante illustrato di Ecografia muscoloscheletrica fornisce una visione completa e strutturata dell'anatomia ecografica; è uno strumento necessario per un'introduzione all'anatomia dell'apparato muscoloscheletrico, offrendo una visione semplificata di questa complicata disciplina.

**Sottotitolo:** Vuoi acquistare una copia?
**CTA:** Acquista ora → `https://www.fisiatriainterventistica.it/acquista-il-libro-atlante-illustrato-di-ecografia-muscoloscheletrica`

---

## Dettaglio dei costi

> Blocco: `pricing` (3 card; `pricing__card--featured` su "Socio ANFI")
> Origine: sezione "Dettaglio dei costi" (identica in Prenota)

**Titolo sezione:** Dettaglio dei costi

| Piano | Prezzo | Note |
|---|---|---|
| Non socio ANFI | €2.300 | +iva22% |
| Socio ANFI | €2.200 | +iva22% — CTA secondaria "Diventa Socio" → `https://associazioneanfi.it/account-iscrizione/livelli` |
| Specializzando Socio ANFI | €2.000 | +iva22% |

**Incluso (uguale per tutti i piani):**
- 4 weekend formativi
- Tutoraggio con rapporto 5:1
- Materiale didattico
- Schemi di refertazione
- Valutazione e rilascio diplomi
- Pagamento in due rate (50%+50%)

---

## Prenotazioni

> Blocco: `booking-cta` (banner con testo + CTA)
> Origine: sezione "Prenotazioni"

**Titolo sezione:** Prenotazioni

La quarta edizione è Sold Out!

È già disponibile la pre-iscrizione per la quinta edizione. *(sul sito: "la pre-iscrizione la quinta edizione" [sic])*

Visita il sito del provider per effettuare la pre-iscrizione e per garantirti un posto nelle edizioni future!

**CTA:** Prenota ora! → `https://fisiaforma.it/prodotto/quarta-edizione-scuola-di-ecografia-muscoloscheletrica-anfi` *(il link punta ancora alla quarta edizione: da aggiornare alla quinta)*

---

## Organizzatori

> Blocco: `organizers` (griglia card con foto, nome, qualifica, descrizione)
> Origine: sezione "Organizzatori" (foto 200×300: `nicolo-vitale2.jpg`, `congresso2023_marco_di_gesu`, `sce_luca_latini`, `Domenico-Romeo-nuovo-resized`, `congresso2023_valerio_amico`, `sce_claudio_secci`, `congresso2023_alberto-monello`, `congresso2023_andrea_reggiani`, `Vincenzo-Cosentino-nuovo-resized`)

**Titolo sezione:** Organizzatori

| Nome | Qualifica | Descrizione |
|---|---|---|
| Dott. Nicolò Vitale | FISIATRA | Responsabile del servizio di ecografia muscoloscheletrica e di fisiatria interventistica "CMR", Adrano. |
| Dott. Marco Di Gesù | FISIATRA | Presidente ANFI. Responsabile Ambulatorio di Fisiatria e Fisioterapia presso "Mya Salute", Palermo |
| Dott. Luca Latini | FISIATRA | Responsabile servizio di Fisiatria Interventistica ed ecografia muscoloscheletrica del Centro Medico e Fisioterapia Salute e Benessere, Senigallia (AN) |
| Dott. Domenico Romeo | FISIATRA | Segretario ANFI. Direttore sanitario del centro Physiocare, poliambulatorio medico fisiokinesiterapico, Augusta (SR) |
| Dott. Valerio Amico | FISIATRA | Responsabile del servizio di ecografia muscoloscheletrica e di fisiatria interventistica G2 Medica, Catania · Roga, Enna |
| Dott. Claudio Secci | FISIATRA | Centro Kinesis, Cagliari. |
| Dott. Alberto Monello | FISIATRA | Centro medico Klinè. Ecografista presso studio di diagnostica per immagini XRay. Catania. |
| Dott. Andrea Reggiani | FISIATRA | Amministratore ANFI. D/Medical, Domodossola (VB) |
| Dott. Vincenzo Cosentino | FISIATRA | Libero professionista, Bologna, ecografista SIUMB |

---

## I professionisti coinvolti

> Blocco: `people` (liste per ruolo + CTA)
> Origine: sezione "I professionisti coinvolti"

**Titolo sezione:** I professionisti coinvolti
**CTA:** Visualizza Relatori → `relatori.html`

**Direttore della Scuola:** Nicolò Vitale

**Comitato Scientifico:** Alberto Monello · Domenico Albano · Domenico Romeo · Emilio Filippucci · Luca Sconfienza · Marco Di Gesù · Valerio Amico

**Comitato Organizzativo:** Andrea Reggiani · Claudio Secci · Luca Latini · Riccardo Prezioso

**Docenti (17):** Alberto Monello · Andrea Reggiani · Claudio Secci · Danilo Donati · Domenico Albano · Emilio Filippucci · Francesca Lacelli · Giuseppe Tognini · Ilaria Petrucci · Luca Latini · Marco Di Gesù · Narese Filippo · Nicolò Vitale · Riccardo Prezioso · Stefano Lusi · Stefano Ventura · Valerio Amico

**Tutor (26):** Alberto Monello · Andrea Reggiani · Antonino Russo · Claudio Secci · Danilo Donati · Dario Licciardello · Davide Milone · Domenico Romeo · Emanuele Lazzara · Federico Salvò · Flavio Origlio · Francesca Serpi · Gabriele Innocenti · Giuseppe Tognini · Luca Latini · Marco Di Gesù · Mario Pace · Narese Filippo · Nicolò Vitale · Riccardo De Rosa · Riccardo Prezioso · Roberto Bianchito · Stefano Lusi · Stefano Ventura · Valerio Amico · Vincenzo Manfrè

*(Nota: l'elenco della home non coincide del tutto con la pagina Relatori — es. Danilo Donati, Davide Milone, Roberto Bianchito compaiono solo qui; Emanuele Lazzara e Vincenzo Manfrè sono Docenti in Relatori ma qui solo Tutor. Da chiarire con il cliente.)*

---

## Sedi

> Blocco: `venues` (2 card sede)
> Origine: sezione sedi sotto "I professionisti coinvolti"

**Sede Catania:** Il Principe Hotel — Via Alessi, 24, 95124 Catania CT
**Sede Torino:** J|Hotel — Via Traves, 40, 10151 Torino TO

---

## Chi siamo — La storia della Scuola

> Blocco: `story` (testo lungo + box nota legale `story__notice`)
> Origine: sezione "Chi siamo" (logo ANFI a fianco)

**Titolo sezione:** Chi siamo
**Sottotitolo:** La storia della Scuola

La Scuola di Ecografia Muscoloscheletrica è nata per rispondere alla crescente necessità di una formazione avanzata e specializzata nel campo muscoloscheletrico.

Rivolta a professionisti del settore sanitario come Fisiatri, Ortopedici, Reumatologi, Radiologi, Medici di Medicina Generale e Medici dello Sport, la nostra scuola si pone l'obiettivo di colmare il divario formativo esistente, offrendo una prospettiva pratica e completa sull'uso dell'ecografia in ambito muscoloscheletrico.

Il nostro programma didattico mira a migliorare la competenza diagnostica e terapeutica degli operatori sanitari, promuovendo standard elevati nella gestione delle patologie muscoloscheletriche.

La scuola non solo fornisce una solida base teorica e pratica, ma sviluppa anche competenze avanzate attraverso sessioni interattive e l'utilizzo di tecnologie all'avanguardia.

**Nota importante** *(box evidenziato)*
La Scuola di Ecografia Muscoloscheletrica ANFI è un percorso di formazione privata. Non rilascia titoli di studio con valore legale ai sensi del MIUR né costituisce scuola di specializzazione universitaria. Gli attestati rilasciati hanno esclusivamente valore di certificazione di frequenza e partecipazione al corso. L'utilizzo del termine "scuola" si riferisce unicamente al carattere didattico e formativo dell'iniziativa.

---

## F.A.Q.

> Blocco: `faq` (accordion)
> Origine: sezione "F.A.Q."

**Titolo sezione:** F.A.Q. → nel nuovo design: "Tutto quello che vuoi sapere prima di iniziare" (stile Learnn) oppure mantenere "F.A.Q."

### 1. Come posso iscrivermi alla Scuola di Ecografia?
*(Sul sito la risposta è vuota. Proposta da validare con il cliente: "L'iscrizione avviene tramite il sito del provider Fisiaforma. Clicca su Prenota, scegli la tua categoria (Socio ANFI, Non socio, Specializzando) e completa la pre-iscrizione: la quota è suddivisa in due rate, la prima all'iscrizione.")*

### 2. Come posso raggiungere la sede dell'evento?
La sede meridionale del corso è **Il Principe Hotel**, situato in **Via Alessi 24, 95124 Catania**, nel cuore del centro storico barocco della città, a pochi passi da Piazza Duomo e da Via Etnea. La struttura è facilmente raggiungibile dall'**Aeroporto di Catania Fontanarossa** in circa 10 minuti di taxi oppure con il servizio **Alibus**, scendendo alla fermata **Piazza San Placido** e proseguendo a piedi per circa 500 metri. Per chi arriva in auto, l'hotel è raggiungibile seguendo le indicazioni per **Catania Centro**; sono disponibili parcheggi nelle vicinanze e servizi di parcheggio convenzionati.

La sede settentrionale del corso è il **J|hotel**, situato in **Via Traves 40, 10151 Torino**, all'interno dell'area del J|Village. La struttura è facilmente raggiungibile in auto (uscita Tangenziale Torino Nord – Venaria), dispone di parcheggio interno ed è ben collegata anche con i mezzi pubblici: dalla stazione **Porta Susa** è possibile prendere il bus **linea 72** o un taxi, con un tempo di percorrenza di circa 15–20 minuti.

Per qualsiasi dubbio a riguardo non esitare a contattarci.

### 3. È previsto un servizio di catering durante il corso?
Durante il corso sarà disponibile un servizio di catering con coffee station e lunch, offerto ai partecipanti.

Se hai esigenze alimentari specifiche, comunicacelo in fase di registrazione, provvederemo ad organizzarti per venirti incontro nel migliore dei modi.

N.B.: le cene sono libere e quindi non comprese nel costo del corso.

### 4. Sarà possibile interagire direttamente con i relatori?
Sì, i partecipanti potranno interagire direttamente con i relatori durante le sessioni pratiche e nei momenti di ristoro.

L'intera scuola si basa sull'interazione tutor – discente; il rapporto 1:5 incrementa lo scambio di opinioni e permette una migliore formazione.

### 5. Quali requisiti formativi o professionali sono necessari per partecipare?
Il corso è destinato esclusivamente a medici.

Pensato e dedicato ai professionisti del settore sanitario come Fisiatri, Ortopedici, Reumatologi, Radiologi, Medici di Medicina Generale e Medici dello Sport.

### 6. È possibile ottenere un attestato di partecipazione?
Sì, tutti i partecipanti riceveranno un attestato di partecipazione. Questo verrà rilasciato al termine del corso in formato cartaceo.

### 7. Il corso è rimborsabile?
**POLITICA DI RECESSO**

Le iscrizioni perfezionate prevedono la possibilità di cancellazione o rimborso nel caso dell'impossibilità a partecipare all'evento se comunicate per email alla Segreteria Organizzativa.

- Rinuncia comunicata entro 3 mesi dalla data di inizio del corso: rimborso integrale (100%) della quota versata.
- Rinuncia comunicata entro 2 mesi dalla data di inizio del corso: rimborso parziale pari al 50% della quota versata.
- Rinuncia comunicata oltre i 2 mesi dalla data di inizio del corso: nessun rimborso previsto.

N.B.: L'eventuale rinuncia fa decadere in automatico la priorità acquisita in lista d'attesa.

### 8. Vengono riconosciuti crediti ECM?
No, questo nostro corso non riconosce crediti ECM.

### 9. Quali sono le modalità e le scadenze per il pagamento delle rate?
La quota è suddivisa in due rate: la prima all'iscrizione, la seconda da versare a distanza di 2 mesi dalla prima. Le scadenze e le modalità di pagamento vengono riportate sulla scheda d'iscrizione. *(sul sito: "distranza" [sic])*

### 10. Ci sono hotel convenzionati o suggeriti per i partecipanti?
Abbiamo stretto convenzioni con Il Principe Hotel e con il J|hotel e nelle vicinanze delle due sedi del corso si possono facilmente trovare diverse strutture per il pernottamento. *(sul sito: "Hotele" [sic])*

Se desideri maggiori informazioni a riguardo puoi contattarci alla nostra mail info@associazioneanfi.it

---

## Dicono della Scuola

> Blocco: `testimonials` (card citazione con stelle SVG + firma)
> Origine: sezione "Dicono della Scuola" (immagine `5-star400x100` → icone `star` × 5 in `rating-gold`)

**Titolo sezione:** Dicono della Scuola

### Adriano — 5/5
L'anno scorso avevo già avuto modo di prendere parte ad un mini corso di ecografia muscolo scheletrica tenuto dal dottor Reggiani durante un Master universitario ed è stata un'esperienza decisamente positiva. La Scuola non poteva essere altrimenti, le mie aspettative sono state attese.

Tra i punti di forza, il clima amichevole, la totale disponibilità (e soprattutto la pazienza!) dei docenti e dei tutor di seguire passo per passo ciascun discente nell'ecografia di tutte le articolazioni trattate durante la parte teorica, le sessioni live perfette.

E non ultima, la chicca dell'atlante di ecografia in omaggio per ciascun discente! ANFI per me è il top

### DiegoC — 5/5
Incontro puntuale ed efficace, che risponde perfettamente alle necessità che incontriamo quotidianamente nella nostra attività clinica ambulatoriale; le lezioni frontali sono precise, di durata adeguata ad affrontare i punti cardine di ogni distretto anatomico, seguite da prove pratiche esaustive con tutor estremamente preparati.

### SalvoF — 5/5
Il primo incontro della scuola di Ecografia è stato un'esperienza estremamente positiva. I docenti non si limitano a insegnare, ma riescono davvero a ispirare e a motivare, trasmettendo con passione il loro sapere.

Un aspetto che ho trovato particolarmente utile è stato il modo in cui teoria e pratica sono stati intrecciati: dopo ogni lezione teorica, le live di ecografia proiettate a schermo hanno reso tutto immediatamente chiaro e applicabile. Vedere non solo l'immagine ecografica, ma anche il docente ed il paziente in posizione, è stato un valore aggiunto che ha permesso di cogliere anche i dettagli più pratici. Un'esperienza che non solo forma, ma stimola davvero a dare il massimo. Non vedo l'ora di continuare questo percorso!

### AntoM — 5/5
Esposizioni chiare e concise. Tanta pratica, attenzione e disponibilità nei confronti del corsista. Organizzazione eccellente.

### Marco B. — 5/5
Un corso già ottimo alla sua prima edizione, fatto da colleghi fisiatri per colleghi fisiatri, con ben chiare le esigenze di chi si approccia alla materia con l'esigenza di portare l'ultrasonografia nella pratica clinica e riabilitativa di tutti i giorni.

Docenti preparati e appassionati, che trasmettono concetti chiari e portano la loro esperienza quotidiana per dare quel qualcosa in più che fa la differenza. Tempi "svizzeri" ben scanditi, con un rapporto teoria-pratica giustamente a favore dell'approccio pratico sugli strumenti, con tutor attenti e disponibili. Strumentazione di prim'ordine, con per anche una attenzione a chi, essendo al primo approccio, non avrà da subito a disposizione il top di gamma e quindi deve imparare a gestire anche macchine "meno performanti".

Consigliato a chi è al primo approccio, ma anche a chi ha già qualche esperienza di ultrasonografia ma vuole acquisire un metodo ed una forma mentis rigorosi e improntati all'ambito riabilitativo. *(sul sito: "ulteasonografia" [sic])*

---

## Sponsor

> Blocco: `sponsors` (griglia loghi, un gruppo per edizione; modificatore `sponsors--tiered` per Premium/Élite)
> Origine: sezioni "Sponsor 3° / 2° / 1° Edizione" (loghi PNG 300×100 su `wp-content/uploads/…`)

**Sponsor 3° Edizione:** Easytech · Sonoscape · Mindray · GE · Abiogen · B2 pharma

**Sponsor 2° Edizione:** Aptissen · Esaote · Strumedical · Novias Pharma · Abiogen · B2 pharma

**Sponsor 1° Edizione**
- **Premium:** Esaote · Samsung · Sipar · Best
- **Élite:** VRMedical · Easytech · Novias Pharma · CD Life Pharma · Star Live · B2 pharma · Abiogen

File loghi (da riscaricare o richiedere in vettoriale): `Easytech-300x100-1.png`, `Sonoscape-300x100-1.png`, `Mindray-300x100-1.png`, `GE-300x100-1.png`, `Abiogen.png`, `B2-pharma-300x100-1.png`, `Aptissen-300x100-1.png`, `Esaote-300x100-1.png`, `Strumedical-300x100-1.png`, `Novias-Pharma-300x100-1.png`, `Samsung-300x100-1.png`, `Sipar-300x100-1.png`, `Best-300x100-1.png`, `VRMedical-300x100-1.png`, `Cdlifepharma300x100.png`, `Star-Live-300x100-1.png`.

---

## Footer

> Blocco: `footer`
> Origine: footer Scuola + footer ANFI

**Colonna Scuola:** logo Scuola · Programma · Relatori · Prenota

**Colonna Associazione:**
Associazione Nazionale Fisiatria Interventistica ETS
Benigno Crespi, 57 — Milano, 20159, MI
info@associazioneanfi.it
Codice fiscale: 97896820152

**Colonna Naviga (link al sito ANFI):**
- Associazione → `https://associazioneanfi.it/associazione/` (Statuto, Comitati Regionali, Patrocini, Polizza Assicurativa, Sponsor)
- Eventi → `https://associazioneanfi.it/eventi/` (Nuovi eventi, Scuola di Ecografia, CadaverLab, Congressi Regionali, Congresso 2025, US-F)
- Letteratura → `https://associazioneanfi.it/letteratura/`
- Area membri → `https://associazioneanfi.it/account-iscrizione/il-tuo-profilo/` (Accedi, Iscriviti)
- Contatti → `https://associazioneanfi.it/contatti/`

**Legali:** Privacy Policy → `https://www.iubenda.com/privacy-policy/18516161` · Cookie Policy → `https://www.iubenda.com/privacy-policy/18516161/cookie-policy`

---

# PROGRAMMA — `programma.html`

## Page hero

> Blocco: `page-hero`
> Origine: intestazione pagina Programma

**Etichetta:** PROGRAMMA
**Titolo:** Terza edizione 2026 — 4 incontri, 8 giornate *(proposta; sul sito il titolo è solo "PROGRAMMA")*
**Navigazione interna (tab / anchor):** 1° Incontro · 2° Incontro · 3° Incontro · 4° Incontro

## Programma dettagliato

> Blocco: `program` (un `program__meeting` per incontro, un `program__day` per giornata, righe `program__session` con modificatori per tipo: `--lezione`, `--live`, `--pratica`, `--casi`, `--pausa`, `--organizzativo`)
> Origine: pagina Programma (3ª edizione, 2026). Relatori collegati alle schede in `relatori.html`.

### 1° Incontro
**Ecografia dell’arto superiore** — 11 – 12 aprile 2026

#### Sabato – 11 aprile

| Orario | Sessione | Tipo | Relatore | Descrizione |
|---|---|---|---|---|
| 9:00–9:15 | **Registrazione dei partecipanti** | organizzativo |  |  |
| 9:15–9:45 | **Presentazione ANFI, Scuola di Ecografia e programma didattico** | lezione | Marco Di Gesù (Fisiatra) | La relazione presenta l’Associazione Nazionale Fisiatria Interventistica (ANFI), illustrando il ruolo della Scuola di Ecografia nella formazione specialistica. Viene descritto il programma didattico, con particolare attenzione agli obiettivi formativi, ai moduli teorico-pratici e all’importanza dell’ecografia nella pratica clinica fisiatrica. |
| 9:45–10:15 | **Introduzione all'ecografia e semeiotica ecografica** | lezione | Riccardo Prezioso (Fisiatra) | La relazione offre un’introduzione all’ecografia, delineandone i principi fondamentali e l’utilizzo in ambito medico. Viene approfondita la semeiotica ecografica, ovvero l’insieme dei segni e delle immagini che consentono l’interpretazione diagnostica, con l’obiettivo di fornire le basi teoriche per una corretta lettura e applicazione dell’ecografia nella pratica clinica. |
| 10:15–11:00 | **Prove pratiche: settaggi ecografi e correlazione anatomo-ecografica** | pratica |  | L’attività prevede una sessione pratica dedicata all’utilizzo degli ecografi, con particolare attenzione ai settaggi fondamentali per un’ottimale acquisizione delle immagini. I partecipanti avranno modo di esercitarsi nella correlazione tra anatomia e immagini ecografiche, sviluppando competenze operative essenziali per una corretta interpretazione clinica. |
| 11:00–11:30 | **Coffee Station** | pausa |  |  |
| 11:30–12:00 | **Spalla: anatomia base e focus su prove dinamiche** | lezione | Nicolò Vitale (Fisiatra) | Anatomia di base della spalla e principali riferimenti ecografici vengono illustrati per facilitare l’identificazione delle strutture durante l’esame. Particolare attenzione è dedicata alle prove dinamiche, fondamentali per la valutazione funzionale e per riconoscere eventuali alterazioni patologiche in tempo reale. |
| 12:00–12:15 | **Spalla: live ecografica** | live |  | Sessione pratica in diretta dedicata alla spalla, durante la quale il relatore esegue una scansione ecografica delle principali strutture anatomiche con proiezione delle immagini in tempo reale. L’esame viene commentato dal vivo, con descrizione dettagliata delle strutture visualizzate e chiarimenti sui punti di repere ecografici. |
| 12:15–13:30 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |
| 13:30–14:30 | **Lunch** | pausa |  |  |
| 13:30–15:00 | **Gomito: anatomia base** | lezione | Alberto Monello (Fisiatra) | Vengono illustrate le nozioni di anatomia di base del gomito con riferimento specifico alla rappresentazione ecografica delle strutture principali. L’obiettivo è fornire ai discenti una guida chiara per l’identificazione dei punti di repere e per l’impostazione corretta dell’esame ecografico del distretto. |
| 15:00–15:15 | **Gomito: live ecografica** | live |  | Sessione ecografica dal vivo focalizzata sulla gomito, in cui il relatore esegue una scansione in tempo reale delle principali strutture anatomiche, proiettando le immagini per l’intera platea. Durante l’esame, vengono fornite spiegazioni estemporanee e dettagliate sulle strutture osservate, con particolare attenzione ai principali punti di repere ecografici. |
| 15:15–16:30 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |
| 16:30–17:00 | **Coffee Station** | pausa |  |  |
| 17:00–17:30 | **Polso - Mano: anatomia base** | lezione | Valerio Amico (Fisiatra) | Viene analizzata l’anatomia di base del distretto polso-mano attraverso l’ecografia, con identificazione delle principali strutture tendinee, muscolari e articolari. La sessione è finalizzata a fornire le conoscenze necessarie per orientarsi nell’esame ecografico, riconoscendo correttamente i punti di repere e l’aspetto normale delle strutture anatomiche. |
| 17:30–17:45 | **Polso - Mano: live ecografica** | live |  | Sessione ecografica dal vivo focalizzata sulla gomito, in cui il relatore esegue una scansione in tempo reale delle principali strutture anatomiche, proiettando le immagini per l’intera platea. Durante l’esame, vengono fornite spiegazioni estemporanee e dettagliate sulle strutture osservate, con particolare attenzione ai principali punti di repere ecografici. |
| 17:45–19:00 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |

#### Domenica – 12 aprile

| Orario | Sessione | Tipo | Relatore | Descrizione |
|---|---|---|---|---|
| 09:00–09:30 | **Ecografia del muscolo: arto superiore** | lezione | Vincenzo Manfrè (Medico dello sport) | La relazione è dedicata all’ecografia dei muscoli dell’arto superiore, con analisi delle principali masse muscolari e delle loro caratteristiche ecografiche. Vengono illustrate le tecniche di scansione, i piani di riferimento e gli elementi utili per distinguere il tessuto muscolare normale nella regione del braccio e dell’avambraccio. |
| 09:30–09:45 | **Muscolo: live ecografica** | live |  | Sessione pratica in diretta dedicata ai muscoli dell’arto superiore, durante la quale il relatore esegue una scansione ecografica delle principali strutture anatomiche con proiezione delle immagini in tempo reale. L’esame viene commentato dal vivo, con descrizione dettagliata delle strutture visualizzate e chiarimenti sui punti di repere ecografici. |
| 09:45–11:00 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |
| 11:00–11:30 | **Coffee Station** | pausa |  |  |
| 11:30–12:00 | **Ecografia del nervo: arto superiore** | lezione | Luca Latini (Fisiatra) | La relazione approfondisce l’ecografia dei nervi dell’arto superiore, illustrando il decorso delle principali strutture nervose e i relativi punti di repere. Vengono descritte le tecniche di scansione, le caratteristiche ecografiche del nervo in condizioni fisiologiche. |
| 12:00–12:15 | **Nervo: live ecografica** | live |  | Sessione pratica in diretta dedicata ai nervi dell’arto superiore, durante la quale il relatore esegue una scansione ecografica delle principali strutture anatomiche con proiezione delle immagini in tempo reale. L’esame viene commentato dal vivo, con descrizione dettagliata delle strutture visualizzate e chiarimenti sui punti di repere ecografici. |
| 12:15–13:30 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |
| 13:30–15:00 | **Lunch** | pausa |  |  |
| 15:00–16:00 | **Setting ambulatoriale e Accessi infiltrativi dell'arto superiore** | lezione | Marco Di Gesù (Fisiatra) | La relazione tratta l’organizzazione del setting ambulatoriale per le procedure ecoguidate e approfondisce le principali tecniche di accesso infiltrativo nell’arto superiore. Vengono illustrate le indicazioni cliniche, i materiali necessari, le modalità di preparazione del paziente e le strategie per garantire efficacia e sicurezza durante le infiltrazioni. |
| 16:00–16:30 | **Coffee Station** | pausa |  |  |
| 16:30–18:00 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |

### 2° Incontro
**Ecografia dell’arto inferiore, del rachide e della parete addominale** — 6 – 7 giugno 2026

#### Sabato – 6 giugno

| Orario | Sessione | Tipo | Relatore | Descrizione |
|---|---|---|---|---|
| 9:00–9:15 | **Registrazione dei partecipanti** | organizzativo |  |  |
| 9:15–10:30 | **Verifica competenze eco di base arto superiore** | organizzativo |  |  |
| 10:30–11:00 | **Coffee Station** | pausa |  |  |
| 11:00–11:30 | **Anca: anatomia base** | lezione | Luca Latini (Fisiatra) | La relazione affronta l’anatomia di base dell’anca con riferimento all’esame ecografico, illustrando le principali strutture articolari, muscolari e tendinee del distretto. L’obiettivo è fornire le basi per un corretto orientamento ecografico, identificando punti di repere utili alla valutazione clinica e funzionale. {https://associazioneanfi.it/anca-anatomia-base-filippo-narese/} Vedi relazione |
| 11:30–11:45 | **Anca: live ecografica** | live |  | Sessione pratica in diretta dedicata all’articolazione dell’anca, durante la quale il relatore esegue una scansione ecografica delle principali strutture anatomiche con proiezione delle immagini in tempo reale. L’esame viene commentato dal vivo, con descrizione dettagliata delle strutture visualizzate e chiarimenti sui punti di repere ecografici. |
| 11:45–13:00 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |
| 13:00–14:30 | **Lunch** | pausa |  |  |
| 14:30–15:00 | **Ginocchio: anatomia base** | lezione | Stefano Ventura (Fisiatra) | La relazione analizza l’anatomia di base del ginocchio in ambito ecografico, con descrizione delle principali strutture tendinee, legamentose, muscolari e articolari. Viene posta attenzione ai punti di repere necessari per una corretta esecuzione dell’esame e per l’identificazione delle principali aree di interesse clinico. |
| 15:00–15:15 | **Ginocchio: live ecografica** | live |  | Sessione pratica in diretta dedicata all’articolazione del ginocchio, durante la quale il relatore esegue una scansione ecografica delle principali strutture anatomiche con proiezione delle immagini in tempo reale. L’esame viene commentato dal vivo, con descrizione dettagliata delle strutture visualizzate e chiarimenti sui punti di repere ecografici. |
| 15:15–16:30 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |
| 16:30–17:00 | **Coffee Station** | pausa |  |  |
| 17:00–17:30 | **Caviglia - Piede: anatomia base** | lezione | Alberto Monello (Fisiatra) | La relazione esplora l’anatomia di base della caviglia e del piede attraverso l’ecografia, evidenziando le strutture muscolari, tendinee e articolari più rilevanti. Vengono illustrati i principali punti di repere e le tecniche di scansione utili per orientarsi nel distretto e per una valutazione morfo-funzionale accurata. |
| 17:30–17:45 | **Caviglia e Piede: live ecografica** | live |  | Sessione pratica in diretta dedicata all’articolazione della caviglia e al piede, durante la quale il relatore esegue una scansione ecografica delle principali strutture anatomiche con proiezione delle immagini in tempo reale. L’esame viene commentato dal vivo, con descrizione dettagliata delle strutture visualizzate e chiarimenti sui punti di repere ecografici. |
| 17:45–19:00 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |

#### Domenica – 7 giugno

| Orario | Sessione | Tipo | Relatore | Descrizione |
|---|---|---|---|---|
| 9:00–9:30 | **Ecografia del muscolo: arto inferiore** | lezione | Alberto Monello (Fisiatra) | La relazione è dedicata all’ecografia muscolare dell’arto inferiore, con descrizione delle principali masse muscolari e della loro anatomia ecografica. Vengono illustrati i corretti approcci di scansione, i riferimenti anatomici utili e gli aspetti ecografici che permettono di distinguere la normalità da eventuali alterazioni patologiche. |
| 9:30–9:45 | **Muscolo: live ecografica** | live |  | Sessione pratica in diretta dedicata ai muscoli dell’arto inferiore, durante la quale il relatore esegue una scansione ecografica delle principali strutture anatomiche con proiezione delle immagini in tempo reale. L’esame viene commentato dal vivo, con descrizione dettagliata delle strutture visualizzate e chiarimenti sui punti di repere ecografici. |
| 9:45–11:00 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |
| 11:00–11:30 | **Coffee Station** | pausa |  |  |
| 11:30–12:00 | **Ecografia del nervo: arto inferiore** | lezione | Nicolò Vitale (Fisiatra) | La relazione approfondisce l’esame ecografico dei nervi dell’arto inferiore, analizzando il decorso, l’aspetto e i punti di repere delle principali strutture nervose. Vengono illustrate le tecniche di scansione più efficaci e gli elementi distintivi che permettono di riconoscere i principali nervi dell’arto inferiore. |
| 12:00–12:15 | **Nervo: live ecografica** | live |  | Sessione pratica in diretta dedicata ai nervi dell’arto inferiore, durante la quale il relatore esegue una scansione ecografica delle principali strutture anatomiche con proiezione delle immagini in tempo reale. L’esame viene commentato dal vivo, con descrizione dettagliata delle strutture visualizzate e chiarimenti sui punti di repere ecografici. |
| 12:15–13:30 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |
| 13:30–14:30 | **Lunch** | pausa |  |  |
| 14:30–15:15 | **Cenni di ecografia vascolare dell'arto inferiore** | lezione | Ilaria Petrucci (Nefrologo) | La relazione fornisce una panoramica introduttiva sull’ecografia vascolare dell’arto inferiore, con cenni alle principali tecniche di valutazione dei vasi arteriosi e venosi. Vengono illustrati i reperi anatomici, l’uso del Doppler, e i segni ecografici utili per l’identificazione di patologie vascolari come trombosi venosa profonda e insufficienza venosa, con indicazioni pratiche per l’integrazione nella valutazione clinica. |
| 15:15–15:30 | **Eco vascolare arti inferiori: live ecografica** | live |  | Sessione pratica in diretta dedicata al rachide e parete addominale, durante la quale il relatore esegue una scansione ecografica delle principali strutture anatomiche con proiezione delle immagini in tempo reale. L’esame viene commentato dal vivo, con descrizione dettagliata delle strutture visualizzate e chiarimenti sui punti di repere ecografici. |
| 15:30–16:00 | **Coffee Station** | pausa |  |  |
| 16:00–17:00 | **Accessi infiltrativi dell'arto inferiore** | lezione | Riccardo Prezioso (Fisiatra) | La relazione illustra le principali tecniche di accesso infiltrativo ecoguidato nell’arto inferiore, con focus su indicazioni cliniche, materiali utilizzati e modalità di esecuzione. Vengono descritte le procedure per l’infiltrazione di articolazioni, strutture tendinee e borsali, con attenzione alla sicurezza, all’efficacia e all’organizzazione del setting ambulatoriale. |
| 17:00–18:00 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |

### 3° Incontro
**Quadri ecografici patologici e relativa refertazione – arto superiore** — 10 – 11 ottobre 2026

#### Sabato – 10 ottobre

| Orario | Sessione | Tipo | Relatore | Descrizione |
|---|---|---|---|---|
| 9:00–9:15 | **Registrazione dei partecipanti** | organizzativo |  |  |
| 9:15–10:30 | **Verifica competenze eco di base arto inferiore** | organizzativo |  |  |
| 10:30–11:15 | **Patologie della Spalla** | lezione | Nicolò Vitale (Fisiatra) | La relazione affronta le principali patologie di interesse diagnostico della spalla, con particolare attenzione all’inquadramento clinico-ecografico. Vengono analizzate le condizioni più frequenti, come tendinopatie, lesioni della cuffia dei rotatori, borsiti e instabilità, evidenziando i segni ecografici utili alla diagnosi e alla gestione terapeutica. |
| 11:15–11:30 | **Basi di refertazione: linee guida, modelli di refertazione e glossario** | lezione | Alberto Monello (Fisiatra) | La relazione è dedicata alle basi della refertazione ecografica, con una panoramica sulle principali linee guida, sui modelli strutturati di referto e sull’uso di un glossario condiviso. Viene sottolineata l’importanza di una terminologia chiara e standardizzata per garantire coerenza, precisione e utilità clinica nella comunicazione diagnostica. |
| 11:30–12:00 | **Coffee Station** | pausa |  |  |
| 12:00–13:30 | **Casi clinici su grande schermo: Spalla** | casi |  | Discussione di casi clinici ecografici proiettati su grande schermo, con analisi guidata delle immagini e confronto interattivo tra relatore e partecipanti. L’obiettivo è integrare teoria e pratica, stimolando il ragionamento clinico e l’applicazione delle conoscenze acquisite a situazioni reali. |
| 13:30–14:30 | **Lunch** | pausa |  |  |
| 14:30–15:15 | **Patologie del Gomito** | lezione | Giuseppe Tognini (Radiologo) | La relazione approfondisce le principali patologie del gomito di interesse diagnostico ed ecografico, come epicondiliti, entesopatie, borsiti e conflitti neurovascolari. Vengono illustrati i segni clinici e le corrispondenti evidenze ecografiche, con l’obiettivo di facilitare l’inquadramento diagnostico e l’orientamento terapeutico. |
| 15:15–16:45 | **Casi clinici su grande schermo: Gomito** | casi |  | Discussione di casi clinici ecografici proiettati su grande schermo, con analisi guidata delle immagini e confronto interattivo tra relatore e partecipanti. L’obiettivo è integrare teoria e pratica, stimolando il ragionamento clinico e l’applicazione delle conoscenze acquisite a situazioni reali. |
| 16:45–17:15 | **Coffee Station** | pausa |  |  |
| 17:15–17:45 | **Focus: Tumefazioni e neoformazioni: come descriverle e cosa fare** | lezione | Francesca Lacelli (Radiologo) | La relazione si concentra sulla valutazione ecografica di tumefazioni e neoformazioni, fornendo criteri per una corretta descrizione morfologica e strutturale. Vengono analizzati gli aspetti utili a distinguere lesioni benigne da sospette, con indicazioni pratiche su come impostare il referto e quali percorsi diagnostici o terapeutici attivare. |
| 17:45–18:00 | **Casi clinici su grande schermo: Tumefazioni e neoformazioni** | casi |  | Discussione di casi clinici ecografici proiettati su grande schermo, con analisi guidata delle immagini e confronto interattivo tra relatore e partecipanti. L’obiettivo è integrare teoria e pratica, stimolando il ragionamento clinico e l’applicazione delle conoscenze acquisite a situazioni reali. |
| 18:00–19:00 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |

#### Domenica – 11 ottobre

| Orario | Sessione | Tipo | Relatore | Descrizione |
|---|---|---|---|---|
| 09:00–9:45 | **Focus: Ruolo dell'ecografia in reumatologia e principali scale di valutazione** | lezione | Emilio Filippucci (Reumatologo) | La relazione esplora il ruolo dell’ecografia nella pratica reumatologica, evidenziandone l’utilità nell’identificazione precoce delle sinoviti, nella valutazione dell’attività di malattia e nel monitoraggio terapeutico. Vengono presentate le principali scale di valutazione ecografica utilizzate in ambito reumatologico, con esempi applicativi e indicazioni per un corretto utilizzo clinico. |
| 09:45–10:15 | **Schemi di refertazione: Patologie reumatologiche** | lezione | Emilio Filippucci (Reumatologo) | La relazione è dedicata agli schemi di refertazione ecografica per le patologie reumatologiche, con l’obiettivo di standardizzare la descrizione dei reperti e migliorarne la fruibilità clinica. Vengono presentati modelli strutturati di referto, esempi pratici e suggerimenti per integrare le informazioni ecografiche con le esigenze diagnostiche e di follow-up del paziente reumatologico. |
| 10:15–10:30 | **Casi clinici su grande schermo: Patologie reumatiche** | casi |  | Discussione di casi clinici ecografici proiettati su grande schermo, con analisi guidata delle immagini e confronto interattivo tra relatore e partecipanti. L’obiettivo è integrare teoria e pratica, stimolando il ragionamento clinico e l’applicazione delle conoscenze acquisite a situazioni reali. |
| 10:30–11:00 | **Coffee Station** | pausa |  |  |
| 11:00–11:30 | **Rachide e parete addominale: anatomia base** | lezione | Nicolò Vitale (Fisiatra) | La relazione analizza l’anatomia di base del rachide e della parete addominale in ambito ecografico, evidenziando le strutture di interesse clinico come muscoli paravertebrali, legamenti e processi ossei vertebrali. Viene illustrato l’approccio ecografico per l’identificazione dei punti di repere e la corretta interpretazione delle immagini in relazione alla funzionalità e alla diagnostica del distretto. |
| 11:30–11:45 | **Rachide e parete addominale: live ecografica** | live |  | Sessione pratica in diretta dedicata al rachide e parete addominale, durante la quale il relatore esegue una scansione ecografica delle principali strutture anatomiche con proiezione delle immagini in tempo reale. L’esame viene commentato dal vivo, con descrizione dettagliata delle strutture visualizzate e chiarimenti sui punti di repere ecografici. |
| 11:45–13:00 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |
| 13:00–14:15 | **Lunch** | pausa |  |  |
| 14:15–14:45 | **Patologie del Polso e della Mano** | lezione | Valerio Amico (Fisiatra) | La relazione affronta le principali patologie del polso e della mano di interesse ecografico, come tenosinoviti, sindrome del tunnel carpale, artropatie e lesioni tendinee. Vengono analizzati i reperti ecografici caratteristici, le correlazioni cliniche e gli elementi utili per una diagnosi tempestiva e accurata. |
| 14:45–16:15 | **Casi clinici su grande schermo: Polso e mano** | casi |  | Discussione di casi clinici ecografici proiettati su grande schermo, con analisi guidata delle immagini e confronto interattivo tra relatore e partecipanti. L’obiettivo è integrare teoria e pratica, stimolando il ragionamento clinico e l’applicazione delle conoscenze acquisite a situazioni reali. |
| 16:15–17:00 | **Cenni di interventistica arto superiore** | lezione | Emanuele Lazzara (Fisiatra) | La relazione fornisce una panoramica sulle principali procedure interventistiche ecoguidate dell’arto superiore, con cenni tecnici e indicazioni cliniche per litoclasia, idrodistensione, infiltrazioni di acido ialuronico e collagene, elettrolisi, radiofrequenze e PRP. Vengono illustrate le basi operative, i materiali necessari e i criteri per una corretta selezione dei pazienti, con l’obiettivo di integrare l’interventistica ecoguidata nella pratica clinica quotidiana. |
| 17:00–18:00 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |

### 4° Incontro
**Quadri ecografici patologici e relativa refertazione – arto inferiore** — 12 – 13 dicembre 2026

#### Sabato – 12 dicembre

| Orario | Sessione | Tipo | Relatore | Descrizione |
|---|---|---|---|---|
| 9:00–9:15 | **Registrazione dei partecipanti** | organizzativo |  |  |
| 9:15–09:45 | **Patologie dell'Anca** | lezione | Filippo Narese (Radiologo) | La relazione analizza le principali patologie dell’anca di interesse diagnostico in ambito ecografico, come borsiti, tendinopatie, conflitti femoro-acetabolari e versamenti articolari. Vengono descritti i reperti ecografici caratteristici, i punti di repere per l’esame e le implicazioni cliniche utili per l’inquadramento e la gestione del paziente. |
| 09:45–11:15 | **Casi clinici su grande schermo: Patologie dell'Anca** | casi |  | Discussione di casi clinici ecografici proiettati su grande schermo, con analisi guidata delle immagini e confronto interattivo tra relatore e partecipanti. L’obiettivo è integrare teoria e pratica, stimolando il ragionamento clinico e l’applicazione delle conoscenze acquisite a situazioni reali. |
| 11:15–11:45 | **Coffee Station** | pausa |  |  |
| 11:45–12:15 | **Ecografia avanzata e varianti anatomiche** | lezione | Nicolò Vitale (Fisiatra) | Relazione dedicata all’ecografia muscoloscheletrica avanzata, con analisi dettagliata delle tecniche di imaging ad alta risoluzione e del loro impiego clinico. Approfondisce il riconoscimento delle principali varianti anatomiche, distinguendole da condizioni patologiche per migliorare accuratezza diagnostica. |
| 12:15–13:30 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |
| 13:30–14:30 | **Lunch** | pausa |  |  |
| 14:30–15:00 | **Patologie del Ginocchio** | lezione | Valerio Amico (Fisiatra) | La relazione affronta le principali patologie del ginocchio di interesse ecografico, tra cui versamenti articolari, tendinopatie, borsiti e alterazioni capsulo-legamentose. Vengono illustrati i reperti ecografici più frequenti, i punti di repere fondamentali e il ruolo dell’ecografia nell’inquadramento diagnostico e nel monitoraggio terapeutico. |
| 15:00–16:30 | **Casi clinici su grande schermo: Patologie del Ginocchio** | casi |  | Discussione di casi clinici ecografici proiettati su grande schermo, con analisi guidata delle immagini e confronto interattivo tra relatore e partecipanti. L’obiettivo è integrare teoria e pratica, stimolando il ragionamento clinico e l’applicazione delle conoscenze acquisite a situazioni reali. |
| 16:30–17:00 | **Coffee Station** | pausa |  |  |
| 17:00–17:30 | **Patologie della Caviglia e del Piede** | lezione | Domenico Romeo (Fisiatra) | La relazione analizza le principali patologie della caviglia e del piede valutabili con l’ecografia, come tendinopatie, entesopatie, borsiti, lesioni legamentose e fascite plantare. Vengono descritti i segni ecografici tipici, i punti di repere per un’esecuzione corretta dell’esame e il contributo dell’ecografia nell’inquadramento diagnostico e nel follow-up clinico. |
| 17:30–19:00 | **Casi clinici su grande schermo: Patologie della Caviglia e del Piede** | casi |  | Discussione di casi clinici ecografici proiettati su grande schermo, con analisi guidata delle immagini e confronto interattivo tra relatore e partecipanti. L’obiettivo è integrare teoria e pratica, stimolando il ragionamento clinico e l’applicazione delle conoscenze acquisite a situazioni reali. |

#### Domenica – 13 dicembre

| Orario | Sessione | Tipo | Relatore | Descrizione |
|---|---|---|---|---|
| 09:00–09:45 | **Focus: Patologie del nervo periferico** | lezione | Domenico Albano (Radiologo) | La relazione si concentra sulle patologie del nervo periferico valutabili tramite ecografia, come intrappolamenti, neuriti, lesioni post-traumatiche e neuropatie disimmuni. Vengono illustrati i segni ecografici tipici, i criteri di valutazione morfologica e dinamica, e il ruolo dell’ecografia nella diagnosi, nel monitoraggio e nell’orientamento terapeutico. |
| 09:45–10:00 | **Casi clinici su grande schermo: Patologie del nervo periferico** | casi |  | Discussione di casi clinici ecografici proiettati su grande schermo, con analisi guidata delle immagini e confronto interattivo tra relatore e partecipanti. L’obiettivo è integrare teoria e pratica, stimolando il ragionamento clinico e l’applicazione delle conoscenze acquisite a situazioni reali. |
| 10:00–10:45 | **Focus: Lesioni muscolari** | lezione | Claudio Secci (Fisiatra) | La relazione è dedicata alle lesioni muscolari, con particolare attenzione alla classificazione, ai meccanismi di lesione e ai segni ecografici utili per una diagnosi precisa. Vengono illustrate le diverse fasi evolutive delle lesioni, le implicazioni funzionali e i criteri per il monitoraggio del recupero, evidenziando il ruolo dell’ecografia nella gestione clinica e nel ritorno all’attività. |
| 10:45–11:00 | **Basi di refertazione: Lesioni muscolari** | lezione | Claudio Secci (Fisiatra) | La relazione racchiude le basi della refertazione ecografica con un focus specifico sulle classificazioni delle lesioni muscolari. Vengono presentati modelli di referto strutturato, terminologia standardizzata e criteri descrittivi per una corretta documentazione dei reperti. Particolare attenzione è rivolta alle principali classificazioni utilizzate per le lesioni muscolari, con esempi pratici e indicazioni per l’applicazione clinica |
| 11:00–11:30 | **Coffee Station** | pausa |  |  |
| 11:30–12:15 | **Cenni di interventistica arto inferiore** | lezione | Marco Di Gesù (Fisiatra) | La relazione introduce le principali procedure interventistiche ecoguidate applicate all’arto inferiore, con cenni tecnici e clinici su infiltrazioni di acido ialuronico e collagene, tendon scraping, elettrolisi e tecniche di neuromodulazione. Vengono descritti i materiali impiegati, le indicazioni specifiche per ciascuna procedura e le modalità operative, con l’obiettivo di integrare l’interventistica nel percorso terapeutico personalizzato. |
| 12:15–13:15 | **Prove pratiche** | pratica |  | Sessione di esercitazione individuale in cui i discenti, suddivisi in gruppi, si alternano alle postazioni ecografiche per riprodurre le strutture anatomiche appena studiate. Ogni partecipante ha a disposizione 15 minuti per eseguire la scansione, con il supporto diretto del tutor. L’attività favorisce l’apprendimento attraverso la pratica e lo scambio interattivo di osservazioni e indicazioni personalizzate. |
| 13:15–14:30 | **Lunch** | pausa |  |  |
| 14:30–15:15 | **Focus: appropriatezza diagnostica e metodiche di II livello** | lezione | Giuseppe Tognini (Radiologo) | La relazione si concentra sul tema dell’appropriatezza diagnostica in ecografia, analizzando i criteri per un corretto utilizzo dell’esame ecografico e l’integrazione con le metodiche di secondo livello, come risonanza magnetica, TC e studi elettrofisiologici. Viene sottolineata l’importanza di una scelta ragionata degli strumenti diagnostici in base al quesito clinico, al fine di ottimizzare il percorso del paziente e ridurre esami inutili o ridondanti. |
| 15:15–15:45 | **Up to date: evidenze scientifiche sull'uitilizzo dell'ecografia in ambito di diagnostica muscoloscheletrica** | lezione | Alberto Monello (Fisiatra) | La relazione propone un aggiornamento sulle più recenti evidenze scientifiche riguardanti l’utilizzo dell’ecografia nella diagnostica muscoloscheletrica. Vengono analizzati studi e linee guida internazionali che ne confermano l’affidabilità, l’accuratezza e il ruolo crescente nell’inquadramento clinico, nel monitoraggio terapeutico e nell’interventistica. L’obiettivo è fornire una visione aggiornata e basata su evidenze dell’efficacia dell’ecografia nei vari ambiti della medicina muscoloscheletrica. |
| 15:45–17:45 | **Verifica finale** | organizzativo |  |  |
| 17:45–18:00 | **Consegna dei diplomi** | organizzativo |  |  |
| 18:00 | **Chiusura del corso e ringraziamenti** | organizzativo |  |  |

---

# RELATORI — `relatori.html`

## Page hero

> Blocco: `page-hero`
> Origine: intestazione pagina Relatori

**Etichetta:** RELATORI
**Titolo:** SECONDA EDIZIONE *(sul sito; i contenuti sono però quelli della 3ª edizione 2026 — da aggiornare con il cliente)*
**Navigazione interna:** Docenti · Tutor · Organizzatori

---

## Docenti

> Blocco: `speakers` (card con foto, nome, tag qualifica/ruolo, affiliazione, lista relazioni)
> Origine: sezione "Docenti". Foto: una per relatore (alt = nome), 200×300, da richiedere in alta qualità.

Tag ruolo disponibili: `Fisiatra` · `Radiologo` · `Reumatologo` · `Nefrologa` · `Medico dello sport` · `Docente` · `Tutor` · `Organizzatore` · `Com. Scientifico` · `Direttore Scuola`

### Alberto Monello
- **Tag:** Fisiatra · Docente · Com. Scientifico · Tutor
- **Affiliazione:** Fisiatra presso Poliambulatorio Medico Klinè (CT). Ecografista presso Studio di diagnostica per immagini X-Ray (Paternò-CT)
- **Relazioni:**
  - Ginocchio: anatomia base
  - Caviglia e Piede: anatomia base
  - Basi di refertazione: linee guida, modelli di refertazione e glossario
  - Up to date: evidenze scientifiche sull'utilizzo dell'ecografia in ambito di diagnostica muscoloscheletrica

### Andrea Reggiani
- **Tag:** Fisiatra · Docente · Organizzatore · Tutor
- **Affiliazione:** D/Medical, Domodossola (VB)
- **Relazioni:** Relazioni in fase di assegnazione.

### Claudio Secci
- **Tag:** Fisiatra · Docente · Organizzatore · Tutor
- **Affiliazione:** Centro Kinesis, Cagliari.
- **Relazioni:**
  - Focus: Lesioni muscolari
  - Basi di refertazione e classificazioni

### Domenico Romeo
- **Tag:** Fisiatra · Docente · Com. Scientifico · Tutor
- **Affiliazione:** Direttore sanitario del centro Physiocare, poliambulatorio medico fisiokinesiterapico, Augusta (SR)
- **Relazioni:**
  - Patologie della Caviglia e del Piede

### Domenico Albano
- **Tag:** Radiologo · Docente · Com. Scientifico
- **Affiliazione:** Università degli Studi di Milano; Ospedale Galeazzi – Sant'Ambrogio di Milano
- **Relazioni:**
  - Focus: Patologie del nervo periferico

### Emilio Filippucci
- **Tag:** Reumatologo · Docente · Com. Scientifico
- **Affiliazione:** Professore Associato di Reumatologia, Università Politecnica delle Marche, Dipartimento di Scienze Cliniche e Molecolari, Clinica Reumatologica, Ospedale "Carlo Urbani", Jesi (AN), Italia.
- **Relazioni:**
  - Focus: Ruolo dell'ecografia in reumatologia e principali scale di valutazione
  - Schemi di refertazione: patologie reumatologiche

### Francesca Lacelli
- **Tag:** Radiologo · Docente
- **Affiliazione:** Direttore Sostituto, S.C. Radiologia, P.O. Ponente, ASL 2 Savonese, Savona, Italia.
- **Relazioni:**
  - Focus: Tumefazioni e neoformazioni: come descriverle e cosa fare

### Giuseppe Tognini
- **Tag:** Radiologo · Docente · Tutor
- **Affiliazione:** Centro Diagnostico Apuano, Istituto di Ricerche Cliniche con Tecniche Avanzate, Carrara (MS), Italia.
- **Relazioni:**
  - Ecografia del muscolo: arto inferiore
  - Patologie del Gomito
  - Focus: appropriatezza diagnostica e metodiche di II livello

### Luca Latini
- **Tag:** Fisiatra · Docente · Organizzatore · Tutor
- **Affiliazione:** Centro Medico e di Fisioterapia "Salute e Benessere", Senigallia (AN), Italia.
- **Relazioni:**
  - Ecografia del nervo: arto superiore
  - Anca: anatomia base

### Marco Di Gesù
- **Tag:** Fisiatra · Docente · Com. Scientifico · Tutor
- **Affiliazione:** Responsabile Ambulatorio di Fisiatria e Fisioterapia presso "Mya Salute", Palermo.
- **Relazioni:**
  - Presentazione ANFI, Scuola di Ecografia e programma didattico
  - Setting ambulatoriale e Accessi infiltrativi dell'arto superiore
  - Cenni di interventistica dell'arto inferiore

### Filippo Narese *(sul sito: "Narese Filippo")*
- **Tag:** Radiologo · Docente · Tutor
- **Affiliazione:** Libero professionista presso Studio medico Narese e Centro Ippocrate, Caltanissetta
- **Relazioni:**
  - Patologie dell'Anca

### Nicolò Vitale
- **Tag:** Fisiatra · Docente · Direttore Scuola · Tutor
- **Affiliazione:** Medico, C.M.R., Adrano (CT), Italia.
- **Relazioni:**
  - Spalla: anatomia base e focus su prove dinamiche
  - Rachide e parete addominale: anatomia base
  - Patologie della Spalla
  - Ecografia avanzata e varianti anatomiche

### Riccardo Prezioso
- **Tag:** Fisiatra · Docente · Organizzatore · Tutor
- **Affiliazione:** Centro Dynamic, Catania; Centro Nova Salus, San Giovanni Gemini (AG).
- **Relazioni:**
  - Introduzione all'ecografia e semeiotica ecografica
  - Accessi infiltrativi dell'arto inferiore

### Valerio Amico
- **Tag:** Fisiatra · Docente · Com. Scientifico · Tutor
- **Affiliazione:** Responsabile del servizio di ecografia muscoloscheletrica e di fisiatria interventistica – G2 Medica, Catania – Roga, Enna.
- **Relazioni:**
  - Polso – Mano: anatomia base
  - Ecografia del nervo: arto inferiore
  - Patologie del Polso e della Mano
  - Patologie del Ginocchio

### Stefano Ventura
- **Tag:** Fisiatra · Docente · Tutor
- **Affiliazione:** Affidea C.D.C., Torino
- **Relazioni:**
  - Ginocchio: anatomia base

### Vincenzo Manfrè
- **Tag:** Medico dello sport · Docente · Tutor
- **Affiliazione:** Responsabile dell'Ambulatorio di Medicina Sport e patologie cardiache del Centro "Cardiolab" – Vittoria (RG)
- **Relazioni:**
  - Ecografia del muscolo: arto superiore

### Emanuele Lazzara
- **Tag:** Fisiatra · Docente · Tutor
- **Affiliazione:** Dirigente medico, Fisiatra presso UOC Medicina Generale ad Indirizzo Geriatrico Riabilitativo ARNAS Civico – Di Cristina Benfratelli – Palermo (PA); Medico Fisiatra presso Mya Rehab – Palermo (PA).
- **Relazioni:**
  - Cenni di interventistica arto superiore

### Ilaria Petrucci
- **Tag:** Nefrologa · Docente · Tutor
- **Affiliazione:** Scuola SIUMB di Ecografia ed ecocolorDoppler in Nefrologia. Perfezionamento in Ecografia clinica in Nefrologia, Scuola Superiore S. Anna – Pisa. Centro Diagnostico Apuano (Carrara-MS)
- **Relazioni:**
  - Cenni di ecografia vascolare dell'arto inferiore

---

## Tutor

> Blocco: `speakers speakers--tutor` (card compatta: foto, nome, tag, affiliazione — senza lista relazioni)
> Origine: sezione "Tutor"

| Nome | Tag | Affiliazione |
|---|---|---|
| Antonino Russo | Fisiatra · Tutor | Catania |
| Dario Licciardello | Fisiatra · Tutor | Direttore sanitario centro Movimento e Salute – Acireale |
| Federico Salvò | Fisiatra · Tutor | *(non indicata)* |
| Flavio Origlio | Fisiatra · Tutor | *(non indicata)* |
| Francesca Serpi | Radiologo · Tutor | IRCCS Ospedale Galeazzi – Sant'Ambrogio – Milano |
| Gabriele Innocenti | Medico dello sport · Tutor | Medico dello Sport presso Fisiomed s.r.l. Prato |
| Mario Pace | Radiologo · Tutor | Dottorando in medicina molecolare clinica – UNIPA |
| Riccardo De Rosa | Fisiatra · Tutor | Direttore tecnico centro "Raggi X", Sant'Antonio Abate (Na) |
| Stefano Lusi | Radiologo · Tutor | Centro D-Medical – Milano |

---

## Comitato Organizzativo e Comitato Scientifico

> Blocco: `committee` (3 colonne)
> Origine: sezione "Comitato Organizzativo e Comitato Scientifico"

**Direttore della Scuola:** Nicolò Vitale

**Comitato Organizzativo:** Andrea Reggiani · Claudio Secci · Luca Latini · Riccardo Prezioso

**Comitato Scientifico:** Alberto Monello · Domenico Albano · Domenico Romeo · Emilio Filippucci · Francesca Lacelli · Giuseppe Tognini · Luca Sconfienza · Marco Di Gesù · Valerio Amico

*(La pagina Relatori include Francesca Lacelli e Giuseppe Tognini nel Comitato Scientifico; la home no. Da allineare.)*

---

## Sponsor (pagina Relatori)

> Blocco: `sponsors`
> Origine: sezione "Sponsor" — stessi loghi della 3ª edizione: Easytech · Sonoscape · Mindray · Abiogen · B2 pharma

---

# PRENOTA — `prenota.html`

## Page hero

> Blocco: `page-hero`

**Etichetta:** PRENOTA
**Titolo:** Prenotazioni

## Dettaglio dei costi

> Blocco: `pricing` — identico alla Home (vedi sopra). Sulla card **Socio ANFI** compare la CTA secondaria **Diventa Socio** → `https://associazioneanfi.it/account-iscrizione/livelli`.

## Edizioni in corso

> Blocco: `editions` (variante con testo descrittivo e doppia CTA)
> Origine: sezione "Edizioni in corso"

**Titolo sezione:** Edizioni in corso

### QUARTA EDIZIONE — `editions__card--soldout`
- Sottotitolo: CATANIA 2027
- Periodo: Gennaio 2027 · Febbraio 2027 · Aprile 2027 · Giugno 2027 *(nella Home le date sono 16-17 Gen, 6-7 Mar, 17-18 Apr, 5-6 Giu: qui "Febbraio" vs "Marzo" — incongruenza da segnalare)*
- Testo: La pre-iscrizione per la quarta edizione è disponibile. Le date esatte e la sede sono in via di definizione. La città ospitante sarà Catania. Visita il sito del provider per effettuare la pre-iscrizione e per garantirti un posto nelle edizioni future! *(testo obsoleto: l'edizione è sold out — sul sito: "sara" [sic])*
- CTA (disabilitata): Sold Out!

### QUINTA EDIZIONE — `editions__card--open`
- Sottotitolo: Edizione settentrionale
- Periodo: Ottobre 2027 · Dicembre 2027 · Gennaio 2028 · Febbraio 2028
- Testo: La pre-iscrizione per la quinta edizione è disponibile. Le date esatte e la sede sono in via di definizione. La città ospitante sarà scelta tra una delle più grosse realtà del nord Italia. Visita il sito del provider per effettuare la pre-iscrizione e per garantirti un posto nelle edizioni future! *(sul sito: "pià" [sic])*
- CTA primaria: **Acquista ora!** → `https://fisiaforma.it/categoria-prodotto/eventi/`
- CTA secondaria: **Rimani aggiornato** → `https://145504523.hs-sites-eu1.com/interesse_scuola_anfi5` (form HubSpot)

*(Sul sito non esiste un form di iscrizione interno: l'acquisto avviene sul provider Fisiaforma e la lista d'attesa su un form HubSpot esterno.)*

---

# Dati da chiedere al cliente

- [ ] Numeri `stats` confermati (4 / 10 / 50 / 28+) e se vanno aggiornati per la 5ª edizione
- [ ] Date esatte e sede della **Quinta edizione**; link corretto della CTA "Prenota ora" (oggi punta alla 4ª)
- [ ] Risposta alla FAQ "Come posso iscrivermi alla Scuola di Ecografia?" (vuota sul sito)
- [ ] Titolo pagina Relatori ("SECONDA EDIZIONE" vs contenuti 3ª edizione) ed elenco definitivo docenti/tutor (discrepanze Home ↔ Relatori)
- [ ] Comitato Scientifico definitivo (con o senza Lacelli e Tognini)
- [ ] Mesi della Quarta edizione in Prenota (Febbraio vs Marzo)
- [ ] Foto relatori in alta risoluzione (oggi 200×300) e foto organizzatori
- [ ] Loghi sponsor in vettoriale / PNG su trasparente (su sfondo nero i PNG bianchi 300×100 attuali potrebbero non funzionare)
- [ ] Video hero (`04_Header_Desktop_HB.webm` / mobile) o immagini sostitutive
- [ ] Copertina Atlante in alta risoluzione
- [ ] PDF programma aggiornato
- [ ] Conferma dei refusi da correggere (`[sic]` nel documento)
- [ ] Conferma link Login → Area membri ANFI e destinazione CTA "Prenota il corso"
