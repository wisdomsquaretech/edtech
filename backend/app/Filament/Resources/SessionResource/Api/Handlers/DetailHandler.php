<?php

namespace App\Filament\Resources\SessionResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\SessionResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\SessionResource\Api\Transformers\SessionTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = SessionResource::class;


    /**
     * Show Session
     *
     * @param Request $request
     * @return SessionTransformer
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

        return new SessionTransformer($query);
    }
}
