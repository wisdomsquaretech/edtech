<?php

namespace App\Filament\Resources\CurriculumResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\CurriculumResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\CurriculumResource\Api\Transformers\CurriculumTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = CurriculumResource::class;


    /**
     * Show Curriculum
     *
     * @param Request $request
     * @return CurriculumTransformer
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

        return new CurriculumTransformer($query);
    }
}
