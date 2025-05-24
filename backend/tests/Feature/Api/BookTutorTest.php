<?php 

use App\Models\{User, Curriculum, TutorAvailabilitySlot, Booking};

test('book a tutor availability slot', function () {
  
  $slot    = TutorAvailabilitySlot::factory()->create(['capacity' => 1]);
  $student = User::factory()->create()->assignRole('student');
   
  $this
      ->actingAs($student, 'sanctum')
      ->postJson("/api/bookings", 
        [
          'slot_id' => $slot->id,
          'student_id' => $student->id,
          'session_id' => 10,
          'creator_id' => 10,
          'status' => 'completed'])
      ->assertStatus(200);

    $this->assertDatabaseHas('bookings', [
      'student_id' => $student->id,
      'slot_id'    => $slot->id,
    ]);
});
