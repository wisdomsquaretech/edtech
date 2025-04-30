<?php

namespace App\Filament\Resources\TutorAvailabilityResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\TutorAvailabilityResource;
use Illuminate\Routing\Router;


class TutorAvailabilityApiService extends ApiService
{
    protected static string | null $resource = TutorAvailabilityResource::class;

    public static function handlers(): array
    {
        return [
            Handlers\CreateHandler::class,
            Handlers\UpdateHandler::class,
            Handlers\DeleteHandler::class,
            Handlers\PaginationHandler::class,
            Handlers\DetailHandler::class,
            Handlers\TutorAvailabilitiesByTutorHandler::class
        ];
    }
}
