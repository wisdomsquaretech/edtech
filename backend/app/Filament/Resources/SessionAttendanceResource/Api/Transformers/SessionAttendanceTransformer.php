<?php
namespace App\Filament\Resources\SessionAttendanceResource\Api\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\SessionAttendance;

/**
 * @property SessionAttendance $resource
 */
class SessionAttendanceTransformer extends JsonResource
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
