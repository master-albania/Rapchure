How to use?

```js
const {
    Bot,
    Intents
} = require("rapchure");

const client = new Bot(Intents.GUILDS | Intents.GUILD_MESSAGES | Intents.MESSAGE_CONTENT);

client.on("up", (u) => {
    console.log(`your bot (${u.user.username}) is upping`);
});

client.on("messageCreate", message => {
    if(message.content == "!ping") {
        message.sendMessage("Hello!");
    }
});

client.up("TOKEN");
```

I rewrote docs, please wait, u can see github :)