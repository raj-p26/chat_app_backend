import type { Request, Response } from "express";
import * as userHandler from "../db/users.ts";
import type { LoginUser, RegisterUser } from "../@types/user.ts";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants.ts";

export async function registerUser(req: Request, res: Response) {
  const user = req.body as RegisterUser;

  const [newUser, err] = await userHandler.registerUser(user);

  if (err !== null || newUser == null) {
    return res.status(500).json({
      status: "failed",
      message: err || "Something went wrong",
    });
  }

  const token = jwt.sign({ ...newUser }, JWT_SECRET, { expiresIn: "7d" });

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    payload: { token, user },
  });
}

export async function loginUser(req: Request, res: Response) {
  const userData = req.body as LoginUser;

  const [user, err] = await userHandler.loginUser(userData);

  if (err !== null || user === null) {
    const statusCode = err === "Invalid credentials" ? 401 : 500;
    return res.status(statusCode).send({
      status: "failed",
      message: err || "Something went wrong",
    });
  }

  const token = jwt.sign({ ...user }, JWT_SECRET, { expiresIn: "7d" });

  res.json({
    status: "success",
    message: "Logged in successfully",
    payload: { token, user },
  });
}
