<?php

namespace App\Helpers;

use Spatie\Permission\Models\Role;
use App\Models\DefaultRolePermission;
use Spatie\Permission\Models\Permission;
use Filament\Notifications\Notification;

class PermissionHelper
{
    public static function resetRolePermissionsToDefault(int $roleId): void
    {       
        // Find the role by its ID
        $role = Role::findOrFail($roleId);

        // Get default permissions for this role from the `default_role_permissions` table
        $defaultPermissions = DefaultRolePermission::where('role_id', $roleId)
            ->pluck('permission_id')
            ->toArray();

        // Optional: Ensure the permissions exist in Spatie's `permissions` table
        $validPermissionIds = Permission::whereIn('id', $defaultPermissions)
            ->pluck('id')
            ->toArray();

        // If no valid permissions are found, return early
        if (empty($validPermissionIds)) {
            Notification::make()
                ->title('Invalid Permissions')
                ->body("No valid permissions were found for role with ID {$roleId}.")
                ->error()
                ->send();
            return;
        }

        // Sync the permissions: Remove old permissions and assign new ones
        $role->syncPermissions($validPermissionIds);

        // Notify user of success
        Notification::make()
            ->title('Permissions Reset')
            ->body("The default permissions were successfully applied to the role.")
            ->success()
            ->send();
    }
}
