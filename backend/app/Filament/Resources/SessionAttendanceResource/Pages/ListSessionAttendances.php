<?php

namespace App\Filament\Resources\SessionAttendanceResource\Pages;

use App\Filament\Resources\SessionAttendanceResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSessionAttendances extends ListRecords
{
    protected static string $resource = SessionAttendanceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
