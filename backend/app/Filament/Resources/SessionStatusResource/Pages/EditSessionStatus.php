<?php

namespace App\Filament\Resources\SessionStatusResource\Pages;

use App\Filament\Resources\SessionStatusResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSessionStatus extends EditRecord
{
    protected static string $resource = SessionStatusResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
