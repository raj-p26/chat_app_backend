import { Router } from "express";
import { requireAuth } from "../middlewares/auth-middleware.ts";
import * as groupController from "../controllers/group.ts"

const groupRouter = Router();

groupRouter.get("/", groupController.index);
groupRouter.post("/", requireAuth, groupController.create);
groupRouter.post("/:id/join", requireAuth, groupController.join);

export { groupRouter };
