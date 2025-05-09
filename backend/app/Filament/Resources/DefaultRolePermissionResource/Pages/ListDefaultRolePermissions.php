<?php

namespace App\Filament\Resources\DefaultRolePermissionResource\Pages;

use App\Filament\Resources\DefaultRolePermissionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListDefaultRolePermissions extends ListRecords
{
    protected static string $resource = DefaultRolePermissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
