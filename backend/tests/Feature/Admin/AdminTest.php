<?php
use App\Filament\Resources\UserResource\Pages\CreateUser;
use App\Filament\Resources\UserResource\Pages\ListUsers;
use App\Models\Role;
use App\Models\User;
use Livewire\Livewire;
use function Pest\Laravel\actingAs;
use Faker\Factory as Faker;

uses(Tests\TestCase::class)->in('Feature/Admin');

// create an admin user 
beforeEach(function(){
    $this->admin = User::factory()->create()->assignRole('admin');
    actingAs($this->admin, 'web');
});

it('lists users', function(){
    Livewire::test(ListUsers::class)
        ->assertStatus(200);
});

it('creates a user', function(){
    
    $studentRole = Role::where('name', 'student')->firstOrFail();

    $faker = Faker::create();
    $faker->unique(true); // clear the unique constraint
    $email = $faker->unique()->safeEmail;

    Livewire::test(CreateUser::class)
        ->fillForm([
            'name' => preg_replace('/[^a-zA-Z\s]/', '', $faker->name),
            'email' => $email,
            'password' => 'secret123',
            'roles' =>  [$studentRole->id]
        ])
        ->call('create')
        ->assertHasNoFormErrors();
        //->assertHasNoFormErrors();        

    $this->assertDatabaseHas('users', ['email' => $email]);

});


