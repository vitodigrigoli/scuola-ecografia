/* Genera content/pages/metodo.html: il razionale della Scuola, scelta per scelta.
   I feedback dei discenti sono quelli della home (una sola fonte).
   Uso: node content/build-metodo.js && node content/build-pages.js */
const fs = require('fs');
const path = require('path');
const config = require('./config');

const home = fs.readFileSync(path.join(__dirname, 'pages', 'home.html'), 'utf8');
const ic = (n) => `<svg class="icon" aria-hidden="true"><use href="#icon-${n}"/></svg>`;

function section(marker) {
  const start = home.indexOf(`    <!-- ============================== ${marker}`);
  if (start < 0) throw new Error('sezione non trovata: ' + marker);
  const next = home.indexOf('    <!-- ==============================', start + 10);
  return home.slice(start, next < 0 ? undefined : next).trimEnd();
}

// tile con icona: titolo + testo
const scelta = (icon, title, text) => `          <div class="features__item">
            <span class="features__sign" aria-hidden="true"><svg class="icon"><use href="#icon-${icon}"/></svg></span>
            <h3 class="features__title">${title}</h3>
            <p class="features__text">${text}</p>
          </div>`;

const passo = (icon, title, items, foto) => `          <div class="percorso__step">
            <figure class="percorso__media"><img src="assets/img/scuola/${foto.src}.webp" alt="${foto.alt}" width="900" height="600" loading="lazy"></figure>
            <span class="percorso__sign" aria-hidden="true"><svg class="icon"><use href="#icon-${icon}"/></svg></span>
            <h3 class="percorso__title">${title}</h3>
            <ul class="percorso__list">
${items.map(t => `              <li class="percorso__item">${ic('check')}${t}</li>`).join('\n')}
            </ul>
          </div>`;

// card con una cifra in evidenza: valore (+ unità) / titolo / testo
const cifra = (value, unit, title, text) => `          <div class="features__item">
            <p class="features__figure">${value}${unit ? `<span class="features__unit">${unit}</span>` : ''}</p>
            <h3 class="features__title">${title}</h3>
            <p class="features__text">${text}</p>
          </div>`;

// Feedback: stesse recensioni della home, con titolo e ancora propri
const feedback = section('TESTIMONIALS')
  .replace('id="recensioni"', 'id="feedback"')
  .replace('<p class="text-block__eyebrow">Recensioni</p>', '<p class="text-block__eyebrow">Feedback</p>')
  .replace('id="testimonials-title">Dicono della Scuola</h2>', 'id="testimonials-title">Il metodo visto dai discenti</h2>')
  .replace(/\s*<p class="text-block__text">Le voci di chi ha frequentato[^\n]*<\/p>/, '');

