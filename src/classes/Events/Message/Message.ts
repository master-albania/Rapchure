export class Message {
    public id: string;
    public content: string;
    public channelID: string;
    private url: string;
    private token: string;
    constructor(d: any, token: string, url: string) {
        this.id = d.id;
        this.content = d.content;
        this.channelID = d.channel_id;

        this.token = token;
        this.url = url;    
    }

    async send(content: string) {
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