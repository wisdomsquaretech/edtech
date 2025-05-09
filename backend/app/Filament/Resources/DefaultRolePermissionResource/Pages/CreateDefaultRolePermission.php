<?php

namespace App\Filament\Resources\DefaultRolePermissionResource\Pages;

use App\Filament\Resources\DefaultRolePermissionResource;
use App\Models\DefaultRolePermission;
use Filament\Actions;
use BezhanSalleh\FilamentShield\Support\Utils;

use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Collection;
use Illuminate\Support\Arr;

class CreateDefaultRolePermission extends CreateRecord
{
    protected static string $resource = DefaultRolePermissionResource::class;
    public Collection $permissions;

    protected function mutateFormDataBeforeCreate(array $data): array
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

    protected function afterCreate(): void
    {
        $permissionModels = collect();
        $this->permissions->each(function ($permission) use ($permissionModels) {
            $permissionModels->push(Utils::getPermissionModel()::firstOrCreate([
                /** @phpstan-ignore-next-line */
                'name' => $permission,
                //'guard_name' => $this->data['guard_name'],
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
//        $this->record->syncPermissions($permissionModels);
    }
}
