<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class TutorAvailabilitySlot extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tutor_id',
        'slot_date',
        'start_time',
        'end_time',
        'capacity',
        'is_booked',
        'is_deleted',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'tutor_id' => 'integer',
        'slot_date' => 'date',
        'is_booked' => 'boolean',
        'is_deleted' => 'timestamp',
    ];

    public function tutor(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
