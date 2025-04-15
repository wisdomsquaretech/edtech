<?php
namespace App\Filament\Resources\TutorAvailabilityResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\TutorAvailability;

/**
 * @property TutorAvailability $resource
 */
class TutorAvailabilityTransformer extends JsonResource
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
