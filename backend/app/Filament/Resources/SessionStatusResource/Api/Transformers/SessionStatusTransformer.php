<?php
namespace App\Filament\Resources\SessionStatusResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\SessionStatus;

/**
 * @property SessionStatus $resource
 */
class SessionStatusTransformer extends JsonResource
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
