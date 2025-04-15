<?php

namespace App\Filament\Resources\TutorHoursLookupResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\TutorHoursLookupResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\TutorHoursLookupResource\Api\Transformers\TutorHoursLookupTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = TutorHoursLookupResource::class;


    /**
     * Show TutorHoursLookup
     *
     * @param Request $request
     * @return TutorHoursLookupTransformer
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

        return new TutorHoursLookupTransformer($query);
    }
}
