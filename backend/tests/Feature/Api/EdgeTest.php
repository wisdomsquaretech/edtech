<?php 

use App\Models\Booking;
use App\Models\User;
use App\Models\TutorAvailabilitySlot;
 
// test('cannot book more than capacity', function () {
//     $student = User::factory()->create()->assignRole('student');
//     $slot    = TutorAvailabilitySlot::factory()->create(['capacity' => 1]);

//     // first booking
//     Booking::factory()->create(['slot_id' => $slot->id]);
//     // second attempt
//     $this
//       ->actingAs($student, 'sanctum')
//       ->postJson("/api/bookings", ['session_id'=>1])
//       ->assertStatus(422)
//       ->assertJsonValidationErrors('slot');
// });

// test('cannot create overlapping tutor availability', function () {
//     $tutor = User::factory()->create()->assignRole('tutor');
//     // existing: monday 09:00–10:00
//     TutorAvailabilitySlot::factory()->create([
//       'tutor_id'  => $tutor->id,
//       'slot_date' => '05-11-2025',
//       'start_time'=> '09:00',
//       'end_time'  => '10:00',
//       'capacity'  => 1,
//       'is_booked' => true
//     ]);

//     $bad = [
//       'tutor_id'  => $tutor->id,
//       'slot_date' => '05-11-2025',
//       'start_time'=> '09:30',
//       'end_time'  => '10:30',
//       'capacity'  => 1,
//       'is_booked' => true
//     ];

//     $this
//       ->actingAs($tutor, 'sanctum')
//       ->postJson('/api/tutor-availability-slots', $bad)
//       ->assertStatus(422)
//       ->assertJsonValidationErrors('message');
// });
