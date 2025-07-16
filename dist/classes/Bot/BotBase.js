"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotBase = void 0;
class BotBase {
    token;
    intents;
    url = "https://discord.com/api/v10/";
    constructor(token, intents) {
        this.token = token;
        this.intents = intents;
    }
}
exports.BotBase = BotBase;
