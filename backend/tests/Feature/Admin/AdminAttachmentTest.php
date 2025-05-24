<?php 

use App\Filament\Resources\SchoolResource\Pages\EditSchool;
use App\Models\School;
use App\Models\User;
use Livewire\Livewire;
use function Pest\Laravel\{actingAs};

test('attaches users to a school in filament admin UI', function(){         

    $admin = User::factory()->create()->assignRole('admin');
    actingAs($admin, 'web');

    $school = School::factory()->create();
    $user = User::factory()->create()->assignRole('tutor');

    Livewire::test(EditSchool::class, ['record' => $school->id])
        ->fillForm([
            'users' => $user->pluck('id')->toArray(),
        ])
        ->call('save')        
        ->assertHasNoFormErrors();
    
    $this->assertTrue(
        $school->fresh()->users->contains($user)
    );
});