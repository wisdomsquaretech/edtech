<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Session;
use App\Models\SessionFeedback;
use App\Models\User;

class SessionFeedbackFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SessionFeedback::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'session_id' => Session::inRandomOrder()->value('id') ?? Session::factory(),
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'rating' => fake()->numberBetween(1, 10),
            'comments' => fake()->text(),
            'submitted_at' => fake()->dateTime(),
        ];
    }
}
