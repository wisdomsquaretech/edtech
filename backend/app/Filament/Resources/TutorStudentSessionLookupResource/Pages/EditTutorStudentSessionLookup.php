<?php

namespace App\Filament\Resources\TutorStudentSessionLookupResource\Pages;

use App\Filament\Resources\TutorStudentSessionLookupResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTutorStudentSessionLookup extends EditRecord
{
    protected static string $resource = TutorStudentSessionLookupResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
