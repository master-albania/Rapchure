const BaseBot = require("./BaseBot")
class Bot extends BaseBot {
    constructor(intents) {
        super(intents);
        this.intents = intents;
    }
}

module.exports = Bot;