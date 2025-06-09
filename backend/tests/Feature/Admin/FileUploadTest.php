<?php 

use App\Models\Lesson;
use App\Models\Curriculum;
use Awcodes\Curator\Models\Media;
use App\Models\User;
use App\PathGenerators\CustomPathGenerator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;
use App\Filament\Resources\LessonResource\Pages\CreateLesson;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;

// Fake the media disk so uploads go to storage/framework/testing/disks/media
beforeEach(function () {
    Storage::fake('media');
    $this->admin       = User::factory()->create()->assignRole('admin');    
    actingAs($this->admin, 'web');
});

// Helper: turn faked files into real Curator Media records
function createMediaRecords($file)
{
    $generator = new CustomPathGenerator();
    
    $path = $generator->getPath() . '/' . $file->hashName();
    Storage::disk('media')->put($path, file_get_contents($file->getRealPath()));

    $media = Media::create([
        'disk'        => 'media',
        'path'        => $path,
        'name'        => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
        'title'   => $file->getClientOriginalName(),
        'type'   => $file->getMimeType(),
        'size'        => $file->getSize(),
        'visibility'  => 'public',        
        'ext'         => $file->getClientOriginalExtension(),
    ]);
    return $media;
}

it('creates a lesson and syncs up to 3 PDF/PPT media via Livewire action', function () {
    // 1) Prepare three fake uploads

    $file1 = UploadedFile::fake()->create('one.pdf', 100, 'application/pdf');
    $file2 = UploadedFile::fake()->create('two.ppt', 150, 'application/vnd.ms-powerpoint');
    $file3 = UploadedFile::fake()->create('three.pptx', 200, 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    // 2) Persist them as Media records
    $media1 = createMediaRecords($file1);
    $media2 = createMediaRecords($file2);
    $media3 = createMediaRecords($file3);

    // 3) Auth + related data
    
    $curriculum = Curriculum::factory()->create();

    // 4) Drive only the Livewire action—no Blade rendering of the picker
    $test = Livewire::test(CreateLesson::class)
        ->fillForm([
            'curriculum_id'=> $curriculum->id,
            'title'=> 'Lesson Files',
            'level'=> 'beginner',
            'description'=>'desc',
            'language_code'=>  'en',
            'lesson_files'=>   [$media1, $media2, $media3]])
        ->call('create')
        ->assertHasNoErrors();

    // 5) Assert lesson & pivot table
    $lesson = Lesson::where('title', 'Lesson Files')->first();
    
    expect($lesson->lessonFiles()->pluck('media_id')->all())
        ->toEqualCanonicalizing([$media1->id, $media2->id, $media3->id]);
});
