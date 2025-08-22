import { Router } from "express";
import * as authController from "../controllers/auth.ts";

const authRouter = Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);

export { authRouter };
