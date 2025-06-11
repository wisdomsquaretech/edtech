<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LessonResource\Pages;
use App\Filament\Resources\LessonResource\RelationManagers;
use App\Models\Lesson;
use App\PathGenerators\CustomPathGenerator;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Awcodes\Curator\Components\Forms\CuratorPicker;
use Awcodes\Curator\PathGenerators\DatePathGenerator;
class LessonResource extends Resource
{
    protected static ?string $model = Lesson::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('curriculum_id')
                    ->relationship('curriculum', 'title')
                    ->required(),
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                Select::make('level')
                    ->label('Level')
                    ->options([
                        'beginner' => 'Beginner',
                        'intermediate' => 'Intermediate',
                        'advanced' => 'Advanced',
                    ])
                    ->required(),
                Forms\Components\Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),                    
                CuratorPicker::make('lesson_files')
                    ->label('Lesson Files (PDF/PPT)')
                    ->multiple()
                    ->maxItems(3)
                    ->relationship('lessonFiles', 'id')
                    ->acceptedFileTypes([
                        'application/pdf',
                        'application/vnd.ms-powerpoint',
                        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    ])
                    ->orderColumn('order')
                    ->typeColumn('type')
                    ->typeValue('document')
                    ->required()
                    ->size('sm')
                    ->pathGenerator(CustomPathGenerator::class)
                    ->listDisplay(true),
     
                Forms\Components\TextInput::make('language_code')
                    ->required()
                    ->maxLength(255),
            ]);        
    }

    protected function getTableQuery(): Builder
    {
        return parent::getTableQuery()->with(['lesson_files']);
    }

    // public function register()
    // {
    //     CuratorPicker::make('image')
    //         ->pathGenerator(DatePathGenerator::class);
    // }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('curriculum.title')
                    ->numeric()
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('level'),                
                Tables\Columns\TextColumn::make('language_code')
                    ->searchable(),
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
            'index' => Pages\ListLessons::route('/'),
            'create' => Pages\CreateLesson::route('/create'),
            'edit' => Pages\EditLesson::route('/{record}/edit'),
        ];
    }
}
