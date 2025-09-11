import type { Request, Response } from "express";
import * as userHandler from "../db/users.ts";

export async function show(req: Request, res: Response) {
  const { id } = req.params;
  const [user, err] = await userHandler.getUserByID(id);

  if (err != null) {
    return res.status(404).json({
      status: "failed",
      message: err,
    });
  }

  res.json(user);
}

export async function index(req: Request, res: Response) {
  const users = await userHandler.getAllUsers();

  return res.json({
    status: "success",
    message: "",
    payload: { users },
  });
}
