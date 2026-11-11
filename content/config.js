/* Interruttori del sito, letti dai generatori (build-pages.js, build-metodo.js).
   Dopo una modifica: node content/build-metodo.js && node content/build-pages.js */
module.exports = {
  /* Indirizzo pubblico del sito, senza barra finale: URL canonici, Open Graph, sitemap.xml */
  siteUrl: 'https://scuoladiecografia.com',

  /* Casi clinici: false = sezione nascosta (niente pagine generate, niente voce nel menu,
     niente rimandi dalle altre pagine). I sorgenti restano in content/ (build-casi.js,
     build-caso.js, content/casi/): per riattivarla basta rimettere true e rigenerare,
     dopo aver lanciato anche build-casi.js e build-caso.js. */
  casiOnline: false,

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
     (anteprima). Mettere true quando il sito è online su scuoladiecografia.com. */
  indicizzabile: false,
};
