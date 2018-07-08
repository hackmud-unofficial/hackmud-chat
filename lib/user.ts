import { Channel } from "./channel";
import { HackmudApi } from "./hackmud.api";

export class User {
  public name: string;
  public channels: Channel[];
  private api: HackmudApi;

  constructor(api: HackmudApi, name: string, channels: Channel[]) {
    this.name = name;
    this.channels = channels;
    this.api = api;
  }

  /**
   * Send a message to another user.
   * @param user The user to send the message to.
   * @param msg The content of the message.
   */
  public async send(user: string, msg: string) {
    return await this.api.sendMessage(this.name, user, msg);
  }
}
