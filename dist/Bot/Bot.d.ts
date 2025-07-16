import { EventEmitter } from "events";
import { Events } from '../events/Events';
import { Message } from "../events/Message/Message";
type DiscordEventMap = {
    [Events.READY]: any;
    [Events.MESSAGE_CREATE]: Message;
};
export declare class Bot extends EventEmitter {
    private ws;
    private token;
    private url;
    private intents;
    private heartbeat?;
    ping: number;
    private sequence;
    private lastPingTimestamp;
    constructor(token: string, intents?: number);
    run(): void;
    on<K extends keyof DiscordEventMap>(event: K, listener: (data: DiscordEventMap[K]) => void): this;
    emit<K extends keyof DiscordEventMap>(event: K, data: DiscordEventMap[K]): boolean;
}
export {};
