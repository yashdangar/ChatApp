import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const socketDataMap = new Map<WebSocket, { room: string; name: string }>();

wss.on("connection", (socket) => {
  socket.on("error", console.error);
  console.log("User Connected");

  socket.on("message", (msg) => {
    const parsedMsg = JSON.parse(msg as unknown as string);

    if (parsedMsg.type === "join") {
      socketDataMap.set(socket, {
        room: parsedMsg.payload.roomId,
        name: parsedMsg.payload.name,
      });
      console.log(
        `User ${parsedMsg.payload.name} joined room ${parsedMsg.payload.roomId}`
      );
    }

    if (parsedMsg.type === "chat") {
      const userData = socketDataMap.get(socket);
      if (!userData) return;

      const { room, name } = userData;

      for (const [client, clientData] of socketDataMap.entries()) {
        if (clientData.room === room) {
          client.send(`${name}: ${parsedMsg.payload.message}`);
        }
      }
    }
  });

  socket.on("close", () => {
    console.log("User disconnected");
    socketDataMap.delete(socket);
  });
});
