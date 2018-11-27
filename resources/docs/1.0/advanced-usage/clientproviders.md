# Custom Client Providers

With the multi-tenancy support of Laravel WebSockets, the default way of storing and retrieving the clients is by using the `websockets.php` config file.

Depending on your setup, you might have your client stored elsewhere and having to keep the configuration in sync with your client storage can be tedious. To simplify this, you can create your own `ClientProvider` class that will take care of retrieving the WebSocket credentials for a specific WebSocket application.

In order to create your custom `ClientProvider`, create a class that implements the `BeyondCode\LaravelWebSockets\ClientProviders\ClientProvider` interface.

This is what it looks like:

```php
interface ClientProvider
{
    /**  @return array[BeyondCode\LaravelWebSockets\ClientProviders\Client] */
    public function all(): array;

    public function findByAppId(int $appId): ?Client;

    public function findByAppKey(string $appKey): ?Client;
}
```

Once you have implemented your own ClientProvider, you need to set it in the `websockets.php` configuration file:

```php	
/**
 * This class is responsible for finding the clients. The default provider
 * will use the clients defined in this config file.
 *
 * You can create a custom provider by implementing the
 * `ClientProvier` interface.
 */
'client_provider' => MyCustomClientProvider::class,
```