const page = `    <!-- ============================== PAGE HERO ============================== -->
    <section class="hero hero--compact hero--centered" aria-labelledby="page-title">
      <div class="hero__inner container">
        <div class="hero__content">
          <p class="hero__badge"><span class="hero__badge-dot" aria-hidden="true"></span>Il razionale della Scuola</p>
          <h1 class="hero__title" id="page-title">Il metodo: <span class="hero__title-accent">ogni scelta ha un perché</span></h1>
          <p class="hero__subtitle">Incontri distanziati, argomenti che tornano, quindici minuti di scansione a testa: qui spieghiamo il ragionamento che sta dietro al modo in cui insegniamo l'ecografia muscoloscheletrica.</p>
          <div class="hero__actions">
            <a class="btn btn--primary btn--lg" href="prenota.html">Prenota il corso ${ic('arrow-right')}</a>
            <a class="btn btn--secondary btn--lg" href="programma.html">Scopri il programma ${ic('arrow-right')}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== SCHEMA (percorso --connected) ============================== -->
    <section class="section percorso percorso--connected" id="schema" aria-labelledby="schema-title">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">Spiegazione e prove pratiche</p>
          <h2 class="text-block__title" id="schema-title">Ogni argomento segue lo stesso schema</h2>
          <p class="text-block__text">Prima capisci, poi guardi come si fa, poi lo fai. Lo stesso ritmo, ripetuto per ogni distretto, così l'attenzione resta sul contenuto e non sull'organizzazione.</p>
        </div>

        <div class="percorso__steps">
${passo('book', 'La lezione', ['Anatomia e riferimenti ecografici del distretto', 'Quello che serve per orientarsi alla postazione'], { src: 'lezione', alt: "L'aula durante una lezione teorica, con le immagini ecografiche proiettate" })}
${passo('eye', 'La live ecografica', ['Il docente esegue la scansione proiettata a schermo', "Si vedono insieme l'immagine, il docente e il paziente in posizione"], { src: 'live', alt: 'Un docente commenta le immagini ecografiche sul monitor davanti ai discenti' })}
${passo('probe', 'Le prove pratiche', ['Si riproduce subito quello che si è appena visto', 'Alla postazione, con il tutor accanto'], { src: 'prove-pratiche', alt: 'Un tutor alla postazione ecografica con un gruppo di discenti' })}
        </div>
      </div>
    </section>

    <!-- ============================== SCELTE (features--icons --inline) ============================== -->
    <section class="section features features--icons features--inline" id="scelte" aria-labelledby="scelte-title">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">Le scelte didattiche</p>
          <h2 class="text-block__title" id="scelte-title">Perché la Scuola è fatta così</h2>
        </div>
        <div class="features__grid">
${scelta('calendar', 'Perché gli incontri sono distanziati', "L'ecografia è una competenza manuale e si consolida con il tempo. Tra un incontro e l'altro si studia, si prova in ambulatorio e si torna con dubbi concreti da portare a docenti e tutor.")}
${scelta('clock', 'Perché gli argomenti tornano tre volte', 'La ridondanza è voluta: ogni argomento viene ripreso tre volte. Quello che al primo passaggio è un concetto, al terzo diventa un gesto che si riconosce e si sa ripetere.')}
${scelta('stethoscope', 'Perché i focus', "Rachide, nervo periferico, neoformazioni, lesioni muscolari, patologie reumatiche: alcuni temi chiedono uno sguardo dedicato. I focus li affrontano in sessioni a sé, affidate anche a radiologi e reumatologi.")}
${scelta('document', 'Perché le simulazioni di refertazione', "Vedere non basta: quello che si vede va scritto in modo chiaro e utile per chi legge. Le simulazioni allenano il passaggio dall'immagine al referto, in un contesto in cui si può sbagliare e correggersi.")}
${scelta('message', 'Perché il glossario', 'Un referto funziona se tutti danno alle parole lo stesso significato. Il glossario fissa una terminologia comune tra discenti, tutor e docenti, e la porta nella pratica di ogni giorno.')}
${scelta('eye', 'Perché il libro e perché le live', "Il libro è il riferimento da riaprire quando serve. La live mostra quello che su carta non si vede: come si muove la sonda, come si posiziona il paziente, come ragiona chi esegue l'esame.")}
        </div>
      </div>
    </section>

    <!-- ============================== PRATICA (text-block + features--figures) ============================== -->
    <section class="section features features--figures features--cols-3" id="pratica" aria-labelledby="pratica-title">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">La parte pratica</p>
          <h2 class="text-block__title" id="pratica-title">L'ecografia si impara con la sonda in mano</h2>
          <p class="text-block__text">La parte pratica non è un complemento della teoria: è il punto in cui la teoria diventa competenza. Per questo il tempo alla postazione è organizzato quanto quello in aula.</p>
        </div>

        <figure class="photo">
          <img src="assets/img/scuola/postazione-1600.webp" srcset="assets/img/scuola/postazione-900.webp 900w, assets/img/scuola/postazione-1600.webp 1600w" sizes="(max-width: 1340px) 100vw, 1240px" alt="Una discente esegue la scansione della gamba guardando l'ecografo, con il tutor in piedi accanto" width="1600" height="700" loading="lazy">
        </figure>

        <div class="features__grid">
${cifra('15', 'min', 'Di scansione per ogni discente', "Ognuno esegue la scansione con il supporto diretto del tutor. Quando non è il proprio turno osserva il collega: le correzioni del tutor servono a tutto il gruppo.")}
${cifra('5', '', 'Discenti per ogni tutor', "Alla postazione la qualità dipende da chi sta accanto al discente. Per questo i tutor seguono un percorso di affiancamento che li prepara a insegnare con lo stesso metodo.")}
${cifra('12', '', 'Postazioni ecografiche', "Ogni postazione ha il suo tutor e cinque discenti: per questo i posti sono 60. I gruppi lavorano in parallelo, così le prove pratiche non si allungano nell'attesa del turno.")}
        </div>
      </div>
    </section>

    <!-- ============================== AMBITI (features--icons --cols-3) ============================== -->
    <section class="section features features--icons features--cols-3" id="ambiti" aria-labelledby="ambiti-title">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">Che cosa si studia</p>
          <h2 class="text-block__title" id="ambiti-title">Articolazioni, muscoli, nervo</h2>
          <p class="text-block__text">Tre ambiti che accompagnano tutto il programma, dalla sono-anatomia alla patologia.</p>
        </div>
        <div class="features__grid">
          <div class="features__item">
            <span class="features__sign" aria-hidden="true"><svg class="icon"><use href="#icon-joint"/></svg></span>
            <h3 class="features__title">Articolazioni</h3>
            <p class="features__text">Spalla, gomito, polso e mano per l'arto superiore; anca, ginocchio, caviglia e piede per l'arto inferiore.</p>
          </div>
          <div class="features__item">
            <span class="features__sign" aria-hidden="true"><svg class="icon"><use href="#icon-muscle"/></svg></span>
            <h3 class="features__title">Muscoli</h3>
            <p class="features__text">Braccio, avambraccio, coscia e gamba: anatomia ecografica e lesioni muscolari.</p>
          </div>
          <div class="features__item">
            <span class="features__sign" aria-hidden="true"><svg class="icon"><use href="#icon-nerve"/></svg></span>
            <h3 class="features__title">Nervo</h3>
            <p class="features__text">Dal riconoscimento del nervo periferico alla sua patologia.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== MATERIALE (media-text) ============================== -->
    <section class="section media-text media-text--contain" id="materiale" aria-labelledby="materiale-title">
      <div class="media-text__inner container">
        <div class="media-text__content">
          <div class="text-block text-block--flush">
            <p class="text-block__eyebrow">Materiale didattico</p>
            <h2 class="text-block__title" id="materiale-title">Il materiale che forniamo</h2>
            <p class="text-block__text">Il materiale accompagna lo studio tra un incontro e l'altro, e resta come riferimento nella pratica clinica dopo la fine della Scuola.</p>
            <ul class="text-block__facts">
              <li class="text-block__fact">${ic('book')}Atlante illustrato di ecografia muscoloscheletrica</li>
              <li class="text-block__fact">${ic('document')}Schemi di refertazione ecografica</li>
              <li class="text-block__fact">${ic('image')}Tavole anatomiche muscolari</li>
            </ul>
          </div>
        </div>

        <div class="media-text__media">
          <figure class="media-text__figure">
            <img src="assets/img/atlante-cover.png" alt="Copertina dell'Atlante illustrato di Ecografia Muscoloscheletrica, P. Barceló e I. Iriarte, edizione italiana a cura di Riccardo De Rosa" width="968" height="1024" loading="lazy">
          </figure>
        </div>
      </div>
    </section>

    <!-- ============================== DOPO LA SCUOLA (features --cols-3) ============================== -->
    <section class="section features features--icons features--cols-${config.casiOnline ? 3 : 2}" id="community" aria-labelledby="community-title">
      <div class="container">
        <div class="text-block text-block--split">
          <p class="text-block__eyebrow">Dopo la Scuola</p>
          <h2 class="text-block__title" id="community-title">Una community, oltre il corso</h2>
          <p class="text-block__text">La formazione non finisce con l'ultimo incontro: chi ha frequentato la Scuola resta in contatto con docenti, tutor e colleghi.</p>
        </div>
        <div class="features__grid">
${config.casiOnline ? `          <div class="features__item">
            <span class="features__sign" aria-hidden="true"><svg class="icon"><use href="#icon-image"/></svg></span>
            <h3 class="features__title">Casi clinici</h3>
            <p class="features__text">Un caso nuovo ogni mese: anamnesi, esame obiettivo e immagini. Prova a refertare, poi confronta il tuo ragionamento con quello dell'autore.</p>
            <ul class="features__list"><li><a href="casi-clinici.html">Vai ai casi clinici</a></li></ul>
          </div>
