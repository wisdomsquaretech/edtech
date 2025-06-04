<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use App\Models\Lesson;
use App\Models\Curriculum;
use App\Models\Language;
use App\Models\School;
use App\Models\TutorAvailability;
use App\Models\TutorAvailabilitySlot;
use App\Models\Notification;
use App\Models\Session;
use App\Models\Booking;
use App\Models\SessionFeedback;
use App\Models\SessionAttendance;
use App\Models\SessionStatus;
use App\Models\TutorHoursLookup;
use App\Models\TutorStudentSessionLookup;
use Illuminate\Support\Facades\DB;

class OwnershipScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {                      
        // Only apply this scope to API requests (e.g., paths starting with 'api/')
        if (!request()->is('api/*')) {
            return;
        }
        
        // Get the authenticated user
        $user = Auth::user();
        if (!$user || !Gate::allows('owner', $model)) {
            return;
        }

        // Get the HTTP request method (GET, PUT, PATCH, DELETE)
        $method = request()->method();

        // Check for specific permissions based on the HTTP method
        $allowed = match ($method) {
            'GET'           => Gate::allows('viewAny', $model) || Gate::allows('view', $model),
            'PUT', 'PATCH'  => Gate::allows('updateAny', $model) || Gate::allows('update', $model),
            'DELETE'        => Gate::allows('deleteAny', $model) || Gate::allows('delete', $model),
            default         => false,
        };

        // If the user doesn't have permission for the requested action, don't apply the scope
        if (! $allowed) {
            return;
        }

        // Apply model-specific ownership constraint
        $this->applyOwnershipConstraint($builder, $user, $model);
    }

    /**
     * Apply the ownership constraint based on the model.
     *
     * @param Builder $builder
     * @param $user
     * @param Model $model
     */
    protected function applyOwnershipConstraint(Builder $builder, $user, Model $model)
    {        
        // Define ownership constraints for specific models

        $role = $user->getRoleNames()->first();

        switch (get_class($model)) {
            case Lesson::class:
                $builder->whereHas('curriculum', function (Builder $query) use ($user) {
                    $query->where('creator_id', $user->id);
                });
                break;

            case Curriculum::class:
                $builder->where('creator_id', $user->id);
                break;

            case Language::class:
                $builder->where('user_id', $user->id);
                break;

            case School::class:
                $builder->where('coordinator_id', $user->id);
                break;

            case TutorAvailability::class:
                if($role === 'tutor') {
                    $builder->where('tutor_id', $user->id);
                }
                break;

            case TutorAvailabilitySlot::class:
                if($role === 'tutor') {                
                    $builder->where('tutor_id', $user->id);
                }
                break;

            case Notification::class:
                $builder->where('creator_id', $user->id);
                break;

            case Session::class:
                
                $builder->where(function ($query) use ($user, $role) {
                    
                    if($role === 'coordinator') {
                        $query->whereHas('school', function (Builder $q) use ($user) {
                            $q->where('coordinator_id', $user->id);
                        });
                    }
                    // Lesson / curriculum uploaded by admin/ super admin
                    // $query->orWhereHas('lesson.curriculum', function (Builder $q) use ($user) {
                    //     $q->where('creator_id', $user->id);
                    // });

                    if($role === 'tutor') {
                        $query->orWhere('tutor_id', $user->id);
                    }
                    if($role === 'student') {
                        $query->orWhere('student_id', $user->id);
                    }
                });
                break;

            case Booking::class:
                // Booking model has 4 foreign keys: student_id, slot_id, session_id, creator_id            
                $builder->where(function ($query) use ($user, $role) {
                    
                    if($role === 'tutor') {
                        $query->whereHas('slot', function (Builder $q) use ($user) {
                            $q->where('tutor_id', $user->id);
                        });
                    }
                    if($role === 'student') {
                        $query->orWhere('student_id', $user->id);
                        //$query->orWhere('creator_id', $user->id);
                    }                   
                });
                break;

            case SessionFeedback::class:                                
            case SessionAttendance::class:
            case SessionStatus::class:
                // These models have 2 foreign keys: session_id, user_id
                $builder->where('user_id', $user->id);
                break;
               

            case TutorHoursLookup::class:
                // TutorHoursLookup has 2 foreign keys: session_id, tutor_id
                if($role === 'tutor') {
                    $builder->where('tutor_id', $user->id);
                }
                break;

            case TutorStudentSessionLookup::class:
                // TutorStudentSessionLookup has 2 foreign keys: session_id, user_id               
                $builder->where('user_id', $user->id);
                break;
        }
    }
}
