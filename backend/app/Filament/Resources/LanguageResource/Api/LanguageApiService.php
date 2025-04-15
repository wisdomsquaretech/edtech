<?php
namespace App\Filament\Resources\LanguageResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\LanguageResource;
use Illuminate\Routing\Router;


class LanguageApiService extends ApiService
{
    protected static string | null $resource = LanguageResource::class;

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
