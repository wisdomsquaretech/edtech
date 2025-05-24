<?php 

use App\Models\School;
use App\Models\User;

test('guest cannot access protected endpoints', function () {
    $this->getJson('/api/schools')
        ->assertStatus(401); //Unauthorized
});

test('user without role cannot delete school without permission', function () {
    $user = User::factory()->create()->assignRole('student'); // no role
    $school = School::factory()->create();

    $this
      ->actingAs($user, 'sanctum')
      ->deleteJson("/api/schools/{$school->id}")
      ->assertStatus(403); //Forbidden
});
