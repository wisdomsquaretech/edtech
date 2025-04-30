<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SessionFeedbackResource\Pages;
use App\Filament\Resources\SessionFeedbackResource\RelationManagers;
use App\Models\SessionFeedback;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SessionFeedbackResource extends Resource
{
    protected static ?string $model = SessionFeedback::class;
   
    public static function getNavigationGroup(): ?string
    {
        return 'Sessions';
    }

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-chat-bubble-left-ellipsis';
    }

    public static function getNavigationLabel(): string
    {
        return 'Feedbacks';
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
                Forms\Components\TextInput::make('rating')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->integer(),
                Forms\Components\Textarea::make('comments')
                    ->columnSpanFull(),
                Forms\Components\DateTimePicker::make('submitted_at')
                    ->required(),
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
                Tables\Columns\TextColumn::make('rating')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('submitted_at')
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
            'index' => Pages\ListSessionFeedback::route('/'),
            'create' => Pages\CreateSessionFeedback::route('/create'),
            'edit' => Pages\EditSessionFeedback::route('/{record}/edit'),
        ];
    }
}
