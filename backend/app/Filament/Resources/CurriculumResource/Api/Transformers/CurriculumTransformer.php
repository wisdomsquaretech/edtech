<?php
namespace App\Filament\Resources\CurriculumResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Curriculum;

/**
 * @property Curriculum $resource
 */
class CurriculumTransformer extends JsonResource
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
