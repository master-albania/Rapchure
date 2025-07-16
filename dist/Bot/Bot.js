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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const ws = __importStar(require("ws"));
const events_1 = require("events");
const Events_1 = require("../events/Events");
const Message_1 = require("../events/Message/Message");
class Bot extends events_1.EventEmitter {
    ws;
    token;
    url = "wss://gateway.discord.gg/?v=10&encoding=json";
    intents;
    heartbeat;
    ping = 0;
    sequence = null;
    lastPingTimestamp = 0;
    constructor(token, intents = 513) {
        super();
        this.token = token;
        this.intents = intents;
        this.ws = new ws.WebSocket(this.url);
        this.ws.on("open", () => {
            console.log("WebSocket connected.");
        });
        this.ws.on("close", (code, reason) => {
            console.log(`WebSocket closed: ${code} - ${reason}`);
            if (this.heartbeat)
                clearInterval(this.heartbeat);
        });
        this.ws.on("error", (err) => console.error("WebSocket error:", err));
    }
    run() {
        this.ws.on("message", (data) => {
            const payload = JSON.parse(data.toString());
            const { t, d, op } = payload;
            switch (op) {
                case 10: {
                    const interval = d.heartbeat_interval;
                    this.heartbeat = setInterval(() => {
                        this.lastPingTimestamp = Date.now();
                        this.ws.send(JSON.stringify({ op: 1, d: null }));
                    }, interval);
                    const identifyPayload = {
                        op: 2,
                        d: {
                            token: this.token,
                            intents: this.intents,
                            properties: {
                                $os: "linux",
                                $browser: "my_bot",
                                $device: "my_bot"
                            }
                        }
                    };
                    this.ws.send(JSON.stringify(identifyPayload));
                    break;
                }
                case 0: {
                    if (!t)
                        return;
                    this.sequence = payload.s ?? this.sequence;
                    if (t === Events_1.Events.MESSAGE_CREATE) {
                        const message = new Message_1.Message(d, this.token);
                        this.emit(Events_1.Events.MESSAGE_CREATE, message);
                    }
                    else {
                        this.emit(t, d);
                    }
                    break;
                }
                case 11: {
                    const now = Date.now();
                    this.ping = now - this.lastPingTimestamp;
                }
            }
        });
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    emit(event, data) {
        return super.emit(event, data);
    }
}
exports.Bot = Bot;
