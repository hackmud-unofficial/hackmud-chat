import { Message } from "./message";
import { User } from "./user";

/**
 * Represents a private message
 */
export class PrivateMessage extends Message {
  /**
   * The user this message was sent to
   */
  public toUser: string;

  constructor(accountUser: User, fromUser: string, msg: string, t: number, id: string, toUser: string) {
    super(accountUser, fromUser, msg, t, id);
    this.toUser = toUser;
  }
}
