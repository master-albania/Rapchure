const WebSocket = require("ws");
const EventEmitter = require("events");
const User = require("./Events/User");
const Message = require("./Events/Message");

class BaseBot {
    constructor(intents) {
        this.intents = intents;
        this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
        this.emmiter = new EventEmitter();
        this.url = "https://discord.com/api/v10";
        this.ws.on("open", () => {
            console.log("WebSocket connection established.");
        });

        this.ws.on("close", (code, reason) => {
            console.log(`WebSocket connection closed: ${code} - ${reason}`);
        });

        this.ws.on("error", (error) => {
            console.error("WebSocket error:", error);
        });
    }

    
    up(token) {
        this.token = token;
        this.ws.on("message", data => {
            const payload = JSON.parse(data);
            const {
                op,
                t,
                s,
                d
            } = payload;

            switch(op) {
                case 10:
                    this._identify(d.heartbeat_interval);
                    break;
                case 0:
                    if(t==="READY") {
                        this._emit("up", new User(d));
                    }

                    if(t==="MESSAGE_CREATE") {
                        this._emit("messageCreate", new Message(d, this.token, this.url));
                        break;
                    }
            }

        });
    }

    _identify(interval) {
        setInterval(() => {
            this.ws.send(JSON.stringify({
                op: 1,
                d: null
            }));
        }, interval);

        this.ws.send(JSON.stringify({
            op: 2,
            d: {
                token: this.token,
                intents: this.intents,
                properties: {
                    $os: "ukraine",
                    $browser: "salo",
                    $device: "ysik"
                }
            }
        }));
    }

    on(event, listener) {
        this.emmiter.on(event, listener);
    
    }

    _emit(event, ...args) {
        this.emmiter.emit(event, ...args);
    }
}

module.exports = BaseBot;