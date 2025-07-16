export declare class Channel {
    id: string;
    token: string;
    constructor(id: string, token: string);
    send(content: string): Promise<unknown>;
}
