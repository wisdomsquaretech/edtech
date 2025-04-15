<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\TutorAvailabilitySlot;
use App\Models\User;

class TutorAvailabilitySlotFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TutorAvailabilitySlot::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'tutor_id' => User::factory(),
            'slot_date' => fake()->date(),
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),
            'capacity' => fake()->numberBetween(-10000, 10000),
            'is_booked' => fake()->boolean(),
            'is_deleted' => fake()->dateTime(),
        ];
    }
}
