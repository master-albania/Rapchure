import * as ws from "ws";
import { BotBase } from "./BotBase";
import chalk from "chalk";
import { Message } from '../Events/Message/Message';

type Listener = (...args: any[]) => void;

export class Bot extends BotBase {
    public ws: ws.WebSocket;
    
    private listeners: { [event: string]: Listener[] } = {};
    
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
           console.log(chalk.red(`WebSocket expression: ${e}`)); 
        });
    }

    connect() {
        this.ws.on("message", (data) => {
            const payload = JSON.parse(data.toString());
            const {
                t,
                s,
                d,
                op
             } = payload;

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
                    })); break;
                
                case 0:
                   this.emit(t, d);
                   break;
             }
        });
    }

    public on(event: string, listeners: Listener) {
        if(!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(listeners);
    }
    
    private emit(event: string, rawData: any) {
        if(!this.listeners[event]) return;
        let wrapped: any;

        switch(event) {
            case "MESSAGE_CREATE":
                wrapped = new Message(rawData, this.token, this.url);
        }
        for(const l of this.listeners[event]) {
            l(wrapped);
        }
    }
}