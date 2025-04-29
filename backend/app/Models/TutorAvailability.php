<?php

namespace App\Models;

use App\Scopes\OwnershipScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class TutorAvailability extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tutor_id',
        'day_of_week',
        'start_time',
        'end_time',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'tutor_id' => 'integer',
    ];

    public function tutor(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function getOwnerKeyName(): string
    {
        return 'tutor_id';
    }

    protected static function booted()
    {
        static::addGlobalScope(new OwnershipScope);
    }
}
