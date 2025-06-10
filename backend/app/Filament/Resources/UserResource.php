<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Filament\Resources\UserResource\RelationManagers\SessionsRelationManager;
use App\Models\Booking;
use App\Models\Curriculum;
use App\Models\School;
use App\Models\Session;
use App\Models\User;
use BezhanSalleh\FilamentShield\Contracts\HasShieldPermissions;
use Filament\Forms;
use Filament\Forms\Components\Radio;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Spatie\Permission\Models\Role;
use Filament\Forms\Components\Select;
use Filament\Tables\Actions\RestoreAction;
class UserResource extends Resource implements HasShieldPermissions
{
    public static function getPermissionPrefixes(): array
    {
        return [
            'view',
            'view_any',
            'create',
            'update',
            'restore',
            'restore_any',
            'replicate',
            'reorder',
            'delete',
            'delete_any',
            'force_delete',
            'force_delete_any',
        ];
    }
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-user';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->regex('/^[a-zA-Z\s]+$/')
                    ->minLength(2)
                    ->maxLength(255),
                Forms\Components\TextInput::make('email')
                    ->email()
                    //->unique()
                    ->required()
                    ->maxLength(255),
                //Forms\Components\DateTimePicker::make('email_verified_at'),
                Forms\Components\TextInput::make('password')
                    ->password()
                    ->required()
                    ->maxLength(255),
                // Forms\Components\TextInput::make('role')
                //     ->required(),
                Forms\Components\Select::make('roles')
                    ->label('Role')
                    ->relationship('roles', 'name') // This pulls from Spatie's roles
                    ->preload()
                    ->searchable()
                    ->required()
                    ->default(function (?User $record) {
                        return $record?->roles->first()?->id;
                    }),
                Forms\Components\TextInput::make('timezone')
                    ->maxLength(255),
                Forms\Components\Textarea::make('bio')
                    ->columnSpanFull(),
                Select::make('schools')
                    ->label('Schools')
                    ->relationship('schools', 'name')
                    ->multiple()
                    ->searchable()
                    ->preload()
                    ->default(function (?User $record) {
                        return $record?->schools->pluck('id')->toArray();
                    }),
                // Select::make('curriculums')
                //     ->label('Curriculums')
                //     ->relationship('curricula', 'title')
                //     ->multiple()
                //     ->searchable()
                //     ->preload()
                //     ->default(function (?User $record) {
                //         return $record?->curricula->pluck('id')->toArray();
                //     }),
                // Select::make('sessions')
                //     ->label('Sessions')
                //     ->relationship('sessions', 'id')
                //     ->multiple()
                //     ->searchable()
                //     ->preload()
                //     ->default(function (?User $record) {
                //         return $record?->sessions->pluck('id')->toArray();
                //     }),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email_verified_at')
                    ->dateTime()
                    ->sortable(),
                //Tables\Columns\TextColumn::make('role'),
                Tables\Columns\TextColumn::make('roles.name')
                    ->label('Role')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('timezone')
                    ->searchable(),
                Tables\Columns\TextColumn::make('schools.name')
                    ->label('Schools')
                    ->badge()
                    ->separator(', ')
                    ->tooltip(fn($record) => $record->schools->pluck('name')->join(', ')),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //  Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\RestoreAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->label('Delete')
                    ->visible(function (User $record) {
                        $authUser = auth()->user();
                         
                        if (!$authUser) {
                            return false;
                        }

                        $targetIsSuperAdmin = $record->hasRole('super_admin');
                        $authIsSuperAdmin = $authUser->hasRole('super_admin');

                        // Super Admin can delete anyone
                        if ($authIsSuperAdmin) {
                            return true;
                        }

                        // Admin can delete everyone except Super Admin
                        if ($authUser->hasRole('admin') && !$targetIsSuperAdmin) {
                            return true;
                        }

                        // Everyone else can’t see delete
                        return false;
                    })
                    ->modalHeading('Delete User')
                    ->modalDescription(fn(User $record) => "What should be done with {$record->name}'s data?")
                    ->form([
                        Radio::make('action')
                            ->label('Content Handling')
                            ->options([
                                'delete' => 'Delete all related data',
                                'reassign' => 'Reassign content to another user',
                            ])
                            ->default('delete')
                            ->required(),

                        Select::make('reassign_to')
                            ->label('Select user to reassign to')                          
                            ->options(function (User $record) {
                                // Map “role being deleted”  ➜  “roles allowed to receive the data”
                                $matrix = [
                                    'student' => ['tutor'],
                                    'tutor' => ['super_admin', 'admin', 'coordinator', 'tutor'],
                                    'coordinator' => ['super_admin', 'admin', 'tutor'],
                                    'admin' => ['super_admin', 'admin'],
                                ];

                                // Pick one main role.  (If you allow multi–role users, adapt this.)
                                $primaryRole = $record->roles()->first()?->name;
                                $allowedRoles = $matrix[$primaryRole] ?? [];

                                // Role priority map
                                $roleOrder = [
                                    'super_admin' => 1,
                                    'admin' => 2,
                                    'coordinator' => 3,
                                    'tutor' => 4,
                                ];

                                // Build the dropdown list
                                return User::query()
                                    ->with('roles') // Ensure roles are eager-loaded
                                    ->where('id', '!=', $record->id)          // don’t show the user being deleted
                                    ->whereHas('roles', function ($q) use ($allowedRoles) {
                                        $q->whereIn('name', $allowedRoles);
                                    })
                                    ->get()
                                    ->sortBy(function ($user) use ($roleOrder) {
                                        $role = strtolower($user->roles->first()?->name ?? '');
                                        return $roleOrder[$role] ?? 99;
                                    })
                                    ->mapWithKeys(function ($user) {
                                        $role = $user->roles->first()->name; //?? 'No Role';
                                        return [$user->id => "{$user->name} ({$role})"];
                                    });
                            })
                            ->visible(fn($get) => $get('action') === 'reassign')
                            ->requiredIf('action', 'reassign')
                            ->searchable(),
                    ])
                    ->action(function (array $data, User $record) {
                        if ($data['action'] === 'reassign') {
                            $newUserId = $data['reassign_to'];

                            // Reassign relationships
                            // Optionally detach many-to-many relationships
            
                            $record->languages()->update(['user_id' => $newUserId]);

                            // sessions
                            $sessionIds = $record->sessions()->pluck('session_id')->toArray();
                            $record->sessions()->detach();
                            User::find($newUserId)?->sessions()->syncWithoutDetaching($sessionIds);
                            Session::where('tutor_id', $record->id)->update(['tutor_id' => $newUserId]);
                            Session::where('student_id', $record->id)->update(['student_id' => $newUserId]);

                            // curriculum
                            $curriculumIds = $record->curricula()->pluck('curriculum_id')->toArray();
                            $record->curricula()->detach();
                            User::find($newUserId)?->curricula()->syncWithoutDetaching($curriculumIds);
                            Curriculum::where('creator_id', $record->id)->update(['creator_id' => $newUserId]);

                            // school
                            $schoolIds = $record->schools()->pluck('school_id')->toArray();
                            $record->schools()->detach();
                            User::find($newUserId)?->schools()->syncWithoutDetaching($schoolIds);
                            School::where('coordinator_id', $record->id)->update(['coordinator_id' => $newUserId]);

                            $record->tutorAvailabilities()->update(['tutor_id' => $newUserId]);
                            $record->tutorAvailabilitySlots()->update(['tutor_id' => $newUserId]);

                            $record->sessionAttendances()->update(['user_id' => $newUserId]);
                            $record->sessionStatuses()->update(['user_id' => $newUserId]);
                            $record->tutorHoursLookups()->update(['tutor_id' => $newUserId]);
                            $record->tutorStudentSessionLookups()->update(['user_id' => $newUserId]);

                            Booking::where('student_id', $record->id)->update(['student_id' => $newUserId]);
                            Booking::where('creator_id', $record->id)->update(['creator_id' => $newUserId]);

                            $record->notifications()->update(['creator_id' => $newUserId]);
                            $record->sessionFeedbacks()->update(['user_id' => $newUserId]);
                        } else {
                            // Delete all related data
                            // Also detach pivot relations
                            $record->languages()->delete();

                            $record->curricula()->detach();
                            $record->sessions()->detach();
                            $record->schools()->detach();

                            Session::where('tutor_id', $record->id)->delete();
                            Session::where('student_id', $record->id)->delete();

                            School::where('coordinator_id', $record->id)->delete();
                            Curriculum::where('creator_id', $record->id)->delete();

                            $record->tutorAvailabilities()->delete();
                            $record->tutorAvailabilitySlots()->delete();

                            $record->sessionAttendances()->delete();
                            $record->sessionStatuses()->delete();

                            $record->tutorHoursLookups()->delete();
                            $record->tutorStudentSessionLookups()->delete();
                            Booking::where('student_id', $record->id)->delete();
                            Booking::where('creator_id', $record->id)->delete();
                            $record->notifications()->delete();
                            $record->sessionFeedbacks()->delete();
                        }

                        $record->delete(); // Soft delete
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            SessionsRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->with(['schools', 'roles'])
            ->withTrashed();
    }
}
