import { User } from "./user";

export abstract class Message {
  public fromUser: string;
  public msg: string;
  public t: number;
  public id: string;
  public accountUser: User;

  constructor(accountUser: User, fromUser: string, msg: string, t: number, id: string) {
    this.fromUser = fromUser;
    this.msg = msg;
    this.t = t;
    this.id = id;
    this.accountUser = accountUser;
  }
}
