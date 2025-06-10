<?php
namespace App\Filament\Resources\LessonResource\Api\Handlers;

use App\PathGenerators\CustomPathGenerator;
use Awcodes\Curator\Models\Media;
use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\LessonResource;
use App\Filament\Resources\LessonResource\Api\Requests\CreateLessonRequest;
use Illuminate\Support\Str;
use Storage;

class CreateHandler extends Handlers {
    public static string | null $uri = '/';
    public static string | null $resource = LessonResource::class;

    public static function getMethod()
    {
        return Handlers::POST;
    }

    public static function getModel() {
        return static::$resource::getModel();
    }

    /**
     * Create Lesson
     *
     * @param CreateLessonRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handler(CreateLessonRequest $request)
    {
        // 1) Fill & save your lesson model
        $model = new (static::getModel());

        $model->fill($request->except('lesson_files'));

        $model->save();

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

                // Store the file
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
        return static::sendSuccessResponse($model, "Successfully Create Resource");
    }
}