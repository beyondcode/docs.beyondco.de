# SSL Support

Since most of the web's traffic is going through HTTPS it's also crucial to secure your WebSocket server. Luckily, adding SSL support to this package is really simple.

## Configuration

The SSL configuration takes place in your `config/websockets.php` file.
The default configuration has a SSL section that looks like this:

```php
'ssl' => [
    /*
     * Path to local certificate file on filesystem. It must be a PEM encoded file which
     * contains your certificate and private key. It can optionally contain the
     * certificate chain of issuers. The private key also may be contained
     * in a separate file specified by local_pk.
     */
    'local_cert' => null,

    /*
     * Path to local private key file on filesystem in case of separate files for
     * certificate (local_cert) and private key.
     */
    'local_pk' => null,

    /*
     * Passphrase with which your local_cert file was encoded.
     */
    'passphrase' => null
],
```

But this is only a subset of all the available configuration options. 
This packages makes use of the official PHP [SSL context options](http://php.net/manual/en/context.ssl.php). 

So if you find yourself in the need of adding additional configuration settings, take a look at the PHP documentation and simply add the configuration parameters that you need.

After setting up your SSL settings, you can simply (re)start your WebSocket server using:

```bash
php artisan websocket:start
```

## Client configuration

When your SSL settings are in place and working, you still need to tell Laravel Echo that it should make use of it.
You can do this by specifying the `encrypted` property in your javascript file, like this:

```js
import Echo from "laravel-echo"

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'your-pusher-key',
    wsHost: window.location.hostname,
    wsPort: 6001,
    disableStats: true,
	encrypted: true
});
```

## Server configuration

When broadcasting events from your Laravel application to the WebSocket server, you also need to tell Laravel to make use of HTTPS instead of HTTP. You can do this by setting the `scheme` option in your `config/broadcasting.php` file to `https`:

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
        'scheme' => 'https'
    ],
],
```
