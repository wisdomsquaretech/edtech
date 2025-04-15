<?php

namespace App\Filament\Resources\TutorStudentSessionLookupResource\Pages;

use App\Filament\Resources\TutorStudentSessionLookupResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTutorStudentSessionLookups extends ListRecords
{
    protected static string $resource = TutorStudentSessionLookupResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
