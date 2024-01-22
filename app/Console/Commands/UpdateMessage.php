<?php

namespace App\Console\Commands;

use App\Models\Message;
use Illuminate\Console\Command;

class UpdateMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'message:update {sn} {state=1}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run a test message update';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $state = $this->argument('state');
        $sn = $this->argument('sn');
        $message = Message::where('sn', $sn)
            ->where('state', $state)
            ->first();

        if (!is_null($message)) {
            $message->alert_sent = false;
            $message->touch();
            $message->save();
        }
    }
}
