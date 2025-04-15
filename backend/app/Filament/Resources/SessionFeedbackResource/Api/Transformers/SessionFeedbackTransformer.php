<?php
namespace App\Filament\Resources\SessionFeedbackResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\SessionFeedback;

/**
 * @property SessionFeedback $resource
 */
class SessionFeedbackTransformer extends JsonResource
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
