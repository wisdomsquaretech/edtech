<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TutorAvailabilitySlotResource\Pages;
use App\Filament\Resources\TutorAvailabilitySlotResource\RelationManagers;
use App\Models\TutorAvailabilitySlot;
use Filament\Forms;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Get;
use Closure;

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
                    ->relationship('tutor', 'name', fn($query) => $query->role('tutor'))
                    ->required(),
                Forms\Components\DatePicker::make('slot_date')
                    ->required(),
                TimePicker::make('start_time')
                    ->required()
                    ->format('H:i')
                    ->seconds(false)
                    ->rules(['required', 'date_format:H:i']),
                TimePicker::make('end_time')
                    ->required()
                    ->format('H:i')
                    ->seconds(false)
                    ->rules([
                        'required',
                        'date_format:H:i',
                        fn(Get $get): Closure => function (string $attribute, $value, Closure $fail) use ($get) {
                            if (strtotime($value) <= strtotime($get('start_time'))) {
                                $fail('End time must be after start time.');
                            }
                        },
                    ]),
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
                    ->searchable()
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
