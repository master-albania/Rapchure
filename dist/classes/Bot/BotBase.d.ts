import { IBot } from "./IBot";
export declare class BotBase implements IBot {
    token: string;
    intents: number;
    protected url: string;
    constructor(token: string, intents: number);
}
