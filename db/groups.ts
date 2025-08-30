import mysql from "mysql2/promise";
import type { CreateGroup, Group, JoinGroup } from "../@types/group.ts";
import { v4 as uuidV4 } from "uuid";

async function getConnection() {
  return await mysql.createConnection({
    host    : "localhost",
    port    : 3306,
    user    : "root",
    password: "",
    database: "chat-app"
  });
}

export async function createGroup(groupData: CreateGroup): Promise<[Group | null, string | null]> {
  const conn = await getConnection();

  try {
    let [res] = await conn.query("SELECT * FROM groups WHERE name=?", [groupData.name]);

    if ((res as any).length > 0) throw new Error("Record already exists");

    const id = uuidV4();
    
    [res] = await conn.query(
      "INSERT INTO groups(id, name, description, created_by) VALUES (?, ?, ?, ?);",
      [id, groupData.name, groupData.description, groupData.created_by]
    );

    if (!res) throw new Error("Unable to insert record");
    
    return [{ id, ...groupData }, null];
  } catch(e) {
    return [null, e.message];
  } finally {
    await conn.end();
  }
}

export async function listGroups(limit?: number) {
  const conn = await getConnection();
  let query = "SELECT * FROM groups";
  if (limit) {
    query += " LIMIT ?"
  }

  const [res] = await conn.query(query, limit && [limit]);

  await conn.end();
  return (res as any[]).map(e => e as Group);
}

export async function joinGroup(data: JoinGroup): Promise<string | null> {
  const conn = await getConnection();

  try {
    const group = await getGroupByID(data.group_id);
    if (!group) return "Group does not exist";
    
    if (group.created_by === data.member_id) return "Owner is already a member of the group";

    const isMember = await isMemberOfGroup(data.member_id, data.group_id);

    if (isMember) return "Already a member of this group.";

    await conn.query(
      "INSERT INTO group_members(id, group_id, member_id) VALUES (?, ?, ?);",
      [uuidV4(), data.group_id, data.member_id]
    );

    return null;
  } catch(e) {
    return e.message;
  } finally {
    await conn.end();
  }
}

async function getGroupByID(id: string): Promise<Group | null> {
  const conn = await getConnection();

  try {
    const [res] = await conn.query("SELECT * FROM groups WHERE id=?;", [id]);

    return res[0];
  } catch {
    return null;
  } finally {
    await conn.end();
  }
}

export async function isMemberOfGroup(member_id: string, group_id: string): Promise<boolean> {
  const conn = await getConnection();

  let [res] = await conn.query(
    "SELECT * FROM group_members WHERE member_id=? AND group_id=?;",
    [member_id, group_id]
  );

  await conn.end();

  return (res as any).length > 0;
}

export async function leaveGroup(group_id: string, member_id: string): Promise<string | null> {
  const conn = await getConnection();

  const group = await getGroupByID(group_id);

  if (!group) return "Group does not exist";

  if (group.created_by === member_id) return "TODO: Creator cannot leave group";

  if (!isMemberOfGroup(member_id, group_id)) return "You are not in the group";

  try {
    await conn.query(
      "DELETE FROM group_members WHERE group_id=? AND member_id=?;",
      [group_id, member_id]
    );

    return null;
  } catch(e) {
    return e.message;
  } finally {
    await conn.end();
  }
}
