<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TutorAvailabilityResource\Pages;
use App\Filament\Resources\TutorAvailabilityResource\RelationManagers;
use App\Models\TutorAvailability;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TutorAvailabilityResource extends Resource
{
    protected static ?string $model = TutorAvailability::class;
 
    public static function getNavigationGroup(): ?string
    {
        return 'Tutors';
    }

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-clock';
    }

    public static function getNavigationLabel(): string
    {
        return 'Tutor Availability';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('tutor_id')
                    ->relationship('tutor', 'name')
                    ->required(),
                Forms\Components\TextInput::make('day_of_week')
                    ->required(),
                Forms\Components\TextInput::make('start_time')
                    ->required(),
                Forms\Components\TextInput::make('end_time')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('tutor.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('day_of_week'),
                Tables\Columns\TextColumn::make('start_time'),
                Tables\Columns\TextColumn::make('end_time'),
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
            'index' => Pages\ListTutorAvailabilities::route('/'),
            'create' => Pages\CreateTutorAvailability::route('/create'),
            'edit' => Pages\EditTutorAvailability::route('/{record}/edit'),
        ];
    }
}
