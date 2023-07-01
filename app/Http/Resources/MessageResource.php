<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'ip' => $this->ip,
            'model' => $this->model,
            'sn' => $this->sn,
            'frm' => $this->frm,
            'ota' => $this->ota,
            'state' => $this->state,
            'email' => $this->email,
            'alert_sent' => $this->alert_sent,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
