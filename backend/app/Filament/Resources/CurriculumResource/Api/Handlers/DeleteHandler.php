<?php
namespace App\Filament\Resources\CurriculumResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\CurriculumResource;

class DeleteHandler extends Handlers {
    public static string | null $uri = '/{id}';
    public static string | null $resource = CurriculumResource::class;

    public static function getMethod()
    {
        return Handlers::DELETE;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Delete Curriculum
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(Request $request)
    {
        $id = $request->route('id');

        $model = static::getModel()::find($id);

        if (!$model) return static::sendNotFoundResponse();

        $model->delete();

        return static::sendSuccessResponse($model, "Successfully Delete Resource");
    }
}