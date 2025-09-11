import { Router } from "express";
import { requireAuth } from "../middlewares/auth-middleware.ts";
import * as groupController from "../controllers/group.ts";

const groupRouter = Router();

groupRouter.get("/", groupController.index);
groupRouter.post("/", requireAuth, groupController.create);
groupRouter.get("/:id", groupController.show);
groupRouter.post("/:id/join", requireAuth, groupController.join);
groupRouter.get("/:id/is-member", requireAuth, groupController.isMember);

export { groupRouter };
