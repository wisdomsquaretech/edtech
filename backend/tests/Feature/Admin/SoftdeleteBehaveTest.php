<?php 

use App\Filament\Resources\UserResource\Pages\ListUsers;
use App\Models\User;
use Filament\Tables\Actions\RestoreAction;
use Livewire\Livewire;
use function Pest\Laravel\actingAs;

beforeEach(function(){
    $this->admin = User::factory()->create()->assignRole('admin');
    actingAs($this->admin, 'web');
});

it('soft‑deletes and restores a user', function(){
    
    $user = User::factory()->create();
    $user->delete(); // soft-deletes

    Livewire::test(ListUsers::class)      
        ->callTableAction('restore', $user)
        ->assertHasNoTableActionErrors();

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'deleted_at' => null,
    ]);

});