import * as ws from "ws";
import { BotBase } from "./BotBase";
import chalk from "chalk";
import { EventEmitter } from "events";
import { BotEvents } from "./BotEvents";
import { Events } from "../Events/Events";
import { User } from "../Events/User";
import { Message } from "../Events/Message";

export class Bot extends BotBase {
    public ws: ws.WebSocket;
    private events: EventEmitter = new EventEmitter();

    constructor(token: string, intents: number) {
        super(token, intents);

        this.ws = new ws.WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");

        this.ws.on("open", () => {
            console.log(chalk.bold(chalk.green("WebSocket has been started!")));
        });

        this.ws.on("close", (c, r) => {
            console.log(chalk.bold(chalk.red(`WebSocket is closed: ${c}`) + chalk.magenta(` by reason ${r}`)));
        });

        this.ws.on("error", (e) => {
            console.log(chalk.red(`WebSocket error: ${e}`));
        });
    }

    connect() {
        this.ws.on("message", (data) => {
            const payload = JSON.parse(data.toString());
            const { t, d, op } = payload;

            switch(op) {
                case 10:
                    const interval = d.heartbeat_interval;
                    setInterval(() => {
                        this.ws.send(JSON.stringify({ op: 1, d: null }));
                    }, interval);

                    this.ws.send(JSON.stringify({
                        op: 2,
                        d: {
                            token: this.token,
                            intents: this.intents,
                            properties: {
                                $os: "os",
                                $browser: "browser",
                                $device: "machine"
                            }
                        }
                    }));
                    break;
                case 0:
                    if(t === Events.Ready) {
                        this.events.emit(Events.Ready, { user: new User(d.user, this.token, this.url) });
                    } else if(t === Events.MessageCreate) {
                        this.events.emit(Events.MessageCreate, new Message(d, this.token, this.url));
                    }
                    break;
            }
        });
    }

    public on<K extends keyof BotEvents>(event: K, listerner: (data: BotEvents[K]) => void) {
        this.events.on(event, listerner);
    }
}
