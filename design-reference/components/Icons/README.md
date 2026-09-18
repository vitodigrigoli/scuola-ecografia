Il set completo di icone SVG del sistema — sostituisce ogni emoji e ogni simbolo tipografico decorativo (✓, ★, ⚡) che Learnn usa sul sito reale. Questa sostituzione è una scelta esplicita del cliente per questa piattaforma, diversa dall'originale Learnn.

**Fornisci:** nessun parametro di contenuto: un'icona è sempre una delle 11 di questo set, mai una nuova disegnata al volo per un singolo punto dell'interfaccia.

**Quando usarlo:** `check` sostituisce il carattere "✓" nelle liste funzionalità della card pricing. `star` sostituisce "★" nella valutazione delle testimonial (sempre 5 icone, piene o vuote). `zap` sostituisce l'emoji "⚡" sul badge "Il più scelto". `tag` sostituisce l'emoji di categoria (es. "🎯") sui badge/card corso. `book` per corsi e moduli, `calendar` per date e la pagina di prenotazione, `play` per avviare una lezione, `chevron-right` per navigazione, `close` per chiudere, `sun`/`moon` solo nel componente `ThemeToggle`.

**Non fare:** non colorare un'icona con un colore fisso nell'SVG — eredita sempre `currentColor` dal testo circostante. Non mescolare un'icona riempita (`fill`) tra queste: sono tutte a tratto, tranne `star` e `zap` che sono piene per restare leggibili anche a dimensioni molto piccole (badge, valutazioni).
