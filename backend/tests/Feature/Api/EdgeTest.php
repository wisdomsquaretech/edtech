<?php 

use App\Models\Booking;
use App\Models\User;
use App\Models\TutorAvailabilitySlot;
 
beforeEach(function(){
  $this->student = User::factory()->create()->assignRole('student');    
});

test('cannot book more than capacity', function () {

  $slot    = TutorAvailabilitySlot::factory()->create(['capacity' => 1]);

    // first booking
    Booking::factory()->create(['slot_id' => $slot->id]);
    
    // second attempt
    $this
      ->actingAs($this->student, 'sanctum')
      ->postJson("/api/bookings", [
            'student_id' => 50,
            'slot_id' => $slot->id,
            'status' => 'booked',
            'creator_id' => 50,
            'session_id' => 50
            ])
         ->assertStatus(422)
         ->assertJsonValidationErrors('slot_id');
});