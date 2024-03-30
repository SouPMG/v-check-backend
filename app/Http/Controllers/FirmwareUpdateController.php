<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FirmwareUpdateController extends Controller
{
    /**
     * Display firmware update frontend page.
     */
    public function home()
    {
        return Inertia::render('FirmwareUpdate');
    }
}
