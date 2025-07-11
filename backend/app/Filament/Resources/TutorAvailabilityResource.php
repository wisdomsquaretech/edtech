<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TutorAvailabilityResource\Api\TutorAvailabilityApiService;
use App\Filament\Resources\TutorAvailabilityResource\Pages;
use App\Filament\Resources\TutorAvailabilityResource\RelationManagers;
use App\Models\TutorAvailability;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Get;
use Closure;

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
                Select::make('day_of_week')
                    ->label('Day of week')
                    ->options([
                        'monday' => 'Monday',
                        'tuesday' => 'Tuesday',
                        'wednesday' => 'Wednesday',
                        'thursday' => 'Thursday',
                        'friday' => 'Friday',
                        'saturday' => 'Saturday',
                        'sunday' => 'Sunday',
                    ])
                    ->required(),
                //Forms\Components\TextInput::make('start_time')
                //Forms\Components\TextInput::make('end_time')
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

    public static function api(): void
    {
        // Explicitly call the API service to initialize handlers
        TutorAvailabilityApiService::handlers();
    }
}
