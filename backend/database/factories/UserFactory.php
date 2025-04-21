<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => fake()->dateTime(),
            'remember_token' => fake()->uuid(),
            'password' => fake()->password(),
            'role' => fake()->randomElement(["tutor", "student", "coordinator"]),
            'timezone' => fake()->word(),
            'bio' => fake()->text(),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (User $user) {
            $role = $user->role;

            // Ensure the role exists before assigning
            Role::firstOrCreate(['name' => $role]);

            // Assign the role using Spatie
            $user->assignRole($role);
        });
    }
}
