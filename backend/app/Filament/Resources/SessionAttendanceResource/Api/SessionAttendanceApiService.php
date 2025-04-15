<?php
namespace App\Filament\Resources\SessionAttendanceResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\SessionAttendanceResource;
use Illuminate\Routing\Router;


class SessionAttendanceApiService extends ApiService
{
    protected static string | null $resource = SessionAttendanceResource::class;

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
