<?php

namespace App\Filament\Resources\SessionAttendanceResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\SessionAttendanceResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\SessionAttendanceResource\Api\Transformers\SessionAttendanceTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = SessionAttendanceResource::class;


    /**
     * Show SessionAttendance
     *
     * @param Request $request
     * @return SessionAttendanceTransformer
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

        return new SessionAttendanceTransformer($query);
    }
}
