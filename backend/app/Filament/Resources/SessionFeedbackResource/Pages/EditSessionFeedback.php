<?php

namespace App\Filament\Resources\SessionFeedbackResource\Pages;

use App\Filament\Resources\SessionFeedbackResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSessionFeedback extends EditRecord
{
    protected static string $resource = SessionFeedbackResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
