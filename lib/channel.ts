import * as Debug from "debug";
import * as request from "request";
import { API_URL, ENDPOINTS } from "./constants";
import { HackmudApi } from "./hackmud.api";

const debug = Debug("hackmud-chat:channel");

function random(low: number, high: number) {
  return Math.random() * (high - low) + low;
}

/**
 * Represents a hackmud channel.
 */
export class Channel {
  public users: string[];
  public name: string;
  public ownUser: string;
  private api: HackmudApi;

  constructor(api: HackmudApi, name: string, users: string[], ownUser: string) {
    this.name = name;
    this.users = users;
    this.ownUser = ownUser;
    this.api = api;
  }

  /**
   * Send a message to the channel with ownUser
   * @param msg The message
   */
  public async send(msg: string) {
    return await this.api.sendChannel(this.name, this.ownUser, msg);
  }

  /**
   * Send a message every @param interval ms
   * @param msg The message
   * @param interval Interval in ms
   */
  public sendInterval(msg: string, interval: number) {
    return setInterval(async () => {
      await this.send(msg);
    }, interval);
  }

  public sendIntervalSequence(msgs: string[], interval: number) {
    let index = 0;
    return setInterval(async () => {
      await this.send(msgs[index]);
      index++;
      if (index >= msgs.length) {
        index = 0;
      }
    }, interval);
  }

  public sendIntervalRandom(msgs: string[], interval: number) {
    return setInterval(async () => {
      await this.send(msgs[random(0, msgs.length - 1)]);
    }, interval);
  }
}
