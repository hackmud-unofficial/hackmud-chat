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
  /**
   * The users that are in this channel.
   */
  public users: string[];
  /**
   * The name of the channel
   */
  public name: string;
  /**
   * The account user related to the channel.
   *
   * The one that it's to send the messages from when using send(), etc.
   */
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
   * Send a message every x ms.
   * @param msg The message
   * @param interval Interval in ms
   */
  public sendInterval(msg: string, interval: number) {
    return setInterval(async () => {
      await this.send(msg);
    }, interval);
  }

  /**
   * Sends the messages in the array in the order given separated by the specified time.
   * @param msgs The messages
   * @param interval Interval in ms
   */
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

  /**
   * Every interval ms send a random message from the given array.
   * @param msgs The messages
   * @param interval Interval in ms
   */
  public sendIntervalRandom(msgs: string[], interval: number) {
    return setInterval(async () => {
      await this.send(msgs[random(0, msgs.length - 1)]);
    }, interval);
  }
}
