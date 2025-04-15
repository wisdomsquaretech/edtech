<?php

namespace App\Filament\Resources\LanguageResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\LanguageResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\LanguageResource\Api\Transformers\LanguageTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = LanguageResource::class;


    /**
     * Show Language
     *
     * @param Request $request
     * @return LanguageTransformer
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

        return new LanguageTransformer($query);
    }
}
