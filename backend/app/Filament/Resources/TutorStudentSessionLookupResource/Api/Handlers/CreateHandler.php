<?php
namespace App\Filament\Resources\TutorStudentSessionLookupResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\TutorStudentSessionLookupResource;
use App\Filament\Resources\TutorStudentSessionLookupResource\Api\Requests\CreateTutorStudentSessionLookupRequest;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = TutorStudentSessionLookupResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create TutorStudentSessionLookup
     *
     * @param CreateTutorStudentSessionLookupRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateTutorStudentSessionLookupRequest $request)
    {
        $model = new (static::getModel());

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}