<?php 

use App\Models\Lesson;
use App\Models\User;

// test('student can download lesson file', function () {
//     Storage::fake('public');
//     $student = User::factory()->create()->assignRole('student');
//     $lesson  = Lesson::factory()->create([
//       'file_type' => 'pdf',
//       'file_path' => 'lessons/intro.pdf'
//     ]);
//     Storage::disk('public')->put('lessons/intro.pdf', 'PDF_CONTENT');

//     $this
//       ->actingAs($student, 'sanctum')
//       ->get("/api/lessons/{$lesson->id}/download")
//       ->assertStatus(200)
//       ->assertHeader('Content-Type', 'application/pdf');
// });
