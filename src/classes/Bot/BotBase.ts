import { IBot } from "./IBot";

export class BotBase implements IBot {
    public token: string;
    public intents: number;

    protected url = "https://discord.com/api/v10/";
    constructor(token: string, intents: number) {
        this.token = token;
        this.intents = intents;
    }
}