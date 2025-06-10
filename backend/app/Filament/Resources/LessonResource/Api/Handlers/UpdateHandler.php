<?php
namespace App\Filament\Resources\LessonResource\Api\Handlers;

use App\PathGenerators\CustomPathGenerator;
use Awcodes\Curator\Models\Media;
use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\LessonResource;
use App\Filament\Resources\LessonResource\Api\Requests\UpdateLessonRequest;
use Illuminate\Support\Facades\Storage;

class UpdateHandler extends Handlers {
    public static string | null $uri = '/{id}';
    public static string | null $resource = LessonResource::class;

    public static function getMethod()
    {
        return Handlers::PUT;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }


    /**
     * Update Lesson
     *
     * @param UpdateLessonRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(UpdateLessonRequest $request)
    {
        $id = $request->route('id');

        $model = static::getModel()::find($id);

        if (!$model) return static::sendNotFoundResponse();

        // 1) Update all fields except lesson_files
        $model->fill($request->except('lesson_files'));

        $model->save();

        // Detach old media relations if needed
        $model->lessonFiles()->detach();

        // Handle uploaded files
        $generator = new CustomPathGenerator();
        $disk = Storage::disk('media');

        if ($request->hasFile('lesson_files')) {
            foreach ($request->file('lesson_files') as $file) {
                $originalName = $file->getClientOriginalName();
                $mime = $file->getMimeType();
                $ext = $file->getClientOriginalExtension();
                $uniqName = md5($originalName . microtime());
                $fileName = $uniqName . '.' . $ext;

                $dir = trim($generator->getPath(), '/');
                $path = "{$dir}/{$fileName}";

                // Store file
                $disk->put($path, file_get_contents($file->getRealPath()));

                // Create media record
                $media = Media::create([
                    'disk' => 'public',
                    'path' => 'media/' . $path,
                    'name' => $uniqName,
                    'title' => $originalName,
                    'type' => $mime,
                    'size' => $file->getSize(),
                    'visibility' => 'public',
                    'ext' => $ext,
                    'directory' => 'media/' . $dir,
                ]);

                $model->lessonFiles()->attach($media->id);
            }
        }

        return static::sendSuccessResponse($model, "Successfully Update Resource");
    }
}