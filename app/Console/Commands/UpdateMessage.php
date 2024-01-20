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
    protected $signature = 'message:update {state=1}';

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
        $message = Message::where('email', 'mattia.giacobbe@gmail.com')
            ->where('state', $state)
            ->where('sn', '00000002')
            ->first();

        if (!is_null($message)) {
            $message->touch();
            $message->save();
        }
    }
}
