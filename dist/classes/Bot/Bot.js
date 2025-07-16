"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const ws = __importStar(require("ws"));
const BotBase_1 = require("./BotBase");
const chalk_1 = __importDefault(require("chalk"));
const Message_1 = require("../Events/Message/Message");
class Bot extends BotBase_1.BotBase {
    ws;
    listeners = {};
    constructor(token, intents) {
        super(token, intents);
        this.ws = new ws.WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
        this.ws.on("open", () => {
            console.log(chalk_1.default.bold(chalk_1.default.green("WebSocket has been started!")));
        });
        this.ws.on("close", (c, r) => {
            console.log(chalk_1.default.bold(chalk_1.default.red(`WebSocket is closed: ${c}`) + chalk_1.default.magenta(` by reason ${r}`)));
        });
        this.ws.on("error", (e) => {
            console.log(chalk_1.default.red(`WebSocket expression: ${e}`));
        });
    }
    connect() {
        this.ws.on("message", (data) => {
            const payload = JSON.parse(data.toString());
            const { t, s, d, op } = payload;
            switch (op) {
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
                    this.emit(t, d);
                    break;
            }
        });
    }
    on(event, listeners) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listeners);
    }
    emit(event, rawData) {
        if (!this.listeners[event])
            return;
        let wrapped;
        switch (event) {
            case "MESSAGE_CREATE":
                wrapped = new Message_1.Message(rawData, this.token, this.url);
        }
        for (const l of this.listeners[event]) {
            l(wrapped);
        }
    }
}
exports.Bot = Bot;
