export class Channel {
    public id: string;
    public name: string;
    public type: number;
    public position: number;
    public topic?: string;
    public nsfw?: boolean;
    public lastMessageID?: string;

    private token: string;
    private url: string;

    constructor(d: any, token: string, url: string) {
        this.id = d.id;
        this.name = d.name;
        this.type = d.type;
        this.position = d.position;
        this.topic = d.topic || undefined;
        this.nsfw = d.nsfw || undefined;
        this.lastMessageID = d.last_message_id || undefined;

        this.token = token;
        this.url = url;
    }

    async sendMessage(content: string) {
        const r = await fetch(`${this.url}/channels/${this.id}/messages`, {
            method: "POST",
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });

        if (!r.ok) {
            throw new Error(`Failed to send message: ${r.statusText}`);
        }
    }   
}