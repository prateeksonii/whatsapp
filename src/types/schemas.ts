export type UserSchema = {
  id: string;
  name: string;
  email: string;
};

export type ChatSchema = {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  created_at: string;
};

export type Message = {
  chat: ChatSchema;
  timestamp: Date;
  sent: boolean;
};
