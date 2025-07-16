export declare class Message {
    id: string;
    content: string;
    channelID: string;
    private url;
    private token;
    constructor(d: any, token: string, url: string);
    send(content: string): Promise<void>;
}
