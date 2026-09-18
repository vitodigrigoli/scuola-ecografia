## Fondamenti di contenuto

Scrivi in italiano, in seconda persona diretta ("tu", mai forme impersonali o "Lei"), con un registro clinico ma accessibile: il pubblico sono professionisti sanitari (fisioterapisti, medici) in formazione continua, non pazienti. Nomina sempre con precisione l'ambito (ecografia muscoloscheletrica), mai genericamente "ecografia".

Vai dritto al risultato pratico: preferisci frasi che nominano un'azione o un numero concreto a claim generici, come fa Learnn ("310K+ iscritti" diventa, per questa piattaforma, "X moduli", "Y relatori", una data di edizione).

Nelle citazioni (testimonial) mantieni la voce originale della persona, breve e concreta, sempre firmata con nome/iniziale e ruolo ("M. Rossi, Fisioterapista"), mai anonima.

Nei tag di categoria scrivi il distretto anatomico o l'ambito, corto (1-3 parole): "Spalla", "Ginocchio", "Distretto lombare".

**Niente emoji, in nessun punto dell'interfaccia.** È l'unica differenza di principio rispetto a Learnn: il sito reale usa emoji per tag e badge ("🎯", "⚡") e simboli tipografici come icone (il carattere "✓" nelle liste, "★" nelle valutazioni). Su questa piattaforma ogni emoji e ogni simbolo tipografico-come-icona è sostituito da un'icona SVG del set `Icons` — scelta esplicita del cliente, comunicata come vincolo per questo progetto specifico.

I contenuti reali di corsi, programma, relatori e prenotazione arriveranno dalle pagine ANFI (associazioneanfi.it/scuola/...): finché non sono stati importati, ogni testo di corso/relatore in questo sistema è segnaposto esplicito, non un fatto reale — non trattarlo come contenuto pubblicabile.

## Fondamenti visivi

**Colori e componenti sono quelli di Learnn**, non un nuovo sistema: i valori del tema dark in `tokens.json` sono gli stessi letti dal sito reale learnn.com, e gli otto componenti (`Button`, `Badge`, `CourseCard`, `PricingCard`, `TestimonialCard`, `Header`, `FAQItem`, `Cover`) ne replicano struttura e stile. Le uniche estensioni sono quelle esplicitamente richieste per questa piattaforma: un tema `light` parallelo (assente su Learnn, che è esclusivamente dark), il font, il logo, il set di icone SVG e il componente `ThemeToggle`.

**Due temi, non uno.** Il tema di default resta `dark` (il tema reale di Learnn) — non invertire l'ordine dei temi in `tokens.json`, la prima voce è quella con cui la piattaforma si apre. Il tema `light` è una mia estensione coerente: stessa struttura di superfici (`surface-page` → `surface-card` → `surface-elev-*`), stesso viola `accent` invariato nei due temi, testo invertito (`ink` da bianco a quasi-nero). Il bottone `cta-primary-bg` resta l'unica superficie ad alto contrasto invertito rispetto al fondo in ciascun tema: bianco su dark, quasi-nero su light — mai lo stesso colore nei due temi.

**Colore.** Il viola `accent` (#A855F7) è l'unico colore che segnala enfasi o interattività in tutto il sistema, in entrambi i temi: icone `check` nelle liste funzionalità, badge in evidenza, bordo/ombra (`accent-border` + `shadow-accent-glow`, sempre insieme) della card in evidenza. Non introdurre altri colori per segnalare enfasi. `accent-secondary` (periwinkle) resta riservato a ciò che è generato o assistito da un sistema automatico. Il degradé `avatar-gradient-start` → `avatar-gradient-end` è riservato agli avatar segnaposto con iniziali.

**Tipografia.** Learnn usa Messina Sans, un font commerciale a licenza propria; questa piattaforma usa **DM Sans**, gratuito su Google Fonts — dichiaralo sempre con fallback di sistema. La scala tipografica (dimensioni, pesi, interlinea di `h1`/`h2`/`h3`/`price`/`body`/`label`...) resta invariata rispetto a Learnn.

**Spaziatura e forma.** Scala di spaziatura, raggi (`radius-btn` dedicato alle CTA, `radius-xl` per le course card, `radius-pill` per badge/tag/toggle) e il principio "bordi, non ombre" restano quelli di Learnn, invariati.

## Iconografia

Learnn non usa un set di icone SVG: usa emoji per tag e badge, il carattere "✓" per le spunte, "★" per le valutazioni. Su questa piattaforma, per istruzione esplicita del cliente, ogni emoji e ogni simbolo tipografico-come-icona è un'icona SVG del set `Icons` — 24×24 (o piena per `star`/`zap`), colore sempre `currentColor`, mai un colore fisso incorporato. Non introdurre una nuova icona fuori da questo set.

## Il toggle giorno/notte

`ThemeToggle` non esiste su Learnn: è un controllo a pillola con le icone `sun`/`moon` del set `Icons`, sempre nella barra di navigazione. La notte (`dark`) è lo stato di apertura predefinito per ogni nuovo utente, coerente con il fatto che il tema dark è quello reale di Learnn da cui questo sistema parte.

## Logo

Il logotipo (`scuola-ecografia-wordmark.png`, bianco, sfondo trasparente) sostituisce il logo Learnn nel componente `Header`. È disegnato in bianco pieno: funziona su `surface-page` del tema dark, sparisce su fondo chiaro — sul tema `light` va sempre su uno sfondo scuro dedicato, mai direttamente sulle superfici chiare.
