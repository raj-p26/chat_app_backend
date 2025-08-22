import type { LoginUser, RegisterUser, User } from "../@types/user.ts";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
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

export async function registerUser(userData: RegisterUser): Promise<[User | null, string | null]> {
  const conn = await getConnection();
  let [result] = await conn.query("SELECT * FROM users WHERE email=?;", [userData.email]);

  if ((result as any).length > 0) {
    return [null, "User already exists"];
  }

  [result] = await conn.query("SELECT * FROM users WHERE username=?;", [userData.username]);

  if ((result as any).length > 0) {
    return [null, "Username already exists"];
  }

  const hashedPassword = bcrypt.hashSync(userData.password);
  const id = uuidV4();

  await conn.query(
    "INSERT INTO users(id, username, email, password) VALUES (?, ?, ?, ?);",
    [id, userData.username, userData.email, hashedPassword],
  );

  const user: User = {
    id,
    username: userData.username,
    email: userData.email,
  };

  await conn.end();

  return [user, null];
}

export async function loginUser(userData: LoginUser): Promise<[User | null, string | null]> {
  const conn = await getConnection();
  let [result] = await conn.query("SELECT * FROM users WHERE email=?;", [userData.email]);

  if ((result as any).length === 0) {
    return [null, "Invalid credentials"];
  }

  console.log(result[0]);

  const { id, username, email, password } = result[0];

  if (!bcrypt.compareSync(userData.password, password)) {
    return [null, "Invalid credentials"];
  }

  const user: User = { id, username, email };

  await conn.end();

  return [user, null];
}

