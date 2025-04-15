<?php

namespace App\Filament\Resources\TutorHoursLookupResource\Pages;

use App\Filament\Resources\TutorHoursLookupResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTutorHoursLookups extends ListRecords
{
    protected static string $resource = TutorHoursLookupResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
