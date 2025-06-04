<?php

namespace App\Models;

use App\Scopes\OwnershipScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Session extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'school_id',
        'tutor_id',
        'student_id',
        'lesson_id',
        'start_time',
        'end_time',
        'meeting_link',
        'notes',
        'platform',
        'checklist_done',
        'status',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'school_id' => 'integer',
        'tutor_id' => 'integer',
        'student_id' => 'integer',
        'lesson_id' => 'integer',
        'start_time' => 'datetime:d-m-Y H:i:s',
        'end_time' => 'datetime:d-m-Y H:i:s',
        'checklist_done' => 'boolean',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public function tutor(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    public function sessionAttendances(): HasMany
    {
        return $this->hasMany(SessionAttendance::class);
    }

    public function sessionStatuses(): HasMany
    {
        return $this->hasMany(SessionStatus::class);
    }

    public function tutorHoursLookups(): HasMany
    {
        return $this->hasMany(TutorHoursLookup::class);
    }

    public function tutorStudentSessionLookups(): HasMany
    {
        return $this->hasMany(TutorStudentSessionLookup::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function sessionFeedbacks(): HasMany
    {
        return $this->hasMany(SessionFeedback::class);
    }

    public function delete()
    {
        $this->sessionAttendances->each->delete();
        $this->sessionStatuses->each->delete();
        $this->tutorHoursLookups->each->delete();
        $this->tutorStudentSessionLookups->each->delete();
        $this->bookings->each->delete();
        $this->sessionFeedbacks->each->delete();

        parent::delete();
    }
    protected static function booted()
    {                    
        static::addGlobalScope(new OwnershipScope);
    }
}
