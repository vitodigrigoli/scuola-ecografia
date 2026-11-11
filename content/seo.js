/* Metadati SEO di ogni pagina e dati strutturati (JSON-LD), letti da build-pages.js.
   - title: ≤ 60 caratteri, il nome della Scuola in coda;
   - description: ~150 caratteri, diversa per ogni pagina (è il testo sotto il titolo su Google);
   - breadcrumb: nome della pagina nel percorso Home › Pagina (dati strutturati).
   L'indirizzo del sito (canonico, Open Graph, sitemap) è config.siteUrl.
   I dati del corso riprendono solo quello che è già scritto sul sito: se cambiano edizioni,
   date o prezzi in home, vanno aggiornati anche qui. */

/* Il marchio è «Scuola di Ecografia»: oggi offre il corso di ecografia muscoloscheletrica, in futuro
   anche altri. Il nome del sito e dell'organizzazione è quindi generico; «muscoloscheletrica»
   descrive il corso (CORSO), non la scuola. */
const NOME = 'Scuola di Ecografia';
const CORSO = 'Corso di Ecografia Muscoloscheletrica';

const pagine = {
  home: {
    title: 'Scuola di Ecografia · Corso di ecografia muscoloscheletrica',
    description: 'Corso di ecografia muscoloscheletrica per medici: 4 weekend tra lezioni, live ecografiche e prove pratiche, con un tutor ogni 5 discenti.',
  },
  metodo: {
    title: 'Il metodo didattico · Scuola di Ecografia',
    description: "Lezione, live ecografica e prove pratiche alla postazione: come la Scuola insegna l'ecografia muscoloscheletrica, e perché.",
    breadcrumb: 'Il metodo',
  },
  programma: {
    title: 'Programma del corso · Scuola di Ecografia',
    description: 'Quattro incontri: arto superiore, arto inferiore, rachide e parete addominale, quadri patologici e refertazione. Orari e docenti di ogni giornata.',
    breadcrumb: 'Programma',
  },
  relatori: {
    title: 'Docenti e tutor · Scuola di Ecografia',
    description: 'Fisiatri, radiologi, reumatologi e medici dello sport: i 18 docenti e i 9 tutor della Scuola, con affiliazioni e relazioni.',
    breadcrumb: 'Relatori',
  },
  prenota: {
    title: 'Iscrizione e costi · Scuola di Ecografia',
    description: 'Quote per soci ANFI, non soci e specializzandi, pagamento in due rate e date delle prossime edizioni. Iscrizione su Fisiaforma.',
    breadcrumb: 'Prenota',
  },
  'privacy-policy': {
    title: 'Privacy Policy · Scuola di Ecografia',
    description: 'Come la Scuola di Ecografia tratta i dati di chi visita il sito: titolare, finalità, conservazione e diritti.',
    breadcrumb: 'Privacy Policy',
  },
  'cookie-policy': {
    title: 'Cookie Policy · Scuola di Ecografia',
    description: 'Quali informazioni il sito salva nel browser, quali cookie usa Google Analytics con il tuo consenso e come cambiare scelta.',
    breadcrumb: 'Cookie Policy',
  },
};

/* Dati strutturati della home: chi è la Scuola e quale corso offre, con le edizioni */
function home(siteUrl) {
  const org = {
    '@type': 'EducationalOrganization',
    '@id': siteUrl + '/#scuola',
    name: NOME,
    url: siteUrl + '/',
    logo: siteUrl + '/assets/favicon/icon-512.png',
    email: 'segreteria@scuoladiecografia.com',
    parentOrganization: { '@type': 'Organization', name: 'Associazione Nazionale Fisiatria Interventistica (ANFI)' },
  };
  const luogo = (name, street, postalCode, city) => ({
    '@type': 'Place',
    name,
    address: { '@type': 'PostalAddress', streetAddress: street, postalCode, addressLocality: city, addressCountry: 'IT' },
  });
  const quota = (name, price) => ({
    '@type': 'Offer',
    name,
    category: 'Paid',
    price,
    priceCurrency: 'EUR',
    priceSpecification: { '@type': 'UnitPriceSpecification', price, priceCurrency: 'EUR', valueAddedTaxIncluded: false },
    url: siteUrl + '/prenota.html',
    seller: { '@type': 'Organization', name: 'Fisiaforma S.R.L.' },
  });
  const corso = {
    '@type': 'Course',
    '@id': siteUrl + '/#corso',
    name: CORSO,
    description: 'Percorso di formazione in ecografia muscoloscheletrica riservato ai medici: quattro weekend di lezioni teoriche, live ecografiche e prove pratiche alle postazioni, con un tutor ogni cinque discenti.',
    inLanguage: 'it',
    provider: { '@id': siteUrl + '/#scuola' },
    educationalLevel: 'Formazione post-laurea per medici',
    offers: [quota('Socio ANFI', 2200), quota('Non socio ANFI', 2300), quota('Specializzando', 2000)],
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        name: 'Terza edizione · Torino 2026',
        courseMode: 'Onsite',
        startDate: '2026-04-11',
        endDate: '2026-12-13',
        location: luogo('J|Hotel', 'Via Traves 40', '10151', 'Torino'),
      },
      {
        '@type': 'CourseInstance',
        name: 'Catania 2027',
        courseMode: 'Onsite',
        startDate: '2027-01-16',
        endDate: '2027-06-06',
        location: luogo('Il Principe Hotel', 'Via Alessi 24', '95124', 'Catania'),
      },
      {
        '@type': 'CourseInstance',
        // date non ancora definite (sul sito solo i mesi): solo città, iscrizioni aperte
        name: 'Quinta edizione · Bergamo 2027 · iscrizioni aperte',
        courseMode: 'Onsite',
        location: { '@type': 'Place', name: 'Bergamo', address: { '@type': 'PostalAddress', addressLocality: 'Bergamo', addressCountry: 'IT' } },
      },
    ],
  };
  return [org, corso];
}

/* Percorso Home › Pagina per le pagine interne */
function breadcrumb(siteUrl, nome, url) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' },
      { '@type': 'ListItem', position: 2, name: nome, item: url },
    ],
  };
}

module.exports = { NOME, CORSO, pagine, home, breadcrumb };
