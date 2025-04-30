<?php
// app/Scopes/OwnershipScope.php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class OwnershipScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        // **Only apply on API requests** (e.g. paths starting with 'api/')
        if (! request()->is('api/*')) {
            return;
        }

        // Get the authenticated user
        $user = Auth::user();
        if (!$user) return;

        //if (Gate::allows('owner', $model) && !Gate::allows('viewAny', $model)) {
        $ownerKey = method_exists($model, 'getOwnerKeyName') ? $model->getOwnerKeyName() : 'user_id';

        $method = request()->method();

        if ($method === 'GET') {
            if (Gate::allows('owner', $model) && (Gate::allows('viewAny', $model) ||  Gate::allows('view', $model))) {
                $builder->where($ownerKey, $user->id);
            }
        } else  if (in_array($method, ['PUT', 'PATCH'])) {
            if (Gate::allows('owner', $model) && (Gate::allows('updateAny', $model) ||  Gate::allows('update', $model))) {
                $builder->where($ownerKey, $user->id);
            }
        } else if ($method === 'DELETE') {
            if (Gate::allows('owner', $model) && (Gate::allows('deleteAny', $model) ||  Gate::allows('delete', $model))) {
                $builder->where($ownerKey, $user->id);
            }
        }
    }
}
