<?php

namespace App\Filament\Resources\SessionFeedbackResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\SessionFeedbackResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\SessionFeedbackResource\Api\Transformers\SessionFeedbackTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = SessionFeedbackResource::class;


    /**
     * Show SessionFeedback
     *
     * @param Request $request
     * @return SessionFeedbackTransformer
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

        return new SessionFeedbackTransformer($query);
    }
}
