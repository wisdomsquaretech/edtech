<?php

namespace App\Filament\Resources\SessionResource\Api\Handlers;

use App\Filament\Resources\LanguageResource\Api\Transformers\LanguageTransformer;
use App\Models\Session;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Facades\Gate;
use Spatie\QueryBuilder\QueryBuilder;

class SessionsByTutorHandler
{
    // Implement the route() method required by Rupadana API Service
    public static function route()
    {
        return '/sessions/tutor/{tutor_id}'; // Custom route for fetching sessions by tutor
    }

    public function __invoke(Request $request, $tutor_id)
    {
        // Check if the user has permission to view sessions
        $user = $request->user();
        if (!$user->can('viewAny', Session::class)) {
            return response()->json(['message' => 'You do not have the read permissions for api/sessions/tutor'], 403);
        }

        // Fetch and return sessions for the given tutor_id
        $query = Session::query()->where('tutor_id', $tutor_id);

        // Apply query builder filters, sorts, and pagination
        $query = QueryBuilder::for($query)
            ->paginate(request()->query('per_page', 15)) // Default to 15 per page
            ->appends(request()->query()); // Make sure pagination links are preserved

        // Optionally, you can transform the response with a custom transformer
        return LanguageTransformer::collection($query);
    }
}
