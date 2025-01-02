"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on('connection', (socket) => {
    socket.on('error', console.error);
    allSockets.push(socket);
    console.log("User Connected", userCount);
    userCount++;
    socket.on('message', (msg) => {
        console.log(msg.toString());
        var temp = msg.toString();
        allSockets.map((sckt) => sckt.send(temp.toString()));
    });
});
