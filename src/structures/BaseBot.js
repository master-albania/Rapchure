const { default: chalk } = require("chalk");
const WebSocket = require("ws");

class BaseBot {
    /**
     * 
     * @param {number} intents 
     */
    constructor(intents) {
        this.intents = intents
        this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
        this._token = null || "";

        this.ws.on("open", () => {
            console.log(chalk.bold(chalk.green("Hello, i am websocket!")));
        });

        this.ws.on("close", (code, reason) => {
            console.log(chalk.bold(chalk.red(`eem, something error - ${code}:${reason}`)));
        });

        this.ws.on("error", error => {
            console.log(chalk.bold(chalk.red(error)));
        });
    }

    /**
     * 
     * @param {string} token 
     */
    up(token) {
        this._token = token;
        this.ws.on("message", (data) => {
            const payload = JSON.parse(data);
            const {
                op,
                t,
                s,
                d
            } = payload;
            
            switch(op) {
                case 10:
                    this._ident(d.heartbeat_interval);
                    break;
            }
        });
    }

    _ident(interval) {
        setInterval(() => {
            this.ws.send(JSON.stringify({
                op: 1,
                d: null
            }));
        }, interval);

        this.ws.send(JSON.stringify({
            op: 2,
            d: {
                token: this._token,
                intents: this.intents,
                properties: {
                    $os: "huy",
                    $device: "salo",
                    $browser: "Kyiv"
                }
            }
        }));
    }
}

module.exports = BaseBot;