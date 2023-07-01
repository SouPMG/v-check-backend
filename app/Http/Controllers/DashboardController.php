<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display dashboard contents.
     */
    public function home()
    {
        $messages = Message::all();

        return Inertia::render('Dashboard', [
            'messages' => $messages,
        ]);
    }
}
