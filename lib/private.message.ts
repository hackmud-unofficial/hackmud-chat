import { Message } from "./message";
import { User } from "./user";

export class PrivateMessage extends Message {
  public toUser: string;

  constructor(accountUser: User, fromUser: string, msg: string, t: number, id: string, toUser: string) {
    super(accountUser, fromUser, msg, t, id);
    this.toUser = toUser;
  }
}
