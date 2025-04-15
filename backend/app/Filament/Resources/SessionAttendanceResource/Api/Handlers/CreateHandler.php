<?php
namespace App\Filament\Resources\SessionAttendanceResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\SessionAttendanceResource;
use App\Filament\Resources\SessionAttendanceResource\Api\Requests\CreateSessionAttendanceRequest;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = SessionAttendanceResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create SessionAttendance
     *
     * @param CreateSessionAttendanceRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateSessionAttendanceRequest $request)
    {
        $model = new (static::getModel());

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}