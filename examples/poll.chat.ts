import { ChannelMessage, HackmudApi, Message } from "../lib";

(async () => {

  const client = new HackmudApi(/* if you have a token (>5 chars) put it here */);
  await client.getToken("pass"); // otherwise get the token using the pass
  const account = await client.getAccountData();
  account.poll(async (messages: Message[]) => {
    if (messages && messages.length > 0) {
      for (const msg in messages) {
        if (messages[msg]) {
          const message = messages[msg];
          if (message instanceof ChannelMessage) {
            // tslint:disable-next-line:no-console
            console.log(message.toString());
            // message.channel.send("Hey!");
          }
        }
      }
    }
  });

})();
