<?php
namespace App\Filament\Resources\SchoolResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\SchoolResource;
use App\Filament\Resources\SchoolResource\Api\Requests\CreateSchoolRequest;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = SchoolResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create School
     *
     * @param CreateSchoolRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateSchoolRequest $request)
    {
        $model = new (static::getModel());

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}