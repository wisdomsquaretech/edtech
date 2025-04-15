<?php
namespace App\Filament\Resources\SessionResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Session;

/**
 * @property Session $resource
 */
class SessionTransformer extends JsonResource
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
