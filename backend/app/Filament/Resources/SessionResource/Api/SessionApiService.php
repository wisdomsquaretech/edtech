<?php

namespace App\Filament\Resources\SessionResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\SessionResource;
use Illuminate\Routing\Router;


class SessionApiService extends ApiService
{
    protected static string | null $resource = SessionResource::class;

    public static function handlers() : array
    {
        return [
            Handlers\CreateHandler::class,
            Handlers\UpdateHandler::class,
            Handlers\DeleteHandler::class,
            Handlers\PaginationHandler::class,
            Handlers\DetailHandler::class,
            Handlers\SessionsByTutorHandler::class
        ];
    }
}
