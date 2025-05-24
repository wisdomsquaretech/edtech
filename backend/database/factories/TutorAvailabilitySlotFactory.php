<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\TutorAvailabilitySlot;
use App\Models\User;
use Carbon\Carbon;

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
            'tutor_id' => User::role('tutor')->inRandomOrder()->value('id')
                      ?? User::factory()->afterCreating(fn ($u) => $u->assignRole('tutor')),
            
            'slot_date' => Carbon::now()->addDays(fake()->numberBetween(1, 30))->format('Y-m-d'),

            'start_time' => $start = fake()->time('H:i'),
            'end_time' => Carbon::createFromFormat('H:i', $start)
                        ->addHours(fake()->numberBetween(1, 2))
                        ->format('H:i'),
                        
            'capacity' => fake()->numberBetween(1, 10000),
            'is_booked' => fake()->boolean(),
            'is_deleted' => fake()->dateTime(),
        ];
    }
}
