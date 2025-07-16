```ts
import {
    Bot,
    Events
} from "rapchure";

const client = new Bot("token", 524287)
client.on(Events.MESSAGE_CREATE, m => {
    if(m.content == "!ping") {
        m.send("pong!");
    }
});

client.connect();
```

You can see docs on [github pages](https://master-albania.github.io/Rapchure/).