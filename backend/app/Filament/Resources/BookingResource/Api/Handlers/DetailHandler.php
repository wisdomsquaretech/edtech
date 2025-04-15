<?php

namespace App\Filament\Resources\BookingResource\Api\Handlers;

use App\Filament\Resources\SettingResource;
use App\Filament\Resources\BookingResource;
use Rupadana\ApiService\Http\Handlers;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Http\Request;
use App\Filament\Resources\BookingResource\Api\Transformers\BookingTransformer;

class DetailHandler extends Handlers
{
    public static string | null $uri = '/{id}';
    public static string | null $resource = BookingResource::class;


    /**
     * Show Booking
     *
     * @param Request $request
     * @return BookingTransformer
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

        return new BookingTransformer($query);
    }
}
