<?php
namespace App\Filament\Resources\TutorAvailabilitySlotResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\TutorAvailabilitySlotResource;
use App\Filament\Resources\TutorAvailabilitySlotResource\Api\Requests\UpdateTutorAvailabilitySlotRequest;

class UpdateHandler extends Handlers {
    public static string | null $uri = '/{id}';
    public static string | null $resource = TutorAvailabilitySlotResource::class;

    public static function getMethod()
    {
        return Handlers::PUT;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }


    /**
     * Update TutorAvailabilitySlot
     *
     * @param UpdateTutorAvailabilitySlotRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(UpdateTutorAvailabilitySlotRequest $request)
    {
        $id = $request->route('id');

        $model = static::getModel()::find($id);

        if (!$model) return static::sendNotFoundResponse();

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Update Resource");
    }
}