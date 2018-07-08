import * as Debug from "debug";
import * as request from "request";
import { API_URL, ENDPOINTS } from "./constants";
import { HackmudApi } from "./hackmud.api";

const debug = Debug("hackmud-chat:channel");

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

  public async send(msg: string) {
    return await this.api.sendChannel(this.name, this.ownUser, msg);
  }
}
