<?php 

use App\Models\Lesson;
use App\Models\User;

test('soft‑deleted lesson not returned in index', function () {
    
    $admin = User::factory()->create()->assignRole('admin');
    
    Lesson::factory()->count(2)->create();
    
    $del   = Lesson::factory()->create();
    $del->delete();

    $this
      ->actingAs($admin, 'sanctum')
      ->getJson('/api/lessons')
      ->assertStatus(200)
      ->assertJsonMissing(['id' => $del->id]);
});
