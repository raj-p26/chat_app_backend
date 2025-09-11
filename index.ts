import { app } from "./server.ts";
import { Server } from "socket.io";
import { Logger } from "./utils/logger.ts";
import jwt from "jsonwebtoken";
import * as messageHandler from "./db/messages.ts";

const PORT = 9090;
const logger = new Logger("server.ts");

const httpServer = app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  logger.log(`Server started at http://0.0.0.0:${PORT}`);
});

const io = new Server(httpServer, {
  cors: { origin: "*", credentials: true },
});

io.use((socket, next) => {
  const authToken = socket.handshake.auth.token;
  if (!authToken) {
    return next(new Error("You are unauthorized"));
  }

  try {
    const payload = jwt.decode(authToken) as jwt.JwtPayload;
    const userID = payload.id!;
    socket.data["user-id"] = userID;
  } catch (e) {
    return next(e);
  }

  next();
});

io.on("connect", (socket) => {
  const userID = socket.data["user-id"];
  const groupID = socket.handshake.query.groupID;

  const getGroupMessages = async (groupID: string) => {
    const messages = await messageHandler.getGroupMessages(groupID);
    socket.emit("message:list", messages);
  };

  getGroupMessages(groupID as string);

  socket.on("message:create", async (data) => {
    const newMessage = await messageHandler.createMessage({
      sender_id: userID,
      group_id: data["group_id"],
      content: data["message"],
    });

    io.emit("message:new", newMessage);
  });

  socket.on("message:delete", async (messageID) => {
    const err = await messageHandler.deleteMessage(messageID);
    if (err !== null) {
      socket.emit("message:delete_error", err);
    } else {
      io.emit("message:deleted", messageID);
    }
  });
});
