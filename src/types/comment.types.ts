import { PostData } from "./post.types";
import { User } from "./user.types";

export interface CommentData {
  id: string;
  text: string;
  user: User;
  post: PostData;
}
