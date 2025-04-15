<?php
namespace App\Filament\Resources\TutorStudentSessionLookupResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\TutorStudentSessionLookupResource;
use Illuminate\Routing\Router;


class TutorStudentSessionLookupApiService extends ApiService
{
    protected static string | null $resource = TutorStudentSessionLookupResource::class;

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
