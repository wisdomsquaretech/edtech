<?php

namespace App\Filament\Resources\TutorHoursLookupResource\Pages;

use App\Filament\Resources\TutorHoursLookupResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTutorHoursLookup extends EditRecord
{
    protected static string $resource = TutorHoursLookupResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
