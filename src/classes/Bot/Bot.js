"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
var ws = require("ws");
var BotBase_1 = require("./BotBase");
var chalk_1 = require("chalk");
var Message_1 = require("../Events/Message/Message");
var Bot = /** @class */ (function (_super) {
    __extends(Bot, _super);
    function Bot(token, intents) {
        var _this = _super.call(this, token, intents) || this;
        _this.listeners = {};
        _this.ws = new ws.WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
        _this.ws.on("open", function () {
            console.log(chalk_1.default.bold(chalk_1.default.green("WebSocket has been started!")));
        });
        _this.ws.on("close", function (c, r) {
            console.log(chalk_1.default.bold(chalk_1.default.red("WebSocket is closed: ".concat(c)) + chalk_1.default.magenta(" by reason ".concat(r))));
        });
        _this.ws.on("error", function (e) {
            console.log(chalk_1.default.red("WebSocket expression: ".concat(e)));
        });
        return _this;
    }
    Bot.prototype.connect = function () {
        var _this = this;
        this.ws.on("message", function (data) {
            var payload = JSON.parse(data.toString());
            var t = payload.t, s = payload.s, d = payload.d, op = payload.op;
            switch (op) {
                case 10:
                    var interval = d.heartbeat_interval;
                    setInterval(function () {
                        _this.ws.send(JSON.stringify({ op: 1, d: null }));
                    }, interval);
                    _this.ws.send(JSON.stringify({
                        op: 2,
                        d: {
                            token: _this.token,
                            intents: _this.intents,
                            properties: {
                                $os: "os",
                                $browser: "browser",
                                $device: "machine"
                            }
                        }
                    }));
                    break;
                case 0:
                    _this.emit(t, d);
                    break;
            }
        });
    };
    Bot.prototype.on = function (event, listeners) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listeners);
    };
    Bot.prototype.emit = function (event, rawData) {
        if (!this.listeners[event])
            return;
        var wrapped;
        switch (event) {
            case "MESSAGE_CREATE":
                wrapped = new Message_1.Message(rawData, this.token, this.url);
        }
        for (var _i = 0, _a = this.listeners[event]; _i < _a.length; _i++) {
            var l = _a[_i];
            l(wrapped);
        }
    };
    return Bot;
}(BotBase_1.BotBase));
exports.Bot = Bot;
