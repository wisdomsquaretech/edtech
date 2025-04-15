<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TutorHoursLookupResource\Pages;
use App\Filament\Resources\TutorHoursLookupResource\RelationManagers;
use App\Models\TutorHoursLookup;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TutorHoursLookupResource extends Resource
{
    protected static ?string $model = TutorHoursLookup::class;

    public static function getNavigationGroup(): ?string
    {
        return 'Tutors';
    }

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-magnifying-glass';
    }

    public static function getNavigationLabel(): string
    {
        return 'Tutor Hours Lookup';
    }
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('session_id')
                    ->relationship('session', 'id')
                    ->required(),
                Forms\Components\Select::make('tutor_id')
                    ->relationship('tutor', 'name')
                    ->required(),
                Forms\Components\TextInput::make('duration')
                    ->required()
                    ->numeric(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('session.id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('tutor.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('duration')
                    ->numeric()
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
            'index' => Pages\ListTutorHoursLookups::route('/'),
            'create' => Pages\CreateTutorHoursLookup::route('/create'),
            'edit' => Pages\EditTutorHoursLookup::route('/{record}/edit'),
        ];
    }
}
