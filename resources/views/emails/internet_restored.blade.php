<x-mail::message>
    <h1>La tua linea internet è tornata operativa!</h1>
    <p>Tempo trascorso da quando è iniziato il disservizio: {{ $downtime_delta }}.</p>
    <p>Di seguito troverai le informazioni relative al tuo dispositivo:</p>
    <x-mail::table>
        | Codice seriale| IP | Versione firmware |
        | :-----: | :-----: | :-----: |
        | {{ $v_message->sn }} | {{ $v_message->ip }} | {{ $v_message->frm }} |
    </x-mail::table>
</x-mail::message>