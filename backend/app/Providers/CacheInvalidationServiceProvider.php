<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;

class CacheInvalidationServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
         // Only act if the request is coming from an API route
        if (!request()->is('api/*')) {
            return;
        }

         // Only process if the request method is POST, PUT, or DELETE
        if (!in_array(request()->method(), ['POST', 'PUT', 'DELETE'])) {
            return;
        }
        // Listen for saved and deleted events
        Event::listen('eloquent.saved: *', function (string $eventName, array $data) {
            $this->handleModelEvent($data[0]);
        });

        Event::listen('eloquent.deleted: *', function (string $eventName, array $data) {
            $this->handleModelEvent($data[0]);
        });
    }

    protected function handleModelEvent($model): void
    {
       
        // Ensure that the model is an instance of Eloquent Model
        if (! $model instanceof Model) {
            return;
        }

        // Extract resource name from the model class
        $class = get_class($model);
     
        if($class === PersonalAccessToken::class) {
            return;
        }

        $resourceKey = strtolower(Str::plural(class_basename(class: $model)));
        $config = config("cache.prefix");
        $pattern = "{$config}:api:api/{$resourceKey}:*"; // Ensure this matches the cache key structure used in the middleware                

        // Get Redis instance and retrieve keys matching the pattern
        $client = Cache::getRedis()->connection('cache')->client();
        $prefix = config("database.redis.options.prefix");        // e.g. "laravel_database_"  

        $keys = $client->keys($pattern);
        // // If matching keys are found, forget them
        if (!empty($keys)) {
            foreach ($keys as $key) {
                $logicalKey = substr($key, strlen($prefix));
                $client->del($logicalKey);                
            }
        }        
    }
}

