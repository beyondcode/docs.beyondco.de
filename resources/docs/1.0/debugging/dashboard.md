# Debug Dashboard

In addition to logging the events to the console, you can also use a realtime Dashboard that shows you all incoming connections, events and disconnects the moment they happen on your WebSocket server.

![Debug Dashboard](/img/dashboard.jpg)

## Accessing the Dashboard

The dashboard is only available, once you register the required routes in your `web.php` file.
You can do this using `Route::webSocketDashboard();`

This will register the dashboard routes under the `/websockets` prefix by default.

If you want to change the prefix to something else, you can just pass it to the route method:

```php
Route::webSocketDashboard('my-dashboard');
```

To access the debug dashboard, you can visit the dashboard URL of your Laravel project in the browser. 
Since your WebSocket server has support for multiple apps, you can select which app you want to connect to and inspect.

By pressing the "Connect" button, you can establish the WebSocket connection and see all events taking place on your WebSocket server from there on in real-time.

## Protecting the Dashboard

By default, access to the WebSocket dashboard is only allowed while your application environment is set to `local`.

However, you can change this behavior by overriding the Laravel Gate being used. A good place for this is the `AuthServiceProvider` that ships with Laravel.

```php
public function boot()
{
    $this->registerPolicies();

    Gate::define('viewWebSocketsDashboard', function ($user = null) {
        return in_array([
        	// 
        ], $user->email);
    });
}
```

## Event Creator

The dashboard also comes with an easy-to-use event creator, that lets you manually send events to your channels.

Simply enter the channel, the event name and provide a valid JSON payload to send it to all connected clients in the given channel.
