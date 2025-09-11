import mysql from "mysql2/promise";
import { v4 as uuidV4 } from "uuid";
import type { CreateMessage, PayloadMessage } from "../@types/message.ts";

async function getConnection() {
  return mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "chat-app",
  });
}

export async function getGroupMessages(
  group_id: string
): Promise<PayloadMessage[]> {
  const conn = await getConnection();
  const [res] = await conn.query(
    "SELECT m.id, u.username, m.content, u.id as sender_id, m.inserted_at FROM messages m JOIN users u on m.sender_id = u.id WHERE group_id=? ORDER BY m.inserted_at ASC;",
    [group_id]
  );

  if ((res as any).length === 0) return [];

  await conn.end();
  return res as PayloadMessage[];
}

export async function createMessage(
  msg: CreateMessage
): Promise<PayloadMessage | null> {
  const conn = await getConnection();
  const messageID = uuidV4();

  let [res] = await conn.query(
    "INSERT INTO messages(id, sender_id, content, group_id) VALUES (?, ?, ?, ?);",
    [messageID, msg.sender_id, msg.content, msg.group_id]
  );

  if (!res) return null;

  [res] = await conn.query(
    "SELECT m.id, u.username, m.content, u.id as sender_id, m.inserted_at FROM messages m JOIN users u on m.sender_id = u.id WHERE m.id=?;",
    [messageID]
  );

  if (!res) return null;

  const newMessage: PayloadMessage = res[0];

  await conn.end();
  return newMessage;
}

export async function deleteMessage(messageID: string): Promise<string | null> {
  const conn = await getConnection();

  try {
    let [res] = await conn.query("SELECT * from messages WHERE id=?;", [
      messageID,
    ]);

    if ((res as any[]).length == 0) return "message not found";

    await conn.query("DELETE from messages WHERE id=?;", [messageID]);
  } catch (e) {
    console.error(e);
    return e.message;
  }

  await conn.end();
  return null;
}
