<?php 

use App\Filament\Resources\BookingResource\Pages\CreateBooking;
use App\Models\TutorAvailabilitySlot;
use App\Models\User;
use Livewire\Livewire;
use function Pest\Laravel\actingAs;


// create an admin user 
beforeEach(function(){
    $this->admin = User::factory()->create()->assignRole('admin');
    actingAs($this->admin, 'web');
});

it('books a tutor slot', function(){
    $slot = TutorAvailabilitySlot::factory()->create([
        'tutor_id' => 10,
        'slot_date' => '01-01-2022',
        'start_time' => '9:00',
        'end_time' => '10:00',
        'capacity' => 1,
        'is_booked' => true,
    ]);
    $student = User::factory()->create();

    Livewire::test(CreateBooking::class)
        ->fillForm([
            'student_id' => $student->id,
            'slot_id'    => $slot->id,
            'session_id' => 10,
            'creator_id' => 10,
            'status' => 'completed'
        ])
        ->call('create')
        ->assertHasNoFormErrors();

    $this->assertDatabaseHas('bookings',['slot_id'=>$slot->id,'student_id'=>$student->id]);
});

