<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Session;
use App\Models\SessionAttendance;
use App\Models\User;

class SessionAttendanceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SessionAttendance::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'session_id' => Session::inRandomOrder()->value('id') ?? Session::factory(),
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'joined_at' => fake()->dateTime(),
            'left_at' => fake()->dateTime(),
        ];
    }
}
