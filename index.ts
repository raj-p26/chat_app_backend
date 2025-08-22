import { httpServer } from "./server.ts";
import { Server } from "socket.io";

const io = new Server(httpServer);

io.on("connect", (socket) => {
  console.log(`socket with id ${socket.id} connected`);
  console.log(`auth token: ${socket.handshake.auth.token}`);
});
