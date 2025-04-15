<?php
namespace App\Filament\Resources\NotificationResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\NotificationResource;
use App\Filament\Resources\NotificationResource\Api\Requests\CreateNotificationRequest;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = NotificationResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create Notification
     *
     * @param CreateNotificationRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateNotificationRequest $request)
    {
        $model = new (static::getModel());

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}