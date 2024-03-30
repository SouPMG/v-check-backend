<x-mail::message>
    <p>Caro utente,</p>
    <p>Siamo entusiasti di annunciare il lancio del nostro ultimo aggiornamento software! Questo nuovo aggiornamento porta con sé molte migliorie e stabilità del sistema.</p>
    <p>Le novità sono:</p>
    <p>{!! $changelog !!}</p>
    <p>Per scaricare subito l'aggiornamento, basta fare clic sul seguente pulsante:</p>
    <x-mail::button :url="$link">
        Firmware v{{ $newVersion }}
    </x-mail::button>
    <p>Per installare il nuovo aggiornamento segui la procedura inserita nel manuale d'istruzioni dopo che hai scaricato il file dal link.</p>
    <p>Se hai bisogno di assistenza nell'installazione o hai domande sull'aggiornamento, non esitare a contattare il nostro supporto tecnico allo stesso indirizzo mail di questa notifica.</p>
    <p>Grazie per l'uso continuo del nostro prodotto e per il tuo feedback prezioso.</p>
    <p>Ci impegniamo a migliorare costantemente la tua esperienza.</p>
    <p>Cordiali saluti,<br> Il Team di V-check</p>
</x-mail::message>