import cors from "cors";
import express from "express";
import { Logger } from "./utils/logger.ts";
import { authRouter } from "./routes/auth.ts";
import { groupRouter } from "./routes/group.ts";

const PORT = 9090;
const logger = new Logger("server.ts");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/groups", groupRouter);

const httpServer = app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  logger.log(`Server started at http://0.0.0.0:${PORT}`);
});

export { httpServer };
