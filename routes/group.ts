import { Router } from "express";
import { requireAuth } from "../middlewares/auth-middleware.ts";

const groupRouter = Router();

groupRouter.post("/", requireAuth, (_req, res) => {
  res.status(201).send({
    status: "success",
    message: "Fake group created"
  });
});

export { groupRouter };
