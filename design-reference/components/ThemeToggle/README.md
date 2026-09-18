Il controllo per passare tra modalità notte (default) e modalità giorno — non esiste sul sito reale di Learnn (che è esclusivamente dark), è un'aggiunta esplicita richiesta dal cliente per questa piattaforma.

**Fornisci:** stato corrente (`dark` o `light`) — nient'altro: la posizione del cerchietto attivo deriva da questo unico valore.

**Quando usarlo:** una sola istanza per piattaforma, sempre nella barra di navigazione (`Header`). Non duplicarlo in più punti della stessa vista.

**Non fare:** non usare icone diverse da `sun`/`moon` del set `Icons`. Non impostare `light` come stato iniziale: ogni nuova sessione utente parte da `dark`, come da istruzione esplicita del cliente.
