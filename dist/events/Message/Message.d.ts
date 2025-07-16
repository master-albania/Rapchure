import { Channel } from "../Channel/Channel";
export declare class Message {
    content: string;
    author: {
        id: string;
        username: string;
        bot?: boolean;
    };
    channel: Channel;
    raw: any;
    constructor(data: any, token: string);
    reply(content: string): Promise<unknown>;
}
