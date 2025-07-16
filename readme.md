```ts
import {
    Bot,
    Events,
    Intent
} from "rapchure";

const client = new Bot("token", Intent.combine(
    Intent.GUILDS,
    // etc.
));
client.on(Events.READY, u => {
    console.log(u);
});

client.run();
```

I write docs !))