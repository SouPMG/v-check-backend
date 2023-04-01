<?php

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Mail\InitialConfiguration;
use App\Mail\OperativityRestored;
use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

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

        $previous_message = Message::where('state', $validated['state'])
            ->where('sn', $validated['sn'])
            ->first();

        // check message status
        if ($previous_message == null) {
            $new_message = Message::create($validated);
            if ($validated['state'] == 0) {
                Mail::to($validated['email'])->send(new InitialConfiguration());
            }
            return (new MessageResource($new_message))->response();
        } else {
            if ($validated['state'] == 0) {
                // calculate downtime in hours and send email notification
                $now = Carbon::now();
                $downtime_delta = $previous_message->updated_at->diffInHours($now);
                Mail::to($previous_message->email)->send(new OperativityRestored($downtime_delta));
            }
            $previous_message->ip = $validated['ip'];
            $previous_message->alert_sent = false;
            $previous_message->touch();
            $previous_message->save();
            return (new MessageResource($previous_message))->response();
        }
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
