<?php
namespace App\Filament\Resources\TutorStudentSessionLookupResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\TutorStudentSessionLookupResource;
use App\Filament\Resources\TutorStudentSessionLookupResource\Api\Requests\UpdateTutorStudentSessionLookupRequest;

class UpdateHandler extends Handlers {
    public static string | null $uri = '/{id}';
    public static string | null $resource = TutorStudentSessionLookupResource::class;

    public static function getMethod()
    {
        return Handlers::PUT;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }


    /**
     * Update TutorStudentSessionLookup
     *
     * @param UpdateTutorStudentSessionLookupRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(UpdateTutorStudentSessionLookupRequest $request)
    {
        $id = $request->route('id');

        $model = static::getModel()::find($id);

        if (!$model) return static::sendNotFoundResponse();

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Update Resource");
    }
}