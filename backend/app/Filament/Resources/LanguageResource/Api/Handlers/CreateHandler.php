<?php
namespace App\Filament\Resources\LanguageResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\LanguageResource;
use App\Filament\Resources\LanguageResource\Api\Requests\CreateLanguageRequest;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = LanguageResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create Language
     *
     * @param CreateLanguageRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateLanguageRequest $request)
    {
        $model = new (static::getModel());

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}