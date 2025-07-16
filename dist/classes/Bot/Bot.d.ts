import * as ws from "ws";
import { BotBase } from "./BotBase";
type Listener = (...args: any[]) => void;
export declare class Bot extends BotBase {
    ws: ws.WebSocket;
    private listeners;
    constructor(token: string, intents: number);
    connect(): void;
    on(event: string, listeners: Listener): void;
    private emit;
}
export {};
