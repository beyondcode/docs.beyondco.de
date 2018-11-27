# Starting the WebSocket Server

Once you have configured your WebSocket clients and Pusher settings, you can start the Laravel WebSocket server by issuing the artisan command:

```bash
php artisan websocket:start
```

## Using a different port

The default port of the Laravel WebSocket server is `6001`. You may pass a different port to the command using the `--port` option.

```bash
php artisan websocket:start --port=3030
```

This will start listening on port `3030`.

## Restricting the listening host

By default, the Laravel WebSocket server will listen on `0.0.0.0` and will allow incoming connections from all networks. If you want to restrict this, you can start the server with a `--host` option, followed by an IP.

For example, by using `127.0.0.1`, you will only allow WebSocket connections from localhost.

```bash
php artisan websocket:start --host=120.0.0.1
```

## Keeping the socket server running with supervisord

The `websocket:start` daemon needs to always be running in order to accept connections. This is a prime use case for `supervisor`, a task runner on Linux.

First, make sure `supervisor` is installed.

```bash
# On Debian / Ubuntu
apt install supervisor

# On Red Hat / CentOS
yum install supervisor
systemctl enable supervisor
```

Once installed, add a new process that `supervisor` needs to keep running. You place your configurations in the `/etc/supervisor/conf.d` (Debian/Ubuntu) or `/etc/supervisord.d` (Red Hat/CentOS) directory.

Within that directory, create a new file called `websockets.conf`.

```bash
[program:websockets]
command=/usr/bin/php /home/laravel-echo/laravel-websockets/artisan websocket:start
numprocs=1
autostart=true
autorestart=true
user=laravel-echo
```

Once created, instruct `supervisor` to reload its configuration files (without impacting the already running `supervisor` jobs).

```bash
supervisorctl update
supervisorctl start websockets
```

Your echo server should now be running (you can verify this with `supervisorctl status`). If it were to crash, `supervisor` will automatically restart it.
