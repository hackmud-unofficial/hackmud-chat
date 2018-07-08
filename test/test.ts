import { ChannelMessage } from "../lib";
import { HackmudApi } from "../lib";
import { Message } from "../lib";

const client = new HackmudApi(process.env.TOKEN || "");

async function main() {
  const account = await client.getAccountData();

  account.poll((messages: Message[]) => {
    if (messages && messages.length > 0) {
      for (const msg in messages) {
        if (messages[msg]) {
          const message = messages[msg];
          if (message instanceof ChannelMessage) {
            // tslint:disable-next-line:no-console
            console.log(message.toString());
          }
        }
      }
    }
  });
}

Promise.all([main()]);
