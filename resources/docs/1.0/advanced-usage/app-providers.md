# Custom App Providers

With the multi-tenancy support of Laravel WebSockets, the default way of storing and retrieving the apps is by using the `websockets.php` config file.

Depending on your setup, you might have your app configuration stored elsewhere and having to keep the configuration in sync with your app storage can be tedious. To simplify this, you can create your own `AppProvider` class that will take care of retrieving the WebSocket credentials for a specific WebSocket application.

::: warning
Make sure that you do **not** perform any IO blocking tasks in your `AppProvider`, as they will interfere with the asynchronous WebSocket execution.
:::

In order to create your custom `AppProvider`, create a class that implements the `BeyondCode\LaravelWebSockets\AppProviders\AppProvider` interface.

This is what it looks like:

```php
interface AppProvider
{
    /**  @return array[BeyondCode\LaravelWebSockets\AppProviders\App] */
    public function all(): array;

    public function findByAppId(int $appId): ?App;

    public function findByAppKey(string $appKey): ?App;
}
```

Once you have implemented your own AppProvider, you need to set it in the `websockets.php` configuration file:

```php	
/**
 * This class is responsible for finding the apps. The default provider
 * will use the apps defined in this config file.
 *
 * You can create a custom provider by implementing the
 * `AppProvider` interface.
 */
'app_provider' => MyCustomAppProvider::class,
```
