import * as Debug from "debug";
import * as request from "request";
import { Account } from "./account";
import { Channel } from "./channel";
import { API_URL, ENDPOINTS } from "./constants";
import { User } from "./user";

const debug = Debug("hackmud-chat:client");

export class HackmudApi {
  public token: string;

  constructor(token: string) {
    this.token = token;

    if (this.token.length < 6) {
      // Get the long token
      request.post(API_URL + ENDPOINTS.GET_TOKEN, {
        json: {
          pass: this.token,
        },
      }, (err, res, body) => {
        if (err) { throw err; }
        debug("Requested get_token:", res.statusCode);
        if (body.ok) {
          this.token = body.token;
        } else {
          throw new Error(body);
        }
      });
    }
  }

  public async getAccountData(): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      request.post(API_URL + ENDPOINTS.ACCOUNT_DATA, {
        json: {
          chat_token: this.token,
        },
      }, (err, res, body) => {
        if (err) { throw err; }
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
        if (err) { throw err; }
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
        if (err) { throw err; }
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
        if (err) { throw err; }
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

/*
  hackmud-chat:client { id: '5b41d522783e8c24a342ba98',
  hackmud-chat:client   t: 1531041058.1820002,
  hackmud-chat:client   from_user: 'ryo',
  hackmud-chat:client   msg: 'sasadsd',
  hackmud-chat:client   to_user: 'multivac' } +25ms
  */

  /*
    hackmud-chat:client { id: '5b41d56c7b97fd38a90f7311',
  hackmud-chat:client   t: 1531041132.401,
  hackmud-chat:client   from_user: 'ryo',
  hackmud-chat:client   msg: 'test',
  hackmud-chat:client   channel: '0000' } +30ms
  */
