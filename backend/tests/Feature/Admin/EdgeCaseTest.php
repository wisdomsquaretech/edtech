<?php 

use App\Filament\Resources\BookingResource\Pages\CreateBooking;
use App\Models\Booking;
use App\Models\TutorAvailabilitySlot;
use App\Models\User;
use Livewire\Livewire;
use function Pest\Laravel\actingAs;

beforeEach(function(){
    $this->admin = User::factory()->create()->assignRole('admin');
    actingAs($this->admin, 'web');
});

it('cannot book more than tutor availability slot capacity', function(){

    $slot = TutorAvailabilitySlot::factory()->create(['capacity'=>1]);
    $tutor = $slot->tutor;

    Booking::factory()->create([
        'slot_id' => $slot->id,         
    ]);
    
    $student = User::factory()->create()->assignRole('student');
    $lesson = \App\Models\Lesson::factory()->create();
    $session = \App\Models\Session::factory()->create([
        'lesson_id' => $lesson->id,
        'student_id' => $student->id,
    ]);

    Livewire::test(CreateBooking::class)
        ->set('data.student_id', $student->id)
        ->set('data.tutor_id', $tutor->id) // Sets tutor_id first
        ->call('$refresh') // Ensures slot_id field becomes visible
        ->set('data.slot_id', $slot->id) // Now slot_id is visible
        ->set('data.lesson_id', $lesson->id)
        ->set('data.session_id', $session->id)
        ->set('data.creator_id', $this->admin->id)
        ->call('create')        
        ->assertHasErrors(['data.slot_id'=> 'This slot is already fully booked.']);
});
