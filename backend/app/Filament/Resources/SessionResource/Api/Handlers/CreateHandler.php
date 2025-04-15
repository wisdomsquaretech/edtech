<?php
namespace App\Filament\Resources\SessionResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\SessionResource;
use App\Filament\Resources\SessionResource\Api\Requests\CreateSessionRequest;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = SessionResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create Session
     *
     * @param CreateSessionRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateSessionRequest $request)
    {
        $model = new (static::getModel());

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}