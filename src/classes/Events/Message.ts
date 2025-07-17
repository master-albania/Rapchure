import { Channel } from "./Channel";
import { User } from "./User";

export class Message {
    public id: string;
    public content: string;
    public author: User;
    public tts: boolean;
    public channel: Channel;
    private url: string;
    private token: string;
    constructor(d: any, token: string, url: string) {
        this.id = d.id;
        this.content = d.content;
        this.channel = new Channel(d.channel, token, url);
        this.author = new User(d.author, token, url);
        this.tts = d.tts || false;

        this.token = token;
        this.url = url;    
    }

 async reply(content: string): Promise<void> {
    const endpoint = `${this.url}/channels/${this.channel.id}/messages`;

    const body = {
        content: content,
        message_reference: {
            message_id: this.id
        }
    };

    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Authorization": `Bot ${this.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const error = await res.text();
        console.error("Failed to send reply:", error);
        throw new Error(`HTTP ${res.status}: ${error}`);
    }
}

}