<?php

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $messages = Message::all();

        return (MessageResource::collection($messages))->response();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ip' => 'required',
            'model' => 'required',
            'sn' => 'required',
            'frm' => 'required',
            'ota' => 'required',
            'state' => 'required',
            'email' => 'required',
        ]);

        $newMessage = Message::create($validated);

        return (new MessageResource($newMessage))->response();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $message = Message::findOrFail($id);

        return (new MessageResource($message))->response();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        return response()->json([]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        return response()->json([]);
    }
}
