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
            'student_id' => User::factory(),
            'slot_id' => TutorAvailabilitySlot::factory(),
            'session_id' => Session::factory(),
            'status' => fake()->randomElement(["booked","cancelled","completed"]),
            'creator_id' => User::factory(),
        ];
    }
}
