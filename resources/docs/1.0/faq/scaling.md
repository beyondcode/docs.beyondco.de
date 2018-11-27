# ... but does it scale?

Of course, this is not a question with an easy answer as your mileage may vary. But with the appropriate server-side configuration your WebSocket server can easily hold a **lot** of concurrent connections.

This is an example benchmark that was done on the smallest Digital Ocean droplet, that also had a couple of other Laravel projects running. On this specific server, the maximum number of **concurrent** connections ended up being ~15,000.

![Benchmark](/img/simultaneous_users.png)

Make sure to take a look at the [Deployment Tips](/1.0/faq/deploying.html) to find out how to improve your specific setup.