<?php

namespace App\Filament\Resources\SessionStatusResource\Pages;

use App\Filament\Resources\SessionStatusResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSessionStatuses extends ListRecords
{
    protected static string $resource = SessionStatusResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
