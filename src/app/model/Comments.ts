import { Post } from "./Post";
import { User } from "./User";

export class Comments{
  public id: number;
  public comment: string;
  public date: Date;
  public user: User;
  public post: Post;
}
