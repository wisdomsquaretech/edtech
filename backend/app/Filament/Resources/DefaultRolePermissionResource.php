<?php
namespace App\Filament\Resources;

use App\Filament\Resources\DefaultRolePermissionResource\Pages\CreateDefaultRolePermission;
use App\Filament\Resources\DefaultRolePermissionResource\Pages\EditDefaultRolePermission;
use App\Filament\Resources\DefaultRolePermissionResource\Pages\ListDefaultRolePermissions;
use App\Models\DefaultRolePermission;
use App\Models\Permission;
use App\Models\Role;
use BezhanSalleh\FilamentShield\FilamentShieldPlugin;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Forms\Components\Component;
use BezhanSalleh\FilamentShield\Facades\FilamentShield;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

use BezhanSalleh\FilamentShield\Support\Utils;

class DefaultRolePermissionResource extends Resource 
{
    protected static ?string $model = Role::class;
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $label = 'Default Role Permissions';
    
    public static function form(Form $form): Form
    {        
        return $form         
        ->schema([
            Forms\Components\Grid::make()
                ->schema([
                    Forms\Components\Section::make()
                        ->schema([
                            Forms\Components\TextInput::make('name')
                                ->label(__('filament-shield::filament-shield.field.name'))
                                ->unique(ignoreRecord: true)
                                ->required()
                                ->maxLength(255),
                            Forms\Components\TextInput::make('guard_name')
                                ->label(__('filament-shield::filament-shield.field.guard_name'))
                                ->default(Utils::getFilamentAuthGuard())
                                ->nullable()
                                ->maxLength(255),
                        ])
                        ->columns([
                            'sm' => 2,
                            'lg' => 3,
                        ]),
                ]),
                static::getShieldFormComponents(),            
        ]);
       
    }
    public static function getShieldFormComponents(): Component
    {
        return Forms\Components\Tabs::make('Permissions')
            ->contained()
            ->tabs([
                static::getTabFormComponentForResources(),             
            ])
            ->columnSpan('full');
    }

    public static function getTabFormComponentForResources(): Component
    {
        return static::shield()->hasSimpleResourcePermissionView()
            ? static::getTabFormComponentForSimpleResourcePermissionsView()
            : Forms\Components\Tabs\Tab::make('resources')
                ->label(__('filament-shield::filament-shield.resources'))  
                ->badge(static::getResourceTabBadgeCount())            
                ->schema([
                    Forms\Components\Grid::make()
                        ->schema(static::getResourceEntitiesSchema())                      
                ]);
    }

    public static function getResourceEntitiesSchema(): ?array
    {
        return collect(FilamentShield::getResources())
            ->sortKeys()
            ->map(function ($entity) {
                $sectionLabel = strval(
                    static::shield()->hasLocalizedPermissionLabels()
                    ? FilamentShield::getLocalizedResourceLabel($entity['fqcn'])
                    : $entity['model']
                );

                return Forms\Components\Section::make($sectionLabel)                   
                    ->compact()
                    ->schema([
                        static::getCheckBoxListComponentForResource($entity),
                    ])
                    ->columnSpan(static::shield()->getSectionColumnSpan())
                    ->collapsible();
            })
            ->toArray();
    }
    public static function getCheckBoxListComponentForResource(array $entity): Component
    {
        $permissionsArray = static::getResourcePermissionOptions($entity);

        return static::getCheckboxListFormComponent(
            name: $entity['resource'],
            options: $permissionsArray,
            columns: static::shield()->getResourceCheckboxListColumns(),
            columnSpan: static::shield()->getResourceCheckboxListColumnSpan(),
            searchable: false
        );
    }

    public static function getResourcePermissionOptions(array $entity): array
    {
        return collect(Utils::getResourcePermissionPrefixes($entity['fqcn']))
            ->flatMap(function ($permission) use ($entity) {
                $name = $permission . '_' . $entity['resource'];
                $label = static::shield()->hasLocalizedPermissionLabels()
                    ? FilamentShield::getLocalizedResourcePermissionLabel($permission)
                    : $name;

                return [
                    $name => $label,
                ];
            })
            ->toArray();
    }

    public static function getCheckboxListFormComponent(string $name, array $options, bool $searchable = true, array | int | string | null $columns = null, array | int | string | null $columnSpan = null): Component
    {
        return Forms\Components\CheckboxList::make($name)
            ->label('')
            ->options(fn (): array => $options)
            ->searchable($searchable)
            ->afterStateHydrated(
                fn (Component $component, string $operation, ?Model $record) => static::setPermissionStateForRecordPermissions(
                    component: $component,
                    operation: $operation,
                    permissions: $options,
                    record: $record
                )
            )
            ->dehydrated(fn ($state) => ! blank($state))
            ->bulkToggleable()
            ->gridDirection('row')
            ->columns($columns ?? static::shield()->getCheckboxListColumns())
            ->columnSpan($columnSpan ?? static::shield()->getCheckboxListColumnSpan());
    }

    public static function setPermissionStateForRecordPermissions(Component $component, string $operation, array $permissions, ?Model $record): void
    {
        if (in_array($operation, ['edit', 'view'])) {

            if (blank($record)) {
                return;
            }
           $roleId = $record->id;
            if ($component->isVisible() && count($permissions) > 0) {
                $component->state(
                    collect($permissions)
                        /** @phpstan-ignore-next-line */
                        ->filter(fn ($value, $key) => static::checkPermission($key, $roleId))
                        ->keys()
                        ->toArray()
                );
            }
        }
    }

    
    public static function checkPermission($permission, $roleId): bool
    {                   
        $permissionId = Permission::select('id')->where('name','=', $permission)->first();        
        if($permissionId) {
            $defaultRole =  DefaultRolePermission::where('permission_id','=',$permissionId['id'])
                                    ->where('role_id','=', $roleId)->first();        
            if($defaultRole) {
                return true;
            }
        }             
        return false;
    }

    public static function shield(): FilamentShieldPlugin
    {
        return FilamentShieldPlugin::get();
    }

    public static function getResourceTabBadgeCount(): ?int
    {
        return collect(FilamentShield::getResources())
            ->map(fn ($resource) => count(static::getResourcePermissionOptions($resource)))
            ->sum();
    }

    public static function table(Table $table): Table
    {
        return $table           
            ->query(
                Role::query()
                    ->select('roles.*')
                    ->selectRaw('COUNT(default_role_permissions.permission_id) as permission_count')
                    ->leftJoin('default_role_permissions', 'roles.id', '=', 'default_role_permissions.role_id')
                    ->groupBy('roles.id')         
           )
            ->columns([
                TextColumn::make('name')->label('Name')
                ->formatStateUsing(fn ($state): string => Str::headline($state))
                ->searchable(),
                TextColumn::make('guard_name')->label('Guard Name')->badge()->colors(['warning'])
                ->formatStateUsing(fn ($state): string => Str::headline($state))
                ->searchable(),
                TextColumn::make('permission_count')->label('Permissions')->badge()->colors(['success']),
                TextColumn::make('updated_at')->label('Updated At'),
            ])          
            ->actions([               
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getTableRecordKey($record): string
    {
        return (string) $record->id;
    }

    public static function getPages(): array
    {
        return [
            'index' => ListDefaultRolePermissions::route('/'),       
            'create' => CreateDefaultRolePermission::route('/create'),
            'edit' => EditDefaultRolePermission::route('/{record}/edit'),
        ];
    }
//     public static function canCreate(): bool
//    {
//       return false;
//    }
}
