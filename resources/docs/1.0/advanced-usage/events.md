# Consuming events

The WebSockest server will fire the following events that your handlers can listen for:

### ApiMessageSent

This event will be fired after an event is being sent over the API - for example when Laravel broadcasts the event.

This event has four public properties:

- `appId` - The WebSocket client app id for this message
- `channeldId` - The channel for this message
- `name` - The event name
- `data` - The event payload

### ChannelOccupied

This event will be fired after a previously empty channel gets a new subscriber.

This event has two public properties:

- `connection` - The WebSocket connection (`Ratchet\ConnectionInterface`) that joins the channel
- `channeldId` - The channel that was occupied

### ChannelVacated

This event will be fired after a previously occupied channel becomes empty.

This event has two public properties:

- `connection` - The WebSocket connection (`Ratchet\ConnectionInterface`) that leaves the channel
- `channeldId` - The channel that was occupied

### ClientMessageSent

This event will be fired when a client message was sent.

This event has two public properties:

- `connection` - The WebSocket connection (`Ratchet\ConnectionInterface`) that sends the message
- `payload` - The payload that is being sent

### ConnectionEstablished

This event will be fired when a client successfuly connects to the server.

This event has one public property:

- `connection` - The WebSocket connection (`Ratchet\ConnectionInterface`)

### ExceptionThrown

This event will be fired when an exception was thrown while the server is running.

This event has two public properties:

- `connection` - The WebSocket connection (`Ratchet\ConnectionInterface`)
- `exception`: - The exception that was thrown (`Exception`)


### SubscribedToChannel

This event will be fired when a client successfuly subscribes to a channel.

This event has two public properties:

- `connection` - The WebSocket connection (`Ratchet\ConnectionInterface`) that subscribes to a channel
- `channelId` - The channel that is being subscribed to