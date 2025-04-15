<?php
namespace App\Filament\Resources\SessionStatusResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\SessionStatusResource;
use Illuminate\Routing\Router;


class SessionStatusApiService extends ApiService
{
    protected static string | null $resource = SessionStatusResource::class;

    public static function handlers() : array
    {
        return [
            Handlers\CreateHandler::class,
            Handlers\UpdateHandler::class,
            Handlers\DeleteHandler::class,
            Handlers\PaginationHandler::class,
            Handlers\DetailHandler::class
        ];

    }
}
