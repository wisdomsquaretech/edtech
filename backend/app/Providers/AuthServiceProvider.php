<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Curriculum;
use App\Models\Language;
use App\Models\Notification;
use App\Models\School;
use App\Models\TutorAvailability;
use App\Models\TutorAvailabilitySlot;
use App\Policies\CurriculumPolicy;
use App\Policies\LanguagePolicy;
use App\Policies\NotificationPolicy;
use App\Policies\SchoolPolicy;
use App\Policies\TutorAvailabilityPolicy;
use App\Policies\TutorAvailabilitySlotPolicy;
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
        Notification::class => NotificationPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
