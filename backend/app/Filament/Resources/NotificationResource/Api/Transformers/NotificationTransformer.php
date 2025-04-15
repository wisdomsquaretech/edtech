<?php
namespace App\Filament\Resources\NotificationResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Notification;

/**
 * @property Notification $resource
 */
class NotificationTransformer extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->resource->toArray();
    }
}
