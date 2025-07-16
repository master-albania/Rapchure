"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEventEmitter = void 0;
const events_1 = require("events");
class BaseEventEmitter extends events_1.EventEmitter {
    constructor() {
        super();
    }
}
exports.BaseEventEmitter = BaseEventEmitter;
module.exports = {
    BaseEventEmitter
};
