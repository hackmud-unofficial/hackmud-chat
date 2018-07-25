import { Channel } from "./channel";
import { HackmudApi } from "./hackmud.api";

/**
 * Represents a account user.
 */
export class User {
  /**
   * The name of the user.
   */
  public name: string;
  /**
   * The channels this user has joined.
   */
  public channels: Channel[];
  private api: HackmudApi;

  constructor(api: HackmudApi, name: string, channels: Channel[]) {
    this.name = name;
    this.channels = channels;
    this.api = api;
  }

  /**
   * Returns the user channel from the given name.
   * @param name The channel name.
   */
  public getChannelByName(name: string) {
    return this.channels.filter((x) => x.name === name)[0];
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
