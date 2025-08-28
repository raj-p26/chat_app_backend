import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).send({
      status : "failed",
      message: "You are unauthorized"
    });
  }

  try {
    const tokenMetadata = jwt.decode(authToken) as jwt.JwtPayload;
    const userID = tokenMetadata.id!;

    req.headers['user-id'] = userID;
  } catch (e) {
    return res.status(401).send({
      status : "failed",
      message: e
    });
  }

  next();
}
