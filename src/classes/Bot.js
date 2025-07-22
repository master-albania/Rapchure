const BaseBot = require("../structures/BaseBot");

class Bot extends BaseBot {
    /**
     * 
     * @param {number} intents 
     */
    constructor(intents) {
        super(intents);
    }
}

module.exports = Bot;