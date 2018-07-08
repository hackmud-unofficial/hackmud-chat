import { ChannelMessage, HackmudApi, Message } from "../lib";

(async () => {

  const client = new HackmudApi(process.env.TOKEN || "");
  const account = await client.getAccountData();

  account.poll(async (messages: Message[]) => {
    if (messages && messages.length > 0) {
      for (const msg in messages) {
        if (messages[msg]) {
          const message = messages[msg];
          if (message instanceof ChannelMessage) {
            // tslint:disable-next-line:no-console
            console.log(message.toString());
            message.channel.send("Hey!");
          }
        }
      }
    }
  });

})();
