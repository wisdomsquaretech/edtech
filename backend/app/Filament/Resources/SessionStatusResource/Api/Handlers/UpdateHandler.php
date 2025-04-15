<?php
namespace App\Filament\Resources\SessionStatusResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\SessionStatusResource;
use App\Filament\Resources\SessionStatusResource\Api\Requests\UpdateSessionStatusRequest;

class UpdateHandler extends Handlers {
    public static string | null $uri = '/{id}';
    public static string | null $resource = SessionStatusResource::class;

    public static function getMethod()
    {
        return Handlers::PUT;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }


    /**
     * Update SessionStatus
     *
     * @param UpdateSessionStatusRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(UpdateSessionStatusRequest $request)
    {
        $id = $request->route('id');

        $model = static::getModel()::find($id);

        if (!$model) return static::sendNotFoundResponse();

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Update Resource");
    }
}