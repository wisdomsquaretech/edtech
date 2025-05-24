<?php 

use App\Filament\Resources\LessonResource\Pages\CreateLesson;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Livewire\Livewire;
use function Pest\Laravel\actingAs;

// create an admin user 
beforeEach(function(){
    $this->admin = User::factory()->create()->assignRole('admin');
    actingAs($this->admin, 'web');
});

it('shows validation errors when creating a lesson with missing fields', function(){
    Livewire::test(CreateLesson::class)
        ->fillForm([
            'curriculum_id' => null,
            'title'         => '',
            'description'   => '',
            'file_path'     => '',
            'language_code' => '',          
        ])
        ->call('create')       
        ->assertHasErrors([
            'data.curriculum_id' => 'required',
            'data.title'         => 'required',
            'data.description'   => 'required',
            'data.file_path'     => 'required',
            'data.language_code' => 'required',
           
        ]);
});