<?php
namespace App\Filament\Resources\TutorAvailabilitySlotResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\TutorAvailabilitySlotResource;
use Illuminate\Routing\Router;


class TutorAvailabilitySlotApiService extends ApiService
{
    protected static string | null $resource = TutorAvailabilitySlotResource::class;

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
