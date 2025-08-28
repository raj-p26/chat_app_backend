import type { Request, Response } from "express";
import * as groupsHandler from "../db/groups.ts";
import type { JoinGroup } from "../@types/group.ts";

export async function create(req: Request, res: Response) {
  let groupData = req.body as { name: string; description: string; };
  let userID = req.headers['user-id'];

  if (!userID) {
    res.status(401).send({
      status: "failed",
      message: "You are unauthorized",
    });
  }

  userID = userID as string;
  
  const err = await groupsHandler.createGroup({ created_by: userID, ...groupData });

  if (err) {
    return res.status(500).send({
      status: "failed",
      message: err
    });
  }

  res.status(201).send({
    status : "success",
    message: "Group created successfully",
  });
}

export async function index(req: Request, res: Response) {
  const limit = +(req.query["limit"] as string) || 5;
  
  const groups = await groupsHandler.listGroups(limit);

  res.send({
    status : "success",
    payload: { groups }
  });
}

export async function join(req: Request, res: Response) {
  const userID = req.headers['user-id'];
  const groupID = req.params['id'];

  if (!userID) {
     res.status(401).send({
      status : "failed",
      message: "You are unauthorized",
    });
  }

  const joinInfo: JoinGroup = {
    group_id: groupID,
    member_id: userID as string
  };

  const err = await groupsHandler.joinGroup(joinInfo);
  if (err) {
    return res.status(500).send({
      status : "failed",
      message: err
    });
  }

  res.send({
    status : "success",
    message: "Group joined successfully"
  });
}
