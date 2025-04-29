<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SessionAttendanceResource\Pages;
use App\Filament\Resources\SessionAttendanceResource\RelationManagers;
use App\Models\SessionAttendance;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Get;
use Closure;

class SessionAttendanceResource extends Resource
{
    protected static ?string $model = SessionAttendance::class;

    public static function getNavigationGroup(): ?string
    {
        return 'Sessions';
    }

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-check-circle';
    }

    public static function getNavigationLabel(): string
    {
        return 'Attendances';
    }
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('session_id')
                    ->relationship('session', 'id')
                    ->required(),
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                Forms\Components\DateTimePicker::make('joined_at')
                    ->required(),
                Forms\Components\DateTimePicker::make('left_at')
                    ->required()
                    ->rules([
                        'required',
                        fn(Get $get): Closure => function (string $attribute, $value, Closure $fail) use ($get) {
                            if (strtotime($value) <= strtotime($get('joined_at'))) {
                                $fail('The left time must be after the joined time.');
                            }
                        },
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('session.id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('joined_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('left_at')
                    ->dateTime()
                    ->sortable(),
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
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSessionAttendances::route('/'),
            'create' => Pages\CreateSessionAttendance::route('/create'),
            'edit' => Pages\EditSessionAttendance::route('/{record}/edit'),
        ];
    }
}
