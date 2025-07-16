import { EventPayload } from "./Events";
type Callback<T> = (payload: T) => void;
export declare class EventManager {
    private listeners;
    on<K extends keyof EventPayload>(event: K, cb: Callback<EventPayload[K]>): void;
    emit<K extends keyof EventPayload>(event: K, payload: [K]): void;
}
export {};