` : ''}          <div class="features__item">
            <span class="features__sign" aria-hidden="true"><svg class="icon"><use href="#icon-mail"/></svg></span>
            <h3 class="features__title">Newsletter</h3>
            <p class="features__text">Casi, aggiornamenti e novità della Scuola arrivano direttamente via email, per tenere vivo quello che si è imparato.</p>
          </div>
          <div class="features__item">
            <span class="features__sign" aria-hidden="true"><svg class="icon"><use href="#icon-users"/></svg></span>
            <h3 class="features__title">Community</h3>
            <p class="features__text">Colleghi con cui confrontarsi su un'immagine dubbia e un linguaggio condiviso per farlo: è quello che resta dopo l'ultimo weekend.</p>
          </div>
        </div>
      </div>
    </section>

${feedback}

    <!-- ============================== CTA (cta-banner) ============================== -->
    <section class="section cta-banner cta-banner--glow" id="iscrizione" aria-labelledby="cta-title">
      <div class="cta-banner__inner container">
        <h2 class="cta-banner__title" id="cta-title">Vuoi provare il metodo <em>di persona?</em></h2>
        <p class="cta-banner__text">Le prenotazioni per Bergamo 2027 sono aperte.</p>
        <div class="cta-banner__actions">
          <a class="btn btn--primary btn--lg" href="prenota.html">Prenota il corso ${ic('arrow-right')}</a>
          <a class="btn btn--secondary btn--lg" href="programma.html">Scopri il programma</a>
        </div>
      </div>
    </section>
`;

fs.writeFileSync(path.join(__dirname, 'pages', 'metodo.html'), page);
console.log('metodo.html generato (feedback ripresi dalla home)');
