<?php

namespace App\Filament\Resources\UserResource\RelationManagers;

use App\Models\Session;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Actions\AttachAction;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Get;
use Closure;

class SessionsRelationManager extends RelationManager
{
    protected static string $relationship = 'sessions';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('school_id')
                    ->relationship('school', 'name')
                    ->required(),
                Forms\Components\Select::make('tutor_id')
                    ->relationship('tutor', 'name')
                    ->required(),
                Forms\Components\Select::make('student_id')
                    ->relationship('student', 'name')
                    ->required(),
                Forms\Components\Select::make('lesson_id')
                    ->relationship('lesson', 'title')
                    ->required(),
                Forms\Components\DateTimePicker::make('start_time')
                    ->required(),
                Forms\Components\DateTimePicker::make('end_time')
                    ->required()
                    ->rules([
                        'required',
                        fn(Get $get): Closure => function (string $attribute, $value, Closure $fail) use ($get) {
                            if (strtotime($value) <= strtotime($get('start_time'))) {
                                $fail('End time must be after start time.');
                            }
                        },
                    ]),
                Forms\Components\TextInput::make('meeting_link')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('notes')
                    ->columnSpanFull(),
                Forms\Components\Select::make('platform')
                    ->label('Platform')
                    ->options([
                        'zoom' => 'zoom',
                        'jitsi' => 'jitsi'
                    ])
                    ->required(),
                Forms\Components\Toggle::make('checklist_done')
                    ->required(),
                Forms\Components\Select::make('status')
                    ->label('Status')
                    ->options([
                        'scheduled' => 'Scheduled',
                        'postponed' => 'Postponed',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            // ->recordTitleAttribute('title')
            // ->recordTitle(fn(Session $record): string => "{
            //     ({$record->id}) json_decode(($record->lesson),true)['title']
            //     } ")
            ->recordTitle(function (Session $record) {

                $data = json_decode($record->lesson, true);
                return $record->id . '=>' . $data['title'];
            })
            ->columns([
                Tables\Columns\TextColumn::make('lesson.title'),
                Tables\Columns\TextColumn::make('start_time')->dateTime(),
                Tables\Columns\TextColumn::make('end_time')->dateTime(),
                Tables\Columns\TextColumn::make('status'),
                Tables\Columns\TextColumn::make('lesson_id'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
                Tables\Actions\AttachAction::make()
                    // ->preloadRecordSelect()                 
                    // ->recordSelectSearchColumns(['id']) // Still required to enable search
                    ->label('Attach Session')
                    // ->form([
                    //     Forms\Components\Select::make('session_id')
                    //         ->label('Search Session by Lesson Title')
                    //         ->options(
                    //             \App\Models\Session::with('lesson')
                    //                 ->get()
                    //                 ->mapWithKeys(fn($session) => [
                    //                     $session->id => $session->lesson?->title . ' (' . $session->start_time . ' to ' . $session->end_time . ')'
                    //                 ])
                    //         )
                    //         ->multiple()
                    //         ->searchable()
                    //         ->required(),
                    // ])
                    // ->action(function (array $data, RelationManager $livewire) {
                    //     $livewire->getRelationship()->attach($data['session_id']);
                    // })
                    // ->modalHeading('Attach Session')
                    ->form([
                        Forms\Components\Select::make('lesson_id')
                            ->label('Select Lesson')
                            ->options(
                                \App\Models\Lesson::all()->pluck('title', 'id')
                            )
                            ->live()
                            ->searchable()
                            ->required(),
                
                            Forms\Components\Select::make('session_id')
                            ->label('Select Session')
                            ->options(function (Get $get) {
                                $lessonId = $get('lesson_id');
                        
                                // If no lesson selected, or no sessions exist, return only the "no sessions" message
                                if (! $lessonId || ! Session::where('lesson_id', $lessonId)->exists()) {
                                    return [
                                        '' => 'No sessions found for selected lesson',                        
                                    ];
                                }
                        
                                // Otherwise, show the real sessions
                                return Session::where('lesson_id', $lessonId)
                                    ->get()
                                    ->mapWithKeys(fn ($session) => [
                                        $session->id => $session->lesson?->title
                                            . ' (' . $session->start_time . ' to ' . $session->end_time . ')',
                                    ]);
                            })
                            ->required()
                            ->searchable()
                            ->loadingMessage('Loading sessions...')
                            ->placeholder('') // no default placeholder                            
                    ])
                    ->action(function (array $data, RelationManager $livewire) {
                        $livewire->getRelationship()->attach($data['session_id']);
                    })
                    ->modalHeading('Attach Session')

            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                // Tables\Actions\DeleteAction::make(),
                Tables\Actions\DetachAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    // public static function getRecordTitle(Model $record): string
    // {
    //     return $record->lesson?->title ?? 'Untitled Lesson';
    // }
}
