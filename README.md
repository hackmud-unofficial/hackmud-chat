# hackmud-chat

Documentation: https://hackmud-unofficial.github.io/hackmud-chat

As this package is made with typescript, you don't need to install any typings.

You can also use it with javascript.

`npm install hackmud-chat --save`

## Example (in typescript)

```ts
import { ChannelMessage, HackmudApi, Message } from "hackmud-chat";

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
```
