<?php

namespace App\Filament\Resources\TutorStudentSessionLookupResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\TutorStudentSessionLookupResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\TutorStudentSessionLookupResource\Api\Transformers\TutorStudentSessionLookupTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = TutorStudentSessionLookupResource::class;


    /**
     * Show TutorStudentSessionLookup
     *
     * @param Request $request
     * @return TutorStudentSessionLookupTransformer
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

        return new TutorStudentSessionLookupTransformer($query);
    }
}
