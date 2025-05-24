<?php

namespace App\Filament\Resources\SchoolResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\SchoolResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\SchoolResource\Api\Transformers\SchoolTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = SchoolResource::class;


    /**
     * Show School
     *
     * @param Request $request
     * @return SchoolTransformer
     */
    public function handler(Request $request)
    {
        $id = $request->route('id');
        
        $query = static::getEloquentQuery();

        $query = QueryBuilder::for(
            $query->where(static::getKeyName(), $id)
                ->with(['users'])
        )
            ->first();

        if (!$query) return static::sendNotFoundResponse();

        return new SchoolTransformer($query);
    }
}
