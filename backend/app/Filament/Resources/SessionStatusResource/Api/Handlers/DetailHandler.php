<?php

namespace App\Filament\Resources\SessionStatusResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\SessionStatusResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\SessionStatusResource\Api\Transformers\SessionStatusTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = SessionStatusResource::class;


    /**
     * Show SessionStatus
     *
     * @param Request $request
     * @return SessionStatusTransformer
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

        return new SessionStatusTransformer($query);
    }
}
