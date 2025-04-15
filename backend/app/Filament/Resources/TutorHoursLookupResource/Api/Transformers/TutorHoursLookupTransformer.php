<?php
namespace App\Filament\Resources\TutorHoursLookupResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\TutorHoursLookup;

/**
 * @property TutorHoursLookup $resource
 */
class TutorHoursLookupTransformer extends JsonResource
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
