import { Router } from "express";
import * as userController from "../controllers/user.ts";

const userRouter = Router();

userRouter.get("/", userController.index);
userRouter.get("/:id", userController.show);

export { userRouter };
