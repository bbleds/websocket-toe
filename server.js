"use strict";

// -------- Dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
// Init naitive node server
const server = require("http").createServer(app);
// pass server into socketio
const io = require("socket.io")(server);

// -------- Middleware
app.use(express.static("public"));



app.get("/", (request, response) => {
    response.sendFile("index.html");
});

server.listen(PORT, () => {
  console.log("We are listening ");
});

// when websocket connected
io.on('connection', (socket) => {
  console.log('socket connected');
    // when player moves
    socket.on('playerMoved', (msg) => {
      socket.broadcast.emit('receivedPlayerMove', msg);
      console.log("one move");
    });
});
