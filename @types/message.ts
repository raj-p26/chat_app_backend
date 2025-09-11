export type Message = {
  id: string;
  content: string;
  sender_id: string;
  group_id: string;
};

export type CreateMessage = Pick<Message, "content" | "sender_id" | "group_id">;

export type PayloadMessage = {
  id: string;
  content: string;
  sender: string;
  sender_id: string;
  sent_at: string;
};
