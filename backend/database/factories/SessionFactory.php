<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Lesson;
use App\Models\School;
use App\Models\Session;
use App\Models\User;

class SessionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Session::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'school_id' => School::inRandomOrder()->value('id') ?? School::factory(),
            'tutor_id' => User::role('tutor')->inRandomOrder()->value('id')
                      ?? User::factory()->afterCreating(fn ($u) => $u->assignRole('tutor')),

            'student_id' => User::role('student')->inRandomOrder()->value('id')
                      ?? User::factory()->afterCreating(fn ($u) => $u->assignRole('student')),

            'lesson_id' => Lesson::inRandomOrder()->value('id') ?? Lesson::factory(),
            'start_time' => fake()->dateTime(),
            'end_time' => fake()->dateTime(),
            'meeting_link' => fake()->url(),
            'notes' => fake()->text(),
            'platform' => fake()->randomElement(["zoom","jitsi"]),
            'checklist_done' => fake()->boolean(),
            'status' => fake()->randomElement(["scheduled","postponed","completed","cancelled"]),
        ];
    }
}
