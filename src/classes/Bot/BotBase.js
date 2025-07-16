"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotBase = void 0;
var BotBase = /** @class */ (function () {
    function BotBase(token, intents) {
        this.url = "https://discord.com/api/v10/";
        this.token = token;
        this.intents = intents;
    }
    return BotBase;
}());
exports.BotBase = BotBase;
