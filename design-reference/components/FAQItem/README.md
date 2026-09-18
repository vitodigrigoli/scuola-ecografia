Voce di accordion per la sezione FAQ. Come sul sito reale di Learnn, è un elemento `<details>/<summary>` nativo, non un componente JS custom: mantieni questa scelta, è più accessibile e robusta. I segni "+"/"–" restano caratteri tipografici semplici (non emoji, non icone), come nell'originale.

**Fornisci:** domanda (va nel `<summary>`), risposta (testo semplice, può contenere link).

**Quando usarlo:** in lista verticale, ogni voce è una card `surface-card` indipendente (non un'unica lista con divisori interni). Più voci possono restare aperte insieme.

**Non fare:** non sostituire `<details>/<summary>` con un div/JS custom senza una ragione forte. Non usare `radius-xl` (quella è delle course card): la voce FAQ ha il suo raggio dedicato, `radius-md`.
