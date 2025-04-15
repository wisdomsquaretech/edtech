<?php
namespace App\Filament\Resources\CurriculumResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\CurriculumResource;
use App\Filament\Resources\CurriculumResource\Api\Requests\CreateCurriculumRequest;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = CurriculumResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create Curriculum
     *
     * @param CreateCurriculumRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateCurriculumRequest $request)
    {
        $model = new (static::getModel());

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}