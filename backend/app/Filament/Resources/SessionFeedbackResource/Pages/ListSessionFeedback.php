<?php

namespace App\Filament\Resources\SessionFeedbackResource\Pages;

use App\Filament\Resources\SessionFeedbackResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSessionFeedback extends ListRecords
{
    protected static string $resource = SessionFeedbackResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
