<?php

namespace App\Filament\Resources\TutorAvailabilityResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\TutorAvailabilityResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\TutorAvailabilityResource\Api\Transformers\TutorAvailabilityTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = TutorAvailabilityResource::class;


    /**
     * Show TutorAvailability
     *
     * @param Request $request
     * @return TutorAvailabilityTransformer
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

        return new TutorAvailabilityTransformer($query);
    }
}
