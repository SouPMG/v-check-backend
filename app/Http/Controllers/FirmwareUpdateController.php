<?php

namespace App\Http\Controllers;

use App\Mail\FirmwareUpdateAvailable;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FirmwareUpdateController extends Controller
{
    /**
     * Display firmware update frontend page.
     */
    public function home()
    {
        $emails = Message::select('email')->groupBy('email')->get();
        $firmwares = $this->listFirmwarePackages();

        return Inertia::render('FirmwareUpdate', [
            'users' => $emails,
            'firmwares' => $firmwares,
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

    /**
     * Upload a new firmware package.
     */
    public function uploadFirmwarePackage(Request $request)
    {
        $request->validate([
            'package' => 'required|file|max:10240',
        ]);
        $file = $request->file('package');
        $originalName = $file->getClientOriginalName();

        // Salva il file usando il nome originale
        $file->storeAs('public/firmwares', $originalName);

        return to_route('update.home');
    }

    /**
     * Return a list of uploaded firmware packages.
     */
    public function listFirmwarePackages()
    {
        $files = Storage::files('public/firmwares');

        $fileLinks = array_map(function ($file) {
            return [
                'name' => basename($file),
                'url' => Storage::url($file),
            ];
        }, $files);

        return $fileLinks;
    }
}
