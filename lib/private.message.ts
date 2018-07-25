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

  /**
   * Sends a reply to the private message.
   * @param message The message
   */
  public async reply(message: string) {
    return await this.accountUser.send(this.fromUser, message);
  }

  /**
   * Return a string with the message formatted.
   */
  public toString() {
    const time = new Date(this.t * 1000);
    // tslint:disable-next-line:max-line-length
    return `(${this.accountUser.name}) ${("00" + time.getHours()).slice(-2) + ("00" + time.getMinutes()).slice(-2)} ${this.isOwnMessage() ? "to " + this.toUser : "from " + this.fromUser} :::${this.msg}:::`;
  }
}
