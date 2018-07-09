import * as Debug from "debug";
import { ChannelMessage } from "./channel.message";
import { HackmudApi } from "./hackmud.api";
import { Message } from "./message";
import { PrivateMessage } from "./private.message";
import { User } from "./user";

const debug = Debug("hackmud-chat:account");

/**
 * Represents a hackmud account with it's users.
 */
export class Account {
  /**
   * The users of the account.
   */
  public users: User[];
  private api: HackmudApi;
  constructor(api: HackmudApi, users: User[]) {
    this.api = api;
    this.users = users;
  }

  /**
   * Returns the account user from the given name.
   * @param name The user name
   */
  public getUserByName(name: string) {
    return this.users.filter((x) => x.name === name)[0];
  }

  /**
   * Get the new messages every interval specified by `frequency`.
   * @param cb
   * @param frequency
   */
  public poll(cb: (messages: Message[]) => void, frequency: number = 1200) {
    // It looks like its ignoring the interval
    let time = (Date.now() / 1000);
    return setInterval(async () => {
      const messages = await this.api.getChats(this.users.map((x) => x.name), time);
      time = (Date.now() / 1000) + 0.001;

      const msgArr: Message[] = [];
      for (const user in messages.chats) {
        if (messages.chats[user]) {
          for (const msg in messages.chats[user]) {
            if (messages.chats[user][msg] && messages.chats[user][msg].channel) {
              const msgInfo = messages.chats[user][msg];
              const channel = this.users.filter((x) => x.name === user)[0]
                .channels.filter((x) => x.name === messages.chats[user][msg].channel)[0];
              msgArr.push(new ChannelMessage(this.users.filter((x) => x.name === user)[0], msgInfo.from_user,
                msgInfo.msg, msgInfo.t, msgInfo.id,
                channel, msgInfo.is_join || false,
                msgInfo.is_leave || false));
            } else if (messages.chats[user][msg]) {
              const msgInfo = messages.chats[user][msg];
              msgArr.push(new PrivateMessage(this.users.filter((x) => x.name === user)[0],
                msgInfo.from_user, msgInfo.msg,
                msgInfo.t, msgInfo.id, msgInfo.to_user));
            }
          }
        }
      }
      if (cb) { cb(msgArr); }

    }, frequency);
  }
}
