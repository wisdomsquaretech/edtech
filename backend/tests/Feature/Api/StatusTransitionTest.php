<?php 

use App\Models\Booking;
use App\Models\Session;
use App\Models\User;
use Carbon\Carbon;

test('student can update session status', function () {
    
    $student   = User::factory()->create()->assignRole('student');    
    $session = Session::factory()->create(['status' => 'scheduled']);

    $this
      ->actingAs($student, 'sanctum')
      ->putJson("/api/sessions/{$session->id}", [
          'school_id' => $session->school_id,
          'tutor_id' => $session->tutor_id,
          'student_id' => $session->student_id,
          'lesson_id' => $session->lesson_id,
          'start_time' => $session->start_time->format('d-m-Y H:i:s'),
          'end_time' => $session->end_time->format('d-m-Y H:i:s'),
          'meeting_link' => $session->meeting_link,
          'notes' => $session->notes,
          'platform' => $session->platform,
          'checklist_done' => $session->checklist_done,
          'status' => 'completed'])   

      ->assertStatus(200);      

    $this->assertDatabaseHas('sessions', [
      'id'     => $session->id,
      'status' => 'completed',
    ]);
});

test('student can cancel own booking', function () {
    $student = User::factory()->create()->assignRole('student');
    
    $booking = Booking::factory()->create([
      'student_id' => $student->id,      
      'status'     => 'booked'
    ]);

    $newBooking = [
      'student_id' => $student->id,
      'slot_id' => $booking->slot_id,
      'session_id' => $booking->session_id,
      'creator_id' => $booking->creator_id,
      'status' => 'cancelled'
    ];

    $this
      ->actingAs($student, 'sanctum')
      ->putJson("/api/bookings/{$booking->id}", $newBooking)
      ->assertStatus(200)
      ->assertJsonPath('data.status','cancelled');
});
