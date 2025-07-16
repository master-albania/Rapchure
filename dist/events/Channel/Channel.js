"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class Channel {
    id;
    token;
    constructor(id, token) {
        this.token = token;
        this.id = id;
    }
    async send(content) {
        const url = `https://discord.com/api/v10/channels/${this.id}/messages`;
        const res = await (0, node_fetch_1.default)(url, {
            method: "POST",
            headers: {
                "Authorization": `Bot ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(`Failed to send message: ${JSON.stringify(error)}`);
        }
        const data = await res.json();
        return data;
    }
}
exports.Channel = Channel;
module.exports = {
    Channel
};
