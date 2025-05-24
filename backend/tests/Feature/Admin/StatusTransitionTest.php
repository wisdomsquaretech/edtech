<?php 

use App\Filament\Resources\SessionResource\Pages\EditSession;
use App\Models\Session;
use App\Models\User;
use Livewire\Livewire;
use function Pest\Laravel\actingAs;

beforeEach(function(){
    $this->admin = User::factory()->create()->assignRole('admin');
    actingAs($this->admin, 'web');
});

it('allows marking a session as completed', function(){
    
    $session = Session::factory()->create(['status' => 'scheduled']);

    Livewire::test(EditSession::class, ['record' => $session->id])
        ->fillForm(['status' => 'completed'])
        ->call('save')
        ->assertHasNoActionErrors();

    $this->assertDatabaseHas('sessions',[
        'id' => $session->id,
        'status' => 'completed'
    ]);
});