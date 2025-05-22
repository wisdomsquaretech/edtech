<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Curriculum;
use App\Models\Lesson;

class LessonFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Lesson::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'curriculum_id' => Curriculum::inRandomOrder()->value('id') ?? Curriculum::factory(),
            'title' => fake()->sentence(4),
            'level' => fake()->randomElement(["beginner","intermediate","advanced"]),
            'description' => fake()->text(),
            'file_type' => fake()->randomElement(["pdf","video","ppt"]),
            'file_path' => fake()->word(),
            'language_code' => fake()->word(),
        ];
    }
}
