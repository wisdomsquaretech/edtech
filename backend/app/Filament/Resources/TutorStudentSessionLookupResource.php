<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TutorStudentSessionLookupResource\Pages;
use App\Filament\Resources\TutorStudentSessionLookupResource\RelationManagers;
use App\Models\TutorStudentSessionLookup;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TutorStudentSessionLookupResource extends Resource
{
    protected static ?string $model = TutorStudentSessionLookup::class;
    public static function getNavigationGroup(): ?string
    {
        return 'Tutors';
    }

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-users';
    }

    public static function getNavigationLabel(): string
    {
        return 'Tutor Student Session Lookup';
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
                Forms\Components\TextInput::make('completed')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->integer(),
                Forms\Components\TextInput::make('incomplete')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->integer(),
                Forms\Components\TextInput::make('absent')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->integer(),
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
                Tables\Columns\TextColumn::make('completed')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('incomplete')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('absent')
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
            'index' => Pages\ListTutorStudentSessionLookups::route('/'),
            'create' => Pages\CreateTutorStudentSessionLookup::route('/create'),
            'edit' => Pages\EditTutorStudentSessionLookup::route('/{record}/edit'),
        ];
    }
}
