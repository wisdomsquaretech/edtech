<?php

namespace App\Models;

use App\Scopes\OwnershipScope;
use Awcodes\Curator\Models\Media;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'curriculum_id',
        'title',
        'level',
        'description',        
        'language_code',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'curriculum_id' => 'integer',
    ];

    public function curriculum(): BelongsTo
    {
        return $this->belongsTo(Curriculum::class);
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class);
    }

    public function delete()
    {
        // Delete all sessions tied to the lesson
        $this->sessions->each->delete();

        parent::delete();
    }
    protected static function booted()
    {
        static::addGlobalScope(new OwnershipScope);        
    }
    public function lessonFiles(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'lesson_media')
            ->withPivot('order')
            ->orderBy('lesson_media.order');
    }
}
