export interface IMessage {
  id: number;
  author_username: string;
  author_id: number;
  created_at: Date | number;
  body: string;
}
