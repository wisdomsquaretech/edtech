<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Booking;
use App\Models\Session;
use App\Models\TutorAvailabilitySlot;
use App\Models\User;

class BookingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Booking::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'student_id' => User::role('student')->inRandomOrder()->value('id')
                      ?? User::factory()->afterCreating(fn ($u) => $u->assignRole('student')),
                      
            'slot_id' => TutorAvailabilitySlot::inRandomOrder()->value('id') ?? TutorAvailabilitySlot::factory(),        
            'session_id' =>  Session::inRandomOrder()->value('id') ?? Session::factory(),        
            'status' => fake()->randomElement(["booked","cancelled","completed"]),            
            'creator_id' => User::inRandomOrder()->value('id') ?? User::factory(),
        ];        
    }
}
