<?php
namespace App\Filament\Resources\SchoolResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\School;

/**
 * @property School $resource
 */
class SchoolTransformer extends JsonResource
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
