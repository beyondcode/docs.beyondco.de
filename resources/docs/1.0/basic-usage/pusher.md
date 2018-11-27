# Pusher Replacement

The easiest way to get started with Laravel WebSockets is by using it as a [Pusher](https://pusher.com) replacement. The integrated WebSocket and HTTP Server has complete feature parity with the Pusher WebSocket and HTTP API. In addition to that, this package also ships with an easy to use debugging dashboard to see all incoming and outgoing WebSocket requests.

## Requirements

To make use of the Laravel WebSockets package in combination with Pusher, you first need to install the official Pusher PHP SDK. 

If you are not yet familiar with the concept of Broadcasting in Laravel, please take a look at the [Laravel documentation](https://laravel.com/docs/5.7/broadcasting).

```bash
composer require pusher/pusher-php-server "~3.0"
```

Next, you should make sure to use Pusher as your broadcasting driver. This can be achieved by setting the `BROADCAST_DRIVER` environment variable in your `.env` file:

```
BROADCAST_DRIVER=pusher
```

## Pusher Configuration

When broadcasting events from your Laravel application to your WebSocket server, the default behavior is to send the event information to the official Pusher server. But since the Laravel WebSockets package comes with it's own Pusher API implementation, we need to tell Laravel to send the events to our own server.

To do this, you should add the `host` and `port` configuration key to your `config/broadcasting.php` and add it to the `pusher` section. The default port of the Laravel WebSocket server is 6001.

```php
'pusher' => [
    'driver' => 'pusher',
    'key' => env('PUSHER_APP_KEY'),
    'secret' => env('PUSHER_APP_SECRET'),
    'app_id' => env('PUSHER_APP_ID'),
    'options' => [
        'cluster' => env('PUSHER_APP_CLUSTER'),
        'encrypted' => true,
        'host' => '127.0.0.1',
        'port' => 6001,
        'scheme' => 'http'
    ],
],
```

## Configuring WebSocket Clients

The Laravel WebSocket Pusher replacement server comes with multi-tenancy support out of the box. This means that you could host it independently from your current Laravel application and serve multiple WebSocket applications with one server.

To make the move from an existing Pusher setup to this package as easy as possible, the default client simply uses your existing Pusher configuration.

You may add additional clients in your `config/websockets.php` file.

::: warning
Make sure to use the same app id, key and secret as in your broadcasting configuration section. Otherwise broadcasting events from Laravel will not work.
:::

```php
'clients' => [
    [
        'name' => env('APP_NAME'),
        'app_id' => env('PUSHER_APP_ID'),
        'app_key' => env('PUSHER_APP_KEY'),
        'app_secret' => env('PUSHER_APP_SECRET')
    ],
],
```

## Usage with Laravel Echo

The Laravel WebSockets package integrates nicely into [Laravel Echo](https://laravel.com/docs/5.7/broadcasting#receiving-broadcasts) to integrate into your frontend application and receive broadcasted events.
If you are new to Laravel Echo, be sure to take a look at the [official documentation](https://laravel.com/docs/5.7/broadcasting#receiving-broadcasts).

To make Laravel Echo work with Laravel WebSockets, you need to make some minor configuration changes when working with Laravel Echo. Add the `wsHost` and `wsPort` parameters and point them to your Laravel WebSocket server host and port.

By default, the Pusher javascript client tries to send statistic information - you should disable this using the `disableStats` option.

::: tip
When using Laravel WebSockets in combination with a custom SSL certificate, be sure to use the `encrypted` option and set it to `true`.
:::

```js
import Echo from "laravel-echo"

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'your-pusher-key',
    wsHost: window.location.hostname,
    wsPort: 6001,
    disableStats: true,
});
```

Now you can use all Laravel Echo features in combination with Laravel WebSockets, such as [Presence Channels](https://laravel.com/docs/5.7/broadcasting#presence-channels), [Notifications](https://laravel.com/docs/5.7/broadcasting#notifications) and [Client Events](https://laravel.com/docs/5.7/broadcasting#client-events).