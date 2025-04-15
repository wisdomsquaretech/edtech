<?php
namespace App\Filament\Resources\TutorHoursLookupResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\TutorHoursLookupResource;
use App\Filament\Resources\TutorHoursLookupResource\Api\Requests\CreateTutorHoursLookupRequest;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = TutorHoursLookupResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create TutorHoursLookup
     *
     * @param CreateTutorHoursLookupRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateTutorHoursLookupRequest $request)
    {
        $model = new (static::getModel());

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}