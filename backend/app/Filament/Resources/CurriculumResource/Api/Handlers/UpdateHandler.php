<?php
namespace App\Filament\Resources\CurriculumResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\CurriculumResource;
use App\Filament\Resources\CurriculumResource\Api\Requests\UpdateCurriculumRequest;

class UpdateHandler extends Handlers {
    public static string | null $uri = '/{id}';
    public static string | null $resource = CurriculumResource::class;

    public static function getMethod()
    {
        return Handlers::PUT;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }


    /**
     * Update Curriculum
     *
     * @param UpdateCurriculumRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(UpdateCurriculumRequest $request)
    {
        $id = $request->route('id');

        $model = static::getModel()::find($id);

        if (!$model) return static::sendNotFoundResponse();

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Update Resource");
    }
}