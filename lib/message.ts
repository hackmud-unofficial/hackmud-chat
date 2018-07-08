import { User } from "./user";

/**
 * A abstract class that represents a message.
 *
 * You will usually want to check if it's a instance of `ChannelMessage` or `PrivateMessage`.
 */
export abstract class Message {
  /**
   * The user that send the message
   */
  public fromUser: string;
  public msg: string;
  /**
   * Unix timestamp in seconds.
   */
  public t: number;
  /**
   * The id of the message
   */
  public id: string;
  /**
   * The user account related to this message.
   */
  public accountUser: User;

  constructor(accountUser: User, fromUser: string, msg: string, t: number, id: string) {
    this.fromUser = fromUser;
    this.msg = msg;
    this.t = t;
    this.id = id;
    this.accountUser = accountUser;
  }
}
