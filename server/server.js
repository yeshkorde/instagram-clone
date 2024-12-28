// /server/server.js
const express = require('express');
const next = require('next');
const socketHandler = require("./socket.io")
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Integrate socket.io
  const httpServer = require('http').createServer(server);
  socketHandler(httpServer);

  // Handle all Next.js pages
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
