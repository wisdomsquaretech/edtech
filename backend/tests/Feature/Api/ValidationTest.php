<?php 

use App\Models\Curriculum;
use App\Models\User;
use App\Models\Lesson;
use Illuminate\Http\UploadedFile;
use function Pest\Laravel\actingAs;

// create an admin user 
beforeEach(function(){
    $this->tutor = User::factory()->create()->assignRole('tutor');    
});

test('lesson store validation errors', function () {
    
      $curr = Curriculum::factory()->create();

      // missing required fields + invalid enums + missing file
      $bad = [
        'curriculum_id' => 999,         // non‑existent
        'level'         => 'expert',    // not in [beginner, intermediate, advanced]
        'file_type'     => 'doc',       // invalid
        // no title, no file
      ];

      $this
        ->actingAs($this->tutor, 'sanctum')
        ->postJson('/api/lessons', $bad)
        ->assertStatus(422)
        ->assertJsonValidationErrors([
          'title',
          'curriculum_id',
          'description',
          'level',
          'file_type',
          'file_path',  
          'language_code',
        ]);     
});
