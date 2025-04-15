<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Auth\Access\AuthorizationException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    public function render($request, Throwable $exception)
    {
         if ($request->is('api/*')) {
            
            // Catch Laravel's AuthorizationException
            if ($exception instanceof AuthorizationException) {
                return response()->json([
                    'message' => 'You do not have permission to perform this action (Laravel authorization).',
                ], 403);
            }


            // Catch Rupadana / Sanctum Unauthorized Exception
            if ($exception instanceof UnauthorizedHttpException) {
                
                // Try to extract resource from the route or URL
                $route = $request->route();
                $path = $request->path(); // like "api/languages", "api/posts"

                // Optionally extract method (read/write etc)
                $method = $request->method(); // GET, POST, PUT, DELETE

                $action = match ($method) {
                    'GET' => 'read',
                    'POST', 'PUT', 'PATCH', 'DELETE' => 'write',
                    default => 'access'
                };

                return response()->json([
                    'message' => "You do not have the {$action} permissions for {$path}.",
                ], 403);
            }
         }
       
        return parent::render($request, $exception);
    }
}
