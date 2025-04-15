<?php
namespace App\Filament\Resources\SessionFeedbackResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\SessionFeedbackResource;
use App\Filament\Resources\SessionFeedbackResource\Api\Requests\UpdateSessionFeedbackRequest;

class UpdateHandler extends Handlers {
    public static string | null $uri = '/{id}';
    public static string | null $resource = SessionFeedbackResource::class;

    public static function getMethod()
    {
        return Handlers::PUT;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }


    /**
     * Update SessionFeedback
     *
     * @param UpdateSessionFeedbackRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(UpdateSessionFeedbackRequest $request)
    {
        $id = $request->route('id');

        $model = static::getModel()::find($id);

        if (!$model) return static::sendNotFoundResponse();

        $model->fill($request->all());

        $model->save();

        return static::sendSuccessResponse($model, "Successfully Update Resource");
    }
}