<?php
namespace App\Filament\Resources\CurriculumResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\CurriculumResource;
use Illuminate\Routing\Router;


class CurriculumApiService extends ApiService
{
    protected static string | null $resource = CurriculumResource::class;

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
