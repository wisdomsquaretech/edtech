<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Booking;
use App\Models\Curriculum;
use App\Models\Language;
use App\Models\Lesson;
use App\Models\Notification;
use App\Models\School;
use App\Models\Session;
use App\Models\SessionAttendance;
use App\Models\SessionFeedback;
use App\Models\SessionStatus;
use App\Models\TutorAvailability;
use App\Models\TutorAvailabilitySlot;
use App\Models\TutorHoursLookup;
use App\Models\TutorStudentSessionLookup;
use App\Policies\BookingPolicy;
use App\Policies\CurriculumPolicy;
use App\Policies\LanguagePolicy;
use App\Policies\LessonPolicy;
use App\Policies\NotificationPolicy;
use App\Policies\SchoolPolicy;
use App\Policies\SessionAttendancePolicy;
use App\Policies\SessionFeedbackPolicy;
use App\Policies\SessionPolicy;
use App\Policies\SessionStatusPolicy;
use App\Policies\TutorAvailabilityPolicy;
use App\Policies\TutorAvailabilitySlotPolicy;
use App\Policies\TutorHoursLookupPolicy;
use App\Policies\TutorStudentSessionLookupPolicy;
use Blueprint\Models\Statements\SessionStatement;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Language::class => LanguagePolicy::class,
        School::class => SchoolPolicy::class,
        Curriculum::class => CurriculumPolicy::class,
        TutorAvailability::class => TutorAvailabilityPolicy::class,
        TutorAvailabilitySlot::class => TutorAvailabilitySlotPolicy::class,
        Notification::class => NotificationPolicy::class,

        Lesson::class => LessonPolicy::class,
        Session::class => SessionPolicy::class,
        SessionAttendance::class => SessionAttendancePolicy::class,
        SessionStatus::class => SessionStatusPolicy::class,
        SessionFeedback::class => SessionFeedbackPolicy::class,
        Booking::class => BookingPolicy::class,
        TutorHoursLookup::class => TutorHoursLookupPolicy::class,
        TutorStudentSessionLookup::class => TutorStudentSessionLookupPolicy::class

    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
