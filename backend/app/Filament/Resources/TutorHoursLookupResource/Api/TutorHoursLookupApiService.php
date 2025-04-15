<?php
namespace App\Filament\Resources\TutorHoursLookupResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\TutorHoursLookupResource;
use Illuminate\Routing\Router;


class TutorHoursLookupApiService extends ApiService
{
    protected static string | null $resource = TutorHoursLookupResource::class;

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
