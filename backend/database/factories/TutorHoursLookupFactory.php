<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Session;
use App\Models\TutorHoursLookup;
use App\Models\User;

class TutorHoursLookupFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TutorHoursLookup::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'session_id' => Session::inRandomOrder()->value('id') ?? Session::factory(),
            'tutor_id' => User::role('tutor')->inRandomOrder()->value('id')
                      ?? User::factory()->afterCreating(fn ($u) => $u->assignRole('tutor')),
            'duration' => fake()->numberBetween(1, 100),
        ];
    }
}
