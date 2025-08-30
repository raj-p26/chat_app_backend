export type Message = {
  id: string;
  content: string;
  sender_id: string;
  group_id: string;
};

export type CreateMessage = Pick<Message, "sender_id" | "group_id" | "content">;
