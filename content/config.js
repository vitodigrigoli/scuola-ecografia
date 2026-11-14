/* Interruttori del sito, letti dai generatori (build-pages.js, build-metodo.js).

   Due profili:
     - ANTEPRIMA (default, GitHub Pages): tutte le pagine visibili per la revisione, niente
       indicizzazione. Si genera con i soliti comandi, es.
       node content/build-metodo.js && node content/build-pages.js
     - PRODUZIONE (scuoladiecografia.com su SiteGround): pagine non ancora pronte nascoste
       (Il metodo, casi clinici), indicizzazione attiva. Si genera SOLO con  node content/pubblica.js , che crea lo
       zip da caricare e poi rimette il repository in anteprima. */
const produzione = process.env.SITO === 'produzione';

module.exports = {
  produzione,

  /* Indirizzo pubblico del sito, senza barra finale: URL canonici, Open Graph, sitemap.xml */
  siteUrl: 'https://scuoladiecografia.com',

  /* Casi clinici: visibili in anteprima, nascosti in produzione. false = sezione nascosta (niente pagine generate, niente voce nel menu,
     niente rimandi dalle altre pagine). I sorgenti restano in content/ (build-casi.js,
     build-caso.js, content/casi/): per pubblicarla mettere true. */
  casiOnline: !produzione,

  /* Pagina «Il metodo»: visibile in anteprima, nascosta in produzione. false = nascosta (niente metodo.html, niente voce nel menu né in sitemap).
     Il sorgente resta in content/ (build-metodo.js, pages/metodo.html): per pubblicarla mettere true. */
  metodoOnline: !produzione,

  /* Pulsante «Login» nell'header (area soci ANFI): false = nascosto, per ora. */
  loginOnline: false,

  /* Google Analytics 4: ID del tag Google, vuoto = GA4 spento. Vale sia il contenitore
     ("GTM-XXXXXXX", con GA4 configurato dentro: è quello in uso) sia l'ID di misurazione GA4
     ("G-XXXXXXXXXX"). Attenzione: con un contenitore GTM tutto ciò che vi si aggiunge (altri tag,
     pixel) parte con lo stesso consenso «statistiche»: prima va aggiunto alle policy.
     Con l'ID impostato:
       - l'avviso cookie diventa una richiesta di consenso (Accetta / Rifiuta);
       - GA4 viene caricato SOLO dopo "Accetta" (js/consent.js), mai prima;
       - nel footer compare "Preferenze cookie" per cambiare scelta;
       - Privacy e Cookie Policy mostrano le sezioni su GA4 (blocchi <!-- se:ga4 -->).
     Non incollare lo snippet di Google nelle pagine: partirebbe senza consenso. */
  ga4Id: 'GTM-NHTPWQXG',

  /* ID di misurazione della proprietà GA4 (Amministrazione → Stream di dati): dà il nome al
     cookie _ga_<ID> scritto nella Cookie Policy. Con un contenitore GTM non si ricava da ga4Id. */
  ga4MeasurementId: 'G-N50D4XPGHL',

  /* Indicizzazione nei motori di ricerca: false = <meta name="robots" content="noindex">
     (anteprima su GitHub Pages); in produzione indicizzabile. */
  indicizzabile: produzione,
};
