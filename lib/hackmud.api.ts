import * as Debug from "debug";
import * as request from "request-promise-native";
import { Account } from "./account";
import { Channel } from "./channel";
import { API_URL, ENDPOINTS } from "./constants";
import { User } from "./user";

const debug = Debug("hackmud-chat:client");

/**
 * The main class, used by all other classes.
 */
export class HackmudApi {
  /**
   * The token to be used with the api.
   */
  public token: string = "";

  constructor(token?: string) {
    if (token) {
      this.token = token;
    }
  }

  private async request(endpoint: ENDPOINTS, json: any) {
    return await  request.post(API_URL + endpoint, {json});
  }

  public async getToken(pass: string): Promise<string> {
    if (pass.length > 5) {
      throw new Error("You passed a token to getToken, and you should pass a password (5 chars)");
    }
    const body = await this.request(ENDPOINTS.GET_TOKEN, {pass});
    if (body.ok) {
      debug("Token is:", body.chat_token);
      this.token = body.chat_token;
      return body.chat_token;
    } else {
      throw new Error(body);
    }
  }

  public async getAccountData() {
    const body = await this.request(ENDPOINTS.ACCOUNT_DATA, {chat_token: this.token});
    if (body.ok) {
      const users: User[] = [];
      for (const ownUser in body.users) {
        if (ownUser) {
          const channels: Channel[] = [];

          for (const channelName in body.users[ownUser]) {
            if (channelName) {
              channels.push(new Channel(this, channelName, body.users[ownUser][channelName], ownUser));
            }
          }
          users.push(new User(this, ownUser, channels));
        }
      }
      return new Account(this, users);
    } else {
      throw new Error(body);
    }
  }

  public async sendChannel(channel: string, user: string, msg: string) {
    const body = await this.request(ENDPOINTS.CREATE_CHAT, {
      chat_token: this.token,
      username: user,
      channel,
      msg,
    });
    if (!body.ok) {
      throw new Error(body);
    }
  }

  public async sendMessage(user: string, toUser: string, msg: string) {
    const body = await this.request(ENDPOINTS.ACCOUNT_DATA, {
      chat_token: this.token,
      username: user,
      tell: toUser,
      msg,
    });
    if (!body.ok) {
      throw new Error(body);
    }
  }

  public async getChats(users: string[], after?: number, before?: number) {
    const body = await this.request(ENDPOINTS.CHATS, {
      chat_token: this.token,
          usernames: users,
          before,
          after,
    });
    if (!body.ok) {
      throw new Error(body);
    } else {
      return body;
    }
  }
}
