<?php

namespace App\Filament\Resources\LessonResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\LessonResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\LessonResource\Api\Transformers\LessonTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = LessonResource::class;


    /**
     * Show Lesson
     *
     * @param Request $request
     * @return LessonTransformer
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

        return new LessonTransformer($query);
    }
}
