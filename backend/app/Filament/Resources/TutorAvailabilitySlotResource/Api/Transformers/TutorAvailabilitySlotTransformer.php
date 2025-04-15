<?php
namespace App\Filament\Resources\TutorAvailabilitySlotResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\TutorAvailabilitySlot;

/**
 * @property TutorAvailabilitySlot $resource
 */
class TutorAvailabilitySlotTransformer extends JsonResource
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
