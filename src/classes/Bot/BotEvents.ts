import { Events } from "../Events/Events";
import { Message } from "../Events/Message";
import { User } from "../Events/User";

export interface BotEvents { 
    [Events.Ready]: { user: User };
    [Events.MessageCreate]: Message;
}