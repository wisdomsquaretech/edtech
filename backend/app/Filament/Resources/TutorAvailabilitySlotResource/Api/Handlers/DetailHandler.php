<?php

namespace App\Filament\Resources\TutorAvailabilitySlotResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\TutorAvailabilitySlotResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\TutorAvailabilitySlotResource\Api\Transformers\TutorAvailabilitySlotTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = TutorAvailabilitySlotResource::class;


    /**
     * Show TutorAvailabilitySlot
     *
     * @param Request $request
     * @return TutorAvailabilitySlotTransformer
     */
    public function handler(Request $request)
    {
        $id = $request->route('id');
        
        $query = static::getEloquentQuery();

        $query = QueryBuilder::for(
            $query->where(static::getKeyName(), $id)
        )
            ->first();

        if (!$query) return static::sendNotFoundResponse();

        return new TutorAvailabilitySlotTransformer($query);
    }
}
