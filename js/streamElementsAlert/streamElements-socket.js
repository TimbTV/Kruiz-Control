/**
 * Connect to the StreamElements websocket and setup the event handlers
 * @param {string} token StreamElements JWT token
 * @param {method} onEvent method to call when events are received
 */
function connectStreamElementsWebsocket(token, onEvent) {
  const socket = io('https://realtime.streamelements.com', {
      transports: ['websocket']
  });
  // Socket connected
  socket.on('connect', function() {
    console.log('Successfully connected to the websocket');
    socket.emit('authenticate', {
        method: 'jwt',
        token: token
    });
  });

  // Socket got disconnected
  socket.on('disconnect', function() {
    console.log('Disconnected from websocket');
  });

  // Socket is authenticated
  socket.on('authenticated', function(data) {
    const channelId = data.channelId;
    console.log(`Successfully connected to channel ${channelId}`);
  });

  socket.on('event:test', onEvent);
  socket.on('event', onEvent);
}