<?php

namespace App\Policies;

use App\Models\User;
use App\Models\TutorHoursLookup;
use Illuminate\Auth\Access\HandlesAuthorization;

class TutorHoursLookupPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('view_any_tutor::hours::lookup');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, TutorHoursLookup $tutorHoursLookup): bool
    {
        return $user->can('view_tutor::hours::lookup');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('create_tutor::hours::lookup');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TutorHoursLookup $tutorHoursLookup): bool
    {
        return $user->can('update_tutor::hours::lookup');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TutorHoursLookup $tutorHoursLookup): bool
    {
        return $user->can('delete_tutor::hours::lookup');
    }

    /**
     * Determine whether the user can bulk delete.
     */
    public function deleteAny(User $user): bool
    {
        return $user->can('delete_any_tutor::hours::lookup');
    }

    /**
     * Determine whether the user can permanently delete.
     */
    public function forceDelete(User $user, TutorHoursLookup $tutorHoursLookup): bool
    {
        return $user->can('force_delete_tutor::hours::lookup');
    }

    /**
     * Determine whether the user can permanently bulk delete.
     */
    public function forceDeleteAny(User $user): bool
    {
        return $user->can('force_delete_any_tutor::hours::lookup');
    }

    /**
     * Determine whether the user can restore.
     */
    public function restore(User $user, TutorHoursLookup $tutorHoursLookup): bool
    {
        return $user->can('restore_tutor::hours::lookup');
    }

    /**
     * Determine whether the user can bulk restore.
     */
    public function restoreAny(User $user): bool
    {
        return $user->can('restore_any_tutor::hours::lookup');
    }

    /**
     * Determine whether the user can replicate.
     */
    public function replicate(User $user, TutorHoursLookup $tutorHoursLookup): bool
    {
        return $user->can('replicate_tutor::hours::lookup');
    }

    /**
     * Determine whether the user can reorder.
     */
    public function reorder(User $user): bool
    {
        return $user->can('reorder_tutor::hours::lookup');
    }
}
