<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\School;
use App\Models\User;

class SchoolFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = School::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => preg_replace('/[^a-zA-Z\s]/', '', fake()->company() . ' School'),
            'email' => fake()->safeEmail(),
            'address' => fake()->text(),
            'coordinator_id' => User::role('coordinator')->inRandomOrder()->value('id')
                      ?? User::factory()->afterCreating(fn ($u) => $u->assignRole('coordinator')),            
        ];
    }
}
