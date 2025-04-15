<?php
namespace App\Filament\Resources\SessionFeedbackResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\SessionFeedbackResource;
use App\Filament\Resources\SessionFeedbackResource\Api\Requests\CreateSessionFeedbackRequest;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = SessionFeedbackResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create SessionFeedback
     *
     * @param CreateSessionFeedbackRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateSessionFeedbackRequest $request)
    {
        $model = new (static::getModel());

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}