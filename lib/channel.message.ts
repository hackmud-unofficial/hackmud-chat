import { Channel } from "./channel";
import { Message } from "./message";
import { User } from "./user";

/**
 * Represents a message from a channel.
 */
export class ChannelMessage extends Message {
  /**
   * The channel this message is contained within.
   */
  public channel: Channel;
  /**
   * Wether or not this message means someone joined.
   */
  public isJoin: boolean;
  /**
   * Wether or not this message means someone left.
   */
  public isLeave: boolean;

  constructor(accountUser: User, fromUser: string, msg: string, t: number, id: string, channel: Channel,
              isJoin = false, isLeave = false) {
    super(accountUser, fromUser, msg, t, id);
    this.channel = channel;
    this.isJoin = isJoin;
    this.isLeave = isLeave;
  }

  /**
   * Return a string with the message formatted.
   */
  public toString() {
    const time = new Date(this.t * 1000);
    // tslint:disable-next-line:max-line-length
    return `(${this.accountUser.name}) ${("00" + time.getHours()).slice(-2) + ("00" + time.getMinutes()).slice(-2)} ${this.channel.name} ${this.fromUser} :::${this.msg}:::`;
  }

  /**
   * Wether this message is sent by the account user.
   */
  public isOwnMessage() {
    return this.accountUser.name === this.fromUser;
  }
}
