<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TutorAvailabilitySlotResource\Pages;
use App\Filament\Resources\TutorAvailabilitySlotResource\RelationManagers;
use App\Models\TutorAvailabilitySlot;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TutorAvailabilitySlotResource extends Resource
{
    protected static ?string $model = TutorAvailabilitySlot::class;

    public static function getNavigationGroup(): ?string
    {
        return 'Tutors';
    }

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-calendar';
    }

    public static function getNavigationLabel(): string
    {
        return 'Tutor Availability Slot';
    }
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('tutor_id')
                    ->relationship('tutor', 'name')
                    ->required(),
                Forms\Components\DatePicker::make('slot_date')
                    ->required(),
                Forms\Components\TextInput::make('start_time')
                    ->required(),
                Forms\Components\TextInput::make('end_time')
                    ->required(),
                Forms\Components\TextInput::make('capacity')
                    ->required()
                    ->numeric(),
                Forms\Components\Toggle::make('is_booked')
                    ->required(),
                Forms\Components\DateTimePicker::make('is_deleted'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('tutor.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('slot_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('start_time'),
                Tables\Columns\TextColumn::make('end_time'),
                Tables\Columns\TextColumn::make('capacity')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_booked')
                    ->boolean(),
                Tables\Columns\TextColumn::make('is_deleted')
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
            'index' => Pages\ListTutorAvailabilitySlots::route('/'),
            'create' => Pages\CreateTutorAvailabilitySlot::route('/create'),
            'edit' => Pages\EditTutorAvailabilitySlot::route('/{record}/edit'),
        ];
    }
}
