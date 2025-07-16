"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const Channel_1 = require("../Channel/Channel");
class Message {
    content;
    author;
    channel;
    raw;
    constructor(data, token) {
        this.content = data.content;
        this.author = {
            id: data.author.id,
            username: data.author.username,
            bot: data.author.bot,
        };
        this.channel = new Channel_1.Channel(data.channel_id, token);
        this.raw = data;
    }
    async reply(content) {
        return this.channel.send(content);
    }
}
exports.Message = Message;
module.exports = {
    Message
};
