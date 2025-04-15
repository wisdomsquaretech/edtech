<?php

namespace App\Filament\Resources\TutorAvailabilitySlotResource\Pages;

use App\Filament\Resources\TutorAvailabilitySlotResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTutorAvailabilitySlots extends ListRecords
{
    protected static string $resource = TutorAvailabilitySlotResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
