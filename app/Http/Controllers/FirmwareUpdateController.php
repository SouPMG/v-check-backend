<?php

namespace App\Http\Controllers;

use App\Mail\FirmwareUpdateAvailable;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class FirmwareUpdateController extends Controller
{
    /**
     * Display firmware update frontend page.
     */
    public function home()
    {
        $emails = Message::select('email')->groupBy('email')->get();

        return Inertia::render('FirmwareUpdate', [
            'users' => $emails,
        ]);
    }

    /**
     * Send firmware update email notification.
     */
    public function notifyFirmwareUpdate(Request $request)
    {
        $validated = $request->validate([
            'version' => 'required|string',
            'link' => 'required|string',
            'changelog' => 'required|string',
            'emails' => 'required|array|min:1',
            'emails.*' => 'required|email|exists:messages,email',
        ]);

        foreach ($validated['emails'] as $email) {
            Mail::to($email)->send(new FirmwareUpdateAvailable($validated['version'], $validated['link'], nl2br($validated['changelog'])));
        }

        return to_route('update.home');
    }
}
