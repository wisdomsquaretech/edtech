<?php
namespace App\Filament\Resources\BookingResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\BookingResource;
use Illuminate\Routing\Router;


class BookingApiService extends ApiService
{
    protected static string | null $resource = BookingResource::class;

    public static function handlers() : array
    {
        return [
            Handlers\CreateHandler::class,
            //Handlers\UpdateHandler::class,
            Handlers\DeleteHandler::class,
            Handlers\PaginationHandler::class,
            Handlers\DetailHandler::class
        ];

    }
}
