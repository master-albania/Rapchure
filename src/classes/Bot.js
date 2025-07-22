const BaseBot = require("../structures/Bot/BaseBot");

class Bot extends BaseBot {
    /**
     * @class
     * @extends BaseBot
     * @example
     * * const bot = new Bot(1234);
     * * bot.on("ready", (user) => { ... });
     * @param {number} intents 
     */
    constructor(intents) {
        super(intents);
    }
}

module.exports = Bot;