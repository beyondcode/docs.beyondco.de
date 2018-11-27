<?php

namespace App\Providers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Nubs\RandomNameGenerator\Alliteration;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Route::post('/broadcasting/auth', function(Request $request) {
            $request->setUserResolver(function() {
                return new User([
                    'id' => random_int(1, 1000000)
                ]);
            });
            return Broadcast::validAuthenticationResponse($request, [
                'username' => (new Alliteration())->getName()
            ]);
        });

        require base_path('routes/channels.php');
    }
}
