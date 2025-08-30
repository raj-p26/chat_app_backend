import mysql from "mysql2/promise";
import type { CreateMessage, Message } from "../@types/message.ts";
import { v4 as uuidV4 } from "uuid";

async function getConnection() {
  return mysql.createConnection({
    host    : "localhost",
    port    : 3306,
    user    : "root",
    password: "",
    database: "chat-app"
  });
}

export async function createMessage(messageData: CreateMessage): Promise<[Message | null, string | null]> {
  const conn = await getConnection();

  const id = uuidV4();

  try {
    const [res] = await conn.query(
      "INSERT INTO messages(id, content, sender_id, group_id) VALUES (?, ?, ?, ?);",
      [id, messageData.content, messageData.sender_id, messageData.group_id]
    );

    if (!res) throw new Error("Record not inserted");

    return [{ id, ...messageData }, null];
  } catch (e) {
    return [null, e.message];
  } finally {
    await conn.end();
  }
}
