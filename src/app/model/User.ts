import { Post } from "./Post";

export class User {
  public id: number;
  public name: string;
  public username: string;
  public password: string;
  public picture: string;
  public role: string;
  public posts: Post[];
}
