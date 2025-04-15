<?php
namespace App\Filament\Resources\LanguageResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\LanguageResource;
use App\Filament\Resources\LanguageResource\Api\Requests\UpdateLanguageRequest;

class UpdateHandler extends Handlers {
    public static string | null $uri = '/{id}';
    public static string | null $resource = LanguageResource::class;

    public static function getMethod()
    {
        return Handlers::PUT;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }


    /**
     * Update Language
     *
     * @param UpdateLanguageRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(UpdateLanguageRequest $request)
    {
        $id = $request->route('id');

        $model = static::getModel()::find($id);

        if (!$model) return static::sendNotFoundResponse();

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Update Resource");
    }
}