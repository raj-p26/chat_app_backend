import mysql from "mysql2/promise";
import { CreateGroup } from "../@types/group";

async function getConnection() {
  return mysql.createConnection({
    host    : "localhost",
    port    : 3306,
    user    : "root",
    password: "",
    database: "chat-app",
  });
}

export async function createGroup(groupData: CreateGroup) {
  const conn = await getConnection();

  let [results] = await conn.query("SELECT * FROM groups WHERE name=?;", [groupData.name]);

  if (results[0]) {
    return [null, "Group already exists"];
  }

  // TODO
  [results] = await conn.query(
    "INSERT INTO groups(name, description, created_by) VALUES (?, ?, ?);"
    [groupData.name, groupData.description, groupData.created_by]
  );

  await conn.end();
}
