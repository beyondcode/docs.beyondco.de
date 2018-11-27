# Deploying

When your application is ready to get deployed, here are some tips to improve your WebSocket Server.

### Open Connection Limit
On Unix systems every user that connects to your WebSocket server is represented as a file somewhere on the system.
As a security measurement of every Unix based OS, the number of "file descriptors" an application may have open at a time is limited - most of the time to a default value of 1024 - which would result in a maximum number of 1024 concurrent users on your WebSocket server.

In addition to the OS restrictions, this package makes use of an event loop called "stream_select", which has a hard limit of 1024.

#### Increasing the maximum number of file descriptors

The operation system limit of open "file descriptors" can be increased using the `ulimit` command. The `-n` option modifies the amount of open file descriptors.

::: tip
The `ulimit` command only **temporarily** increases the maximum number of open file descriptors. To permanently modify this value, you can edit it in your operation system `limits.conf` file.
:::

```bash
ulimit -n 10000
```

#### Changing the event loop

To make use of a different event loop, that does not have a hard limit of 1024 concurrent connections, you can either install the `ev` or `event` PECL extension using:

```bash
sudo pecl install ev
# or
sudo pecl install event
```