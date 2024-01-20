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
    protected $signature = 'message:update';

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
        $message = Message::where('email', 'mattia.giacobbe@gmail.com')
            ->where('sn', '00000002')
            ->first();

        if (!is_null($message)) {
            $message->touch();
            $message->save();
        }
    }
}
