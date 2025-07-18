<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Filament\Panel;
class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'email_verified_at',
        'password',
        'timezone',
        'bio',
    ];

    protected $guard_name = 'web';
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token',
        'password',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'timestamp',
        'password' => 'hashed',
    ];

    public function curricula(): BelongsToMany
    {
        return $this->belongsToMany(Curriculum::class);
    }

    public function schools(): BelongsToMany
    {
        return $this->belongsToMany(School::class);
    }

    public function sessions(): BelongsToMany
    {
        return $this->belongsToMany(Session::class);
    }

    public function languages(): HasMany
    {
        return $this->hasMany(Language::class);
    }

    public function tutorAvailabilities(): HasMany
    {
        return $this->hasMany(TutorAvailability::class,'tutor_id');
    }

    public function tutorAvailabilitySlots(): HasMany
    {
        return $this->hasMany(TutorAvailabilitySlot::class,'tutor_id');
    }

    public function sessionFeedbacks(): HasMany
    {
        return $this->hasMany(SessionFeedback::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class,'creator_id');
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
        return $this->hasMany(TutorHoursLookup::class,'tutor_id');
    }

    public function tutorStudentSessionLookups(): HasMany
    {
        return $this->hasMany(TutorStudentSessionLookup::class,'user_id');
    }

    public function canAccessPanel(Panel $panel): bool
    {                
        return $this->hasAnyRole(['admin', 'super_admin']);
    }
 }
