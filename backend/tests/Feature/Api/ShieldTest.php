<?php 

use App\Models\User;

test('cannot get lesson without permission', function () {
    
    $tutor   = User::factory()->create()->assignRole('tutor');

    $this
      ->actingAs($tutor, 'sanctum')
      ->get("/api/lessons")
      ->assertForbidden();
});