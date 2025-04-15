<?php
namespace App\Filament\Resources\TutorStudentSessionLookupResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\TutorStudentSessionLookup;

/**
 * @property TutorStudentSessionLookup $resource
 */
class TutorStudentSessionLookupTransformer extends JsonResource
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
