import * as Debug from "debug";
import * as request from "request";
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

  public async getToken(pass: string) {
    if (pass.length > 5) {
      throw new Error("You passed a token to getToken, and you should pass a password (5 chars)");
    }
    return new Promise((resolve, reject) => {
      request.post(API_URL + ENDPOINTS.GET_TOKEN, {
        json: {
          pass,
        },
      }, (err, res, body) => {
        if (err) { throw err; }
        debug("Requested get_token:", res.statusCode);
        if (body.ok) {
          debug("Token is:", body.chat_token);
          this.token = body.chat_token;
          resolve(body.chat_token);
        } else {
          reject(body);
        }
      });
    });
  }

  public async getAccountData(): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      request.post(API_URL + ENDPOINTS.ACCOUNT_DATA, {
        json: {
          chat_token: this.token,
        },
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        debug("Requested account_data:", res.statusCode);
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
          resolve(new Account(this, users));
        } else {
          reject(body);
        }
      });
    });
  }

  public async sendChannel(channel: string, user: string, msg: string) {
    return new Promise<void>((resolve, reject) => {
      request.post(API_URL + ENDPOINTS.CREATE_CHAT, {
        json: {
          chat_token: this.token,
          username: user,
          channel,
          msg,
        },
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        debug("Requested create_chat (send):", res.statusCode);
        if (!body.ok) {
          reject(body);
        } else {
          resolve();
        }
      });
    });
  }

  public async sendMessage(user: string, toUser: string, msg: string) {
    return new Promise<void>((resolve, reject) => {
      request.post(API_URL + ENDPOINTS.CREATE_CHAT, {
        json: {
          chat_token: this.token,
          username: user,
          tell: toUser,
          msg,
        },
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        debug("Requested create_chat (tell):", res.statusCode);
        if (!body.ok) {
          reject(body);
        } else {
          resolve();
        }
      });
    });
  }

  public async getChats(users: string[], after?: number, before?: number) {
    return new Promise<any>((resolve, reject) => {
      request.post(API_URL + ENDPOINTS.CHATS, {
        json: {
          chat_token: this.token,
          usernames: users,
          before,
          after,
        },
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        debug("Requested chats:", res.statusCode);
        if (!body.ok) {
          reject(body);
        } else {
          resolve(body);
        }
      });
    });
  }
}
