<?php

namespace App\Filament\Resources\NotificationResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\NotificationResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\NotificationResource\Api\Transformers\NotificationTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = NotificationResource::class;


    /**
     * Show Notification
     *
     * @param Request $request
     * @return NotificationTransformer
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

        return new NotificationTransformer($query);
    }
}
