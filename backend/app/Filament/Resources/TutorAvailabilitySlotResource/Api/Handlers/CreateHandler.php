<?php
namespace App\Filament\Resources\TutorAvailabilitySlotResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\TutorAvailabilitySlotResource;
use App\Filament\Resources\TutorAvailabilitySlotResource\Api\Requests\CreateTutorAvailabilitySlotRequest;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = TutorAvailabilitySlotResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create TutorAvailabilitySlot
     *
     * @param CreateTutorAvailabilitySlotRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateTutorAvailabilitySlotRequest $request)
    {
        $model = new (static::getModel());

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}