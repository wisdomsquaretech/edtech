<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Session;
use App\Models\TutorStudentSessionLookup;
use App\Models\User;

class TutorStudentSessionLookupFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TutorStudentSessionLookup::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'session_id' => Session::factory(),
            'user_id' => User::factory(),
            'completed' => fake()->numberBetween(1, 10000),
            'incomplete' => fake()->numberBetween(1, 10000),
            'absent' => fake()->numberBetween(1, 10000),
        ];
    }
}
