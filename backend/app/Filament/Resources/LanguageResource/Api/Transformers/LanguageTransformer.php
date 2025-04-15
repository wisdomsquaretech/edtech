<?php
namespace App\Filament\Resources\LanguageResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Language;

/**
 * @property Language $resource
 */
class LanguageTransformer extends JsonResource
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
