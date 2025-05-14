<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cache;

class ApiCacheMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (
            $request->method() !== 'GET' ||
            ! preg_match('#^api/[^/]+$#', $request->path())
        ) {
            return $next($request);
        }

        $key = 'api:' . $request->path() . ':' . md5(json_encode($request->query()));

        // Cache hit?
        if (Cache::has($key)) {            
            return response()->json(
                Cache::get($key),
                200,
                ['X-Cache' => 'HIT']
            );
        }

        // Cache miss — let the request proceed
        $response = $next($request);

        // Only cache successful JSON responses
        $contentType = $response->headers->get('content-type', '');
        if (
            $response->getStatusCode() === 200 &&
            str_contains($contentType, 'application/json')
        ) {
            $payload = json_decode($response->getContent(), true);
            Cache::put($key, $payload, now()->addMinutes(120));            
        }

        return $response->header('X-Cache', 'MISS');
    }
}
