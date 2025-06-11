<?php 

use App\Models\Lesson;
use App\Models\Curriculum;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use function Pest\Laravel\actingAs;

it('creates a lesson and syncs up to 3 PDF/PPT media via Livewire action', function () {

    Storage::fake('media');
    $tutor       = User::factory()->create()->assignRole('tutor');    
    actingAs($tutor, 'sanctum');

    // Prepare three fake uploads

    $file1 = UploadedFile::fake()->create('one.pdf', 100, 'application/pdf');
    $file2 = UploadedFile::fake()->create('two.ppt', 150, 'application/vnd.ms-powerpoint');
    $file3 = UploadedFile::fake()->create('three.pptx', 200, 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
          
    $curriculum = Curriculum::factory()->create();

    $response = $this->postJson('/api/lessons', [
        'curriculum_id' => $curriculum->id,
        'title'         => 'API Lesson Upload Test',
        'level'         => 'beginner',
        'description'   => 'Testing JSON-only Base64 upload',
        'language_code' => 'en',            
        'lesson_files'  => [$file1, $file2, $file3]
    ]);
    
    $response->assertStatus(200);

    // Check that lesson was created
    $lesson = Lesson::where('title', 'API Lesson Upload Test')->first();
    expect($lesson)->not->toBeNull();

    // Get associated media records
    $media = $lesson->lessonFiles; // Assuming a `lessonFiles()` relationship returning media items
    
    expect($media)->toHaveCount(3);

    $fileNames = $media->pluck('title')->toArray();

    expect($fileNames)->toContain('one.pdf')
                    ->toContain('two.ppt')
                    ->toContain('three.pptx');
});
