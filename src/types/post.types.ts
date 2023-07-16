export interface PostData {
  id: string;
  title: string;
  text: string;
  createDate: string;
  user: { id: string; username: string };
}
