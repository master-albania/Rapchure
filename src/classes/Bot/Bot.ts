import * as ws from "ws";
import fetch from "node-fetch";
import { BotBase } from "./BotBase";

class Bot extends BotBase {
    public ws: ws.WebSocket;
    
    constructor(token: string, intents: number) {
        super(token, intents);
    }
}