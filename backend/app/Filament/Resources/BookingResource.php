<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Filament\Resources\BookingResource\RelationManagers;
use App\Models\Booking;
use App\Models\Session;
use App\Models\TutorAvailabilitySlot;
use App\Models\User;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Models\Lesson;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\TextEntry;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;    

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    public static function form(Form $form): Form
    {       
        return $form
            ->schema([
                Forms\Components\Select::make('student_id')
                    ->relationship('student', 'name', fn($query) => $query->role('student'))
                    ->required()
                    ->columnSpan('full'),
                Forms\Components\Select::make('tutor_id')
                    ->label('Filter by Tutor')
                    ->options(function (callable $get) {
                          
                        $options = User::whereHas('tutorAvailabilitySlots', function ($q) {
                            $q->where('is_booked', false);
                            $q->where('slot_date', '>=', now()->toDateString());
                        })->pluck('name', 'id')->toArray();

                        // Get current record ID from form context:
                        $record = $get('record'); // Usually this won't be set, so use below fallback
            
                        // Alternatively, get from request route:
                        $recordId = request()->route('record');

                        if ($recordId) {
                            $booking = Booking::find($recordId);
                            if ($booking && $booking->tutor_id && !isset($options[$booking->tutor_id])) {
                                $options[$booking->tutor_id] = $booking->tutor->name;
                            }
                        }
                        return $options;
                    })
                    ->searchable()
                    ->reactive()
                    ->required()
                    ->afterStateUpdated(fn(callable $set) => $set('slot_id', null)),                   

                Forms\Components\Select::make('slot_id')
                    ->label('Tutor Availability Slot')
                    ->options(function (callable $get) {

                        $query = TutorAvailabilitySlot::with('tutor')
                            ->where('is_booked', false)
                            ->where('slot_date', '>=', now()->toDateString());

                        if ($get('tutor_id')) {
                            $query->where('tutor_id', $get('tutor_id'));
                        }

                        return $query->get()->mapWithKeys(function ($slot) {
                            return [
                                $slot->id => "{$slot->slot_date->format('d-m-Y')} (" .
                                    date('h:i a', strtotime($slot->start_time)) . " - " .
                                    date('h:i a', strtotime($slot->end_time)) . ")"
                            ];
                        });
                    })
                    ->visible(fn ($get) => !empty($get('tutor_id')))          
                    ->searchable()
                    ->preload()
                    ->required()
                    ->reactive()                                        
                    ->columnSpan('full')
                    // below rule for test cases check
                    ->rule(function ($get) {
                        return function (string $attribute, $value, Closure $fail) {
                            $slot = TutorAvailabilitySlot::find($value);
                            if (!$slot) {
                                return;
                            }                
                            $bookingCount = Booking::where('slot_id', $slot->id)->count();
                
                            if ($bookingCount >= $slot->capacity) {
                                $fail("This slot is already fully booked.");
                            }
                        };
                    }),        

                Forms\Components\Select::make('lesson_id')
                    ->label('Filter by Lesson')
                    ->options(Lesson::orderBy('title')->pluck('title', 'id'))
                    ->options(function () {
                        return Lesson::whereHas('sessions')->orderBy('title')->pluck('title', 'id');
                    })
                    ->searchable()
                    ->preload()
                    ->reactive()
                    ->afterStateUpdated(fn (callable $set) => $set('session_id', null)) // Reset session when lesson changes
                    ->required(),
                    //->visible(fn ($get, $livewire) => !($livewire instanceof ViewBooking)),                 
                Forms\Components\Select::make('session_id')
                    ->label('Session')
                    ->options(function (callable $get) {
                        $query = Session::with(['student', 'lesson'])
                                ->when($get('lesson_id'), fn ($q, $lessonId) => $q->where('lesson_id', $lessonId))
                                ->orderBy('start_time', 'asc');
                        return $query
                                ->get()
                                ->filter(fn ($session) => $session->student && $session->lesson)
                                ->mapWithKeys(function ($session) {                            
                                 return [
                                    //$session->id => "{$session->student->name} – {$session->lesson->title} ({$session->start_time->format('d-m-Y H:i')} to {$session->end_time->format('H:i')})"
                                    $session->id => "{$session->start_time->format('d-m-Y')} ({$session->start_time->format('h:i a')} - {$session->end_time->format('h:i a')})"
                                ];
                        });
                    })
                    ->searchable()
                    ->preload()
                    ->required()
                    ->columnSpan('full')
                    ->reactive()
                    ->visible(fn ($get) => !empty($get('lesson_id'))),
                Select::make('status')
                    ->label('Status')
                    ->options([
                        'booked' => 'Booked',
                        'cancelled' => 'Cancelled',
                        'completed' => 'Completed'
                    ])
                    ->default('booked'),
                Forms\Components\Select::make('creator_id')
                    ->relationship('creator', 'name')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('student.name')
                    ->numeric()
                    ->sortable(),
                //Tables\Columns\TextColumn::make('slot.id')
                Tables\Columns\TextColumn::make('slot.tutor.name')
                    ->numeric()
                    ->sortable(),

                Tables\Columns\TextColumn::make('slot')
                    ->numeric()
                    ->sortable()
                    ->formatStateUsing(fn (mixed $state, $record) => $record->slot
                        ? $record->slot->slot_date->format('d-m-Y') . ' (' .
                          date('h:i a', strtotime($record->slot->start_time)) . ' - ' .
                          date('h:i a', strtotime($record->slot->end_time)) . ')'
                        : '—'
                    ),
                
                Tables\Columns\TextColumn::make('session.lesson.title')
                    ->numeric()
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('session')
                    ->numeric()
                    ->sortable()
                    ->formatStateUsing(fn (mixed $state, $record) => $record->session
                    ? $record->session->start_time->format('d-m-Y') . ' (' .
                      date('h:i a', strtotime($record->session->start_time)) . ' - ' .
                      date('h:i a', strtotime($record->session->end_time)) . ')'
                    : '—'
                ),

                // Tables\Columns\TextColumn::make('session.id')
                //     ->numeric()
                //     ->sortable(),
                Tables\Columns\TextColumn::make('status'),
                Tables\Columns\TextColumn::make('creator.name')
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
            'index' => Pages\ListBookings::route('/'),
            'create' => Pages\CreateBooking::route('/create'),
            'edit' => Pages\EditBooking::route('/{record}/edit'),
            'view' => Pages\ViewBooking::route('/{record}'),

        ];
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                TextEntry::make('student.name')
                    ->label('Student'),

                TextEntry::make('slot.tutor.name')
                    ->label('Tutor'),

                TextEntry::make('slot')
                    ->label('Tutor Availability Slot')
                    ->formatStateUsing(fn (mixed $state, $record) => $record->slot
                        ? $record->slot->slot_date->format('d-m-Y') . ' (' .
                          date('h:i a', strtotime($record->slot->start_time)) . ' - ' .
                          date('h:i a', strtotime($record->slot->end_time)) . ')'
                        : '—'
                    ),

                TextEntry::make('session.lesson.title')
                    ->label('Lesson'),

                TextEntry::make('session')
                    ->label('Session')
                    ->formatStateUsing(fn (mixed $state, $record) => $record->session
                        ? $record->session->start_time->format('d-m-Y') . ' (' .
                          date('h:i a', strtotime($record->session->start_time)) . ' - ' .
                          date('h:i a', strtotime($record->session->end_time)) . ')'
                        : '—'
                    ),

                TextEntry::make('status')
                    ->label('Status')
                    ->formatStateUsing(fn (mixed $state) => ucfirst($state)),

                TextEntry::make('creator.name')
                    ->label('Created By'),

                TextEntry::make('created_at')
                    ->label('Created At')
                    ->dateTime(),

                TextEntry::make('updated_at')
                    ->label('Updated At')
                    ->dateTime(),
            ]);
    }
}
