<?php

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Mail\InitialConfiguration;
use App\Mail\InternetRestored;
use App\Mail\OperativityRestored;
use App\Mail\SoftwareUpdated;
use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display messages frontend page.
     */
    public function home()
    {
        $messages = Message::all();

        return Inertia::render('Messages', [
            'messages' => $messages,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $messages = Message::all();

        return MessageResource::collection($messages)->response();
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
            'alias' => 'required',
        ]);

        $previous_message = Message::where('state', $validated['state'])
            ->where('sn', $validated['sn'])
            ->first();

        // check message status
        if ($previous_message == null) {
            $new_message = Message::create($validated);
            if ($validated['state'] == 0) {
                Mail::to($validated['email'])->send(new InitialConfiguration($new_message));
            }

            return (new MessageResource($new_message))->response();
        } else {
            // calculate downtime from last message
            $downtime_delta = $previous_message->updated_at->diff(Carbon::now())->format('%dg %Ho %Im %Ss');

            // send mail notifications
            if ($validated['frm'] != $previous_message['frm'] && $validated['state'] == 0) {
                // send software update notification
                Mail::to($previous_message->email)->send(new SoftwareUpdated($previous_message, $validated['frm']));
            } else {
                if ($validated['state'] == 0 && $previous_message->alert_sent == true) {
                    // send operativity restored notification
                    Mail::to($previous_message->email)->send(new OperativityRestored($previous_message, $downtime_delta));
                    $previous_message->alert_sent = false;
                } elseif ($validated['state'] == 1) {
                    // update related message with state 0 to correctly calculate time delta
                    $related_message = Message::where('state', 0)
                        ->where('sn', $validated['sn'])
                        ->first();
                    $related_message->touch();
                    $related_message->save();

                    if ($previous_message->alert_sent == true) {
                        // send internet restored notification
                        Mail::to($previous_message->email)->send(new InternetRestored($previous_message, $downtime_delta));
                        $previous_message->alert_sent = false;
                    }
                }
            }

            // update message info
            $previous_message->update([
                'ip' => $validated['ip'],
                'model' => $validated['model'],
                'frm' => $validated['frm'],
                'ota' => $validated['ota'],
                'email' => $validated['email'],
                'alias' => $validated['alias'],
            ]);
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
