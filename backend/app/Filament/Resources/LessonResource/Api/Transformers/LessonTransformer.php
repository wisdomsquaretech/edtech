<?php
namespace App\Filament\Resources\LessonResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Lesson;

/**
 * @property Lesson $resource
 */
class LessonTransformer extends JsonResource
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
