"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    id;
    content;
    channelID;
    url;
    token;
    constructor(d, token, url) {
        this.id = d.id;
        this.content = d.content;
        this.channelID = d.channel_id;
        this.token = token;
        this.url = url;
    }
    async send(content) {
        await fetch(`${this.url}/channels/${this.channelID}/messages`, {
            method: "POST",
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
    }
}
exports.Message = Message;
