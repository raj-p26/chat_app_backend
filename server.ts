import cors from "cors";
import express from "express";
import { authRouter } from "./routes/auth.ts";
import { groupRouter } from "./routes/group.ts";
import { userRouter } from "./routes/users.ts";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/groups", groupRouter);
app.use("/users", userRouter);

export { app };
