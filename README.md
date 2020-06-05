This is a tool for custom twitch alerts.

It is event-based, and has two components.

1. A client, which listens on websockets and shows alerts when it receives messages on those sockets.
2. A server, which sits in-between the client and the twitch API, proxying webhook events to websocket events.

The client is on :3000, and the server is on :8080.