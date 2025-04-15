<?php
namespace App\Filament\Resources\SessionFeedbackResource\Api;

use Rupadana\ApiService\ApiService;
use App\Filament\Resources\SessionFeedbackResource;
use Illuminate\Routing\Router;


class SessionFeedbackApiService extends ApiService
{
    protected static string | null $resource = SessionFeedbackResource::class;

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
