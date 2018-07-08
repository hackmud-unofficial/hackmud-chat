import { Message } from "./message";
import { User } from "./user";

export class ChannelMessage extends Message {
  public channel: string;
  public isJoin: boolean;
  public isLeave: boolean;

  constructor(accountUser: User, fromUser: string, msg: string, t: number, id: string, channel: string,
              isJoin = false, isLeave = false) {
    super(accountUser, fromUser, msg, t, id);
    this.channel = channel;
    this.isJoin = isJoin;
    this.isLeave = isLeave;
  }

  public toString() {
    const time = new Date(this.t * 1000);
    // tslint:disable-next-line:max-line-length
    return `(${this.accountUser.name}) ${("00" + time.getHours()).slice(-2) + ("00" + time.getMinutes()).slice(-2)} ${this.fromUser} :::${this.msg}:::`;
  }
}
