<?php

namespace App\Models;

use App\Scopes\OwnershipScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'student_id',
        'slot_id',
        'session_id',
        'status',
        'creator_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'student_id' => 'integer',
        'slot_id' => 'integer',
        'session_id' => 'integer',
        'creator_id' => 'integer',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function slot(): BelongsTo
    {
        return $this->belongsTo(TutorAvailabilitySlot::class, 'slot_id');
    }

    public function session(): BelongsTo
    {
        return $this->belongsTo(Session::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class,'creator_id');
    }
    protected static function booted()
    {
        static::addGlobalScope(new OwnershipScope);                  

        // on create and delete, update is_booked (TutorAvailabilitySlot) to true/false based on booking created/ deleted
        static::created(function ($booking) {
            $booking->updateSlotBookingStatus();
        });

        static::deleted(function ($booking) {
            $booking->updateSlotBookingStatus();
        });
    }

    public function updateSlotBookingStatus(): void
    {
        $slot = $this->slot;

        if (!$slot) return;

        $bookingCount = $slot->bookings()->count();

        $slot->is_booked = $bookingCount >= $slot->capacity;
        $slot->save();
    }
}
