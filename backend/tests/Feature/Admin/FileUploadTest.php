<?php 

use App\Filament\Resources\LessonResource\Pages\CreateLesson;
use App\Models\Curriculum;
use Illuminate\Http\UploadedFile;
use Livewire\Livewire;

// it('stores uploaded PDF to disk when creating a lesson', function(){
    
//     Storage::fake('public');
//     $file = UploadedFile::fake()->create('slides.pdf', 100, 'application/pdf');

//     Livewire::test(CreateLesson::class)
//         ->fillForm([
//             'curriculum_id' => Curriculum::factory()->create()->id,
//             'title'         => 'Intro',
//             'level'         => 'beginner',
//             'file_type'     => 'pdf',
//             'file'          => $file,
//         ])
//         ->call('create')
//         ->assertHasNoFormErrors();

//     Storage::disk('public')->assertExists('lessons/' . now()->year . '/' . $file->hashName());
// });
