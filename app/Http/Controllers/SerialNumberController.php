<?php

namespace App\Http\Controllers;

use App\Models\SerialNumber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SerialNumberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $serial_numbers = SerialNumber::all();

        return Inertia::render('SerialNumbers', [
            'serialNumbers' => $serial_numbers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $code = str_pad(mt_rand(1, 99999999), 8, '0', STR_PAD_LEFT);

        $new_serial = new SerialNumber();
        $new_serial->code = $code;
        $new_serial->save();

        return to_route('serial-number.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(SerialNumber $serialNumber): JsonResponse
    {
        return response()->json([]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SerialNumber $serialNumber): JsonResponse
    {
        return response()->json([]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SerialNumber $serialNumber)
    {
        $serialNumber->delete();

        return to_route('serial-number.index');
    }
}
