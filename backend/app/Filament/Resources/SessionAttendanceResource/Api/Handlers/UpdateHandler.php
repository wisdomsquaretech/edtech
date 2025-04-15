<?php
namespace App\Filament\Resources\SessionAttendanceResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\SessionAttendanceResource;
use App\Filament\Resources\SessionAttendanceResource\Api\Requests\UpdateSessionAttendanceRequest;

class UpdateHandler extends Handlers {
    public static string | null $uri = '/{id}';
    public static string | null $resource = SessionAttendanceResource::class;

    public static function getMethod()
    {
        return Handlers::PUT;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }


    /**
     * Update SessionAttendance
     *
     * @param UpdateSessionAttendanceRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(UpdateSessionAttendanceRequest $request)
    {
        $id = $request->route('id');

        $model = static::getModel()::find($id);

        if (!$model) return static::sendNotFoundResponse();

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Update Resource");
    }
}