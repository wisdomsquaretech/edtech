<?php
namespace App\Filament\Resources\BookingResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\BookingResource;
use App\Filament\Resources\BookingResource\Api\Requests\CreateBookingRequest;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = BookingResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create Booking
     *
     * @param CreateBookingRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateBookingRequest $request)
    {
        $model = new (static::getModel());

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}