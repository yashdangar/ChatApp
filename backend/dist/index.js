"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const socketRoomMap = new Map();
wss.on("connection", (socket) => {
    socket.on("error", console.error);
    console.log("User Connected");
    socket.on("message", (msg) => {
        // console.log(msg.toString());
        const parsedMsg = JSON.parse(msg);
        if (parsedMsg.type === "join") {
            socketRoomMap.set(socket, parsedMsg.payload.roomId);
        }
        if (parsedMsg.type === "chat") {
            const currentRoom = socketRoomMap.get(socket);
            if (!currentRoom)
                return;
            for (const [client, room] of socketRoomMap.entries()) {
                if (room === currentRoom) {
                    client.send(parsedMsg.payload.name + parsedMsg.payload.message);
                }
            }
        }
    });
    socket.on("close", () => {
        console.log("User disconnected");
        socketRoomMap.delete(socket);
    });
});
