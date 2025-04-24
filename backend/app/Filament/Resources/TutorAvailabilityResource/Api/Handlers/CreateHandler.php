<?php

namespace App\Filament\Resources\TutorAvailabilityResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\TutorAvailabilityResource;
use App\Filament\Resources\TutorAvailabilityResource\Api\Requests\CreateTutorAvailabilityRequest;
use App\Models\TutorAvailability;

class CreateHandler extends Handlers
{
    public static string | null $uri = '/';
    public static string | null $resource = TutorAvailabilityResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel()
    {
        return static::$resource::getModel();
    }

    /**
     * Create TutorAvailability
     *
     * @param CreateTutorAvailabilityRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateTutorAvailabilityRequest $request)
    {
        $model = new (static::getModel());
        // $model->fill($request->all());
        // $model->save();

        $days = array_map('trim', explode(',', strtolower($request['day_of_week'])));

        $created = [];

        foreach ($days as $day) {
            $created[] = TutorAvailability::create([
                'tutor_id'   => $request['tutor_id'],
                'day_of_week' => $day,
                'start_time' => $request['start_time'],
                'end_time'   => $request['end_time'],
            ]);
        }

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}
