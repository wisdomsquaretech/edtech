<?php

namespace App\Filament\Resources\TutorAvailabilityResource\Pages;

use App\Filament\Resources\TutorAvailabilityResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTutorAvailability extends EditRecord
{
    protected static string $resource = TutorAvailabilityResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
