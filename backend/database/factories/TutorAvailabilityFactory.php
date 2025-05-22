<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\TutorAvailability;
use App\Models\User;

class TutorAvailabilityFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TutorAvailability::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'tutor_id' => User::role('tutor')->inRandomOrder()->value('id')
                      ?? User::factory()->afterCreating(fn ($u) => $u->assignRole('tutor')),
            'day_of_week' => fake()->randomElement(["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]),
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),
        ];
    }
}
