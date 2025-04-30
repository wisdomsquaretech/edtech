<?php

namespace App\Filament\Resources\TutorAvailabilityResource\Api\Handlers;

use Illuminate\Http\Request;
use Rupadana\ApiService\Http\Handlers;
use App\Filament\Resources\TutorAvailabilityResource;
use Spatie\QueryBuilder\QueryBuilder;
use App\Filament\Resources\TutorAvailabilityResource\Api\Transformers\TutorAvailabilityTransformer;
use App\Models\TutorAvailability;

class TutorAvailabilitiesByTutorHandler
{
    //Implement the route() method required by Rupadana API Service
    public static function route()
    {
        return '/tutor-availabilities/tutor/{tutor_id}';
    }

    public function __invoke(Request $request, $tutor_id)
    {
        // Check if the user has permission to view Tutor Availability
        $user = $request->user();
        if (!$user->can('viewAny', TutorAvailability::class)) {
            return response()->json(['message' => 'You do not have the read permissions for api/tutor-availabilities/tutor'], 403);
        }

        // Fetch and return sessions for the given tutor_id
        $query = TutorAvailability::query()->where('tutor_id', $tutor_id);

        $query = QueryBuilder::for($query)
            ->paginate(request()->query('per_page', 15))
            ->appends(request()->query());

        // Optionally, you can transform the response with a custom transformer
        return TutorAvailabilityTransformer::collection($query);
    }
}
