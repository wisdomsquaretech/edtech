<?php
namespace App\Filament\Resources\SchoolResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\SchoolResource;
use App\Filament\Resources\SchoolResource\Api\Requests\UpdateSchoolRequest;

class UpdateHandler extends Handlers {
    public static string | null $uri = '/{id}';
    public static string | null $resource = SchoolResource::class;

    public static function getMethod()
    {
        return Handlers::PUT;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }


    /**
     * Update School
     *
     * @param UpdateSchoolRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(UpdateSchoolRequest $request)
    {
        $id = $request->route('id');

        $model = static::getModel()::find($id);

        if (!$model) return static::sendNotFoundResponse();

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Update Resource");
    }
}