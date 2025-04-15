<?php
namespace App\Filament\Resources\SchoolResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\SchoolResource;
use Illuminate\Routing\Router;


class SchoolApiService extends ApiService
{
    protected static string | null $resource = SchoolResource::class;

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
