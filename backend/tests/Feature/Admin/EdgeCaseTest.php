<?php 

// use App\Filament\Resources\BookingResource\Pages\CreateBooking;
// use App\Models\Booking;
// use App\Models\TutorAvailabilitySlot;
// use App\Models\User;
// use Livewire\Livewire;
// use function Pest\Laravel\actingAs;

// beforeEach(function(){
//     $this->admin = User::factory()->create()->assignRole('admin');
//     actingAs($this->admin, 'web');
// });

// it('prevents booking over capacity', function(){

//     $slot = TutorAvailabilitySlot::factory()->create(['capacity'=>1]);

//     Booking::factory()->create(['slot_id'=>$slot->id]);

//     Livewire::test(CreateBooking::class)
//         ->fillForm([
//             'slot_id' => $slot->id,
//             'student_id' => User::factory()->create()->id
//         ])
//         ->call('create')
//         ->assertHasErrors(['slot_id' => 'capacity_exceeded']);
// });
