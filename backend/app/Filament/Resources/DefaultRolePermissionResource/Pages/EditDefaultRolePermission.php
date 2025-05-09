<?php

namespace App\Filament\Resources\DefaultRolePermissionResource\Pages;

use App\Filament\Resources\DefaultRolePermissionResource;
use App\Models\DefaultRolePermission;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use BezhanSalleh\FilamentShield\Support\Utils;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
class EditDefaultRolePermission extends EditRecord
{
    protected static string $resource = DefaultRolePermissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    public Collection $permissions;

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $this->permissions = collect($data)
            ->filter(function ($permission, $key) {
                return ! in_array($key, ['name', 'guard_name', 'select_all', Utils::getTenantModelForeignKey()]);
            })
            ->values()
            ->flatten()
            ->unique();
        if (Arr::has($data, Utils::getTenantModelForeignKey())) {            
            return Arr::only($data, ['name', 'guard_name', Utils::getTenantModelForeignKey()]);
        }
        return Arr::only($data, ['name', 'guard_name']);
    }
 
    protected function afterSave(): void
    {       
        $permissionModels = collect();
        $this->permissions->each(function ($permission) use ($permissionModels) {
            
            $permissionModels->push(Utils::getPermissionModel()::firstOrCreate([
                'name' => $permission,
                'guard_name' => $this->data['guard_name'],
            ]));
        });
     
       $permissionIds = [];
        foreach($permissionModels as $i => $permission) {
            array_push($permissionIds,$permission->id);
        } 
        
        foreach ($permissionIds as $pid) {
            DefaultRolePermission::firstOrCreate([
                'role_id'       => $this->record->id,
                'permission_id' => $pid,
            ]);
        }
    }
}
