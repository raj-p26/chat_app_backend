import dotenv from "dotenv";

dotenv.config();

export const SALT_ROUNDS = process.env.SALT_ROUNDS!;
export const JWT_SECRET  = process.env.JWT_SECRET!;
