<?php 

use App\Filament\Resources\SchoolResource\Pages\ListSchools;
use App\Models\School;
use App\Models\User;
use Livewire\Livewire;
use function Pest\Laravel\{actingAs};

it('forbids non‑admin from get school', function() {
   
    $tutor = User::factory()->create()->assignRole('tutor');
   
    actingAs($tutor,'web')
        ->get('/admin/schools')
        ->assertForbidden();
});
