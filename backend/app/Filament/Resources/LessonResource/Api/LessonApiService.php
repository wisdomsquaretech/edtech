<?php
namespace App\Filament\Resources\LessonResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\LessonResource;
use Illuminate\Routing\Router;


class LessonApiService extends ApiService
{
    protected static string | null $resource = LessonResource::class;

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
