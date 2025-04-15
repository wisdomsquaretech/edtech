<?php
namespace App\Filament\Resources\SessionStatusResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\SessionStatusResource;
use App\Filament\Resources\SessionStatusResource\Api\Requests\CreateSessionStatusRequest;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = SessionStatusResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create SessionStatus
     *
     * @param CreateSessionStatusRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateSessionStatusRequest $request)
    {
        $model = new (static::getModel());

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}