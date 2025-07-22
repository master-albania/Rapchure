const api = require("../Api/ApiManager");
const Author = require('./Author');

class Message {
    #token;
    #url;
    constructor(d, token, url) {
        this.#token = token;
        this.#url = url;

        this.type = d.type;
        this.tts = d.tts;
        this.timestamp = d.timestamp;
        this.pinned = d.pinned;
        this.nonce = d.nonce;
        this.mentions = d.mentions;
        this.mentionRoles = d.mention_roles;
        this.mentionEveryone = d.mention_everyone;
        this.author = new Author(d.author);
        this.member = {
            roles: d.member.roles,
            premiumSince: d.member.premium_since,
            pending: d.member.pending,
            nick: d.member.nick,
            mute: d.member.mute,
            joinedAt: d.member.joined_at,
            flags: d.member.flags,
            deaf: d.member.deaf,
            communicationDisabledUntil: d.member.communication_disabled_until,
            banner: d.member.banner,
            avatar: d.member.avatar
        };
        this.id = d.id;
        this.flags = d.flags;
        this.embeds = d.embeds;
        this.editedTimestamp = d.edited_timestamp;
        this.content = d.content;
        this.components = d.components
        this.channel_type = d.channel_type;
        this.channelID = d.channel_id;
    }

    sendMessage(content, tts = false) {
        api(`${this.#url}/channels/${this.channelID}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${this.#token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content,
                tts
            })
        })
            .catch(console.log);
    }
}

module.exports = Message;