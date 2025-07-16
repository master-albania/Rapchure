"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
class EventManager {
    listeners = {};
    on(event, cb) {
        if (!this.listeners[event])
            this.listeners[event] = [];
        this.listeners[event].push(cb);
    }
    emit(event, payload) {
        const cbs = this.listeners[event];
        if (cbs)
            cbs.forEach(cb => cb(payload));
    }
}
exports.EventManager = EventManager;
