"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var BasicRest_1 = require("../BasicRest");
var OpenHandler_1 = require("../../handlers/OpenHandler");
var OpenRest = (function (_super) {
    __extends(OpenRest, _super);
    function OpenRest(router) {
        var _this = _super.call(this, router, new OpenHandler_1.OpenHandler()) || this;
        _this.routes = {
            post: {}
        };
        _this.wiring();
        return _this;
    }
    Object.defineProperty(OpenRest.prototype, "handler", {
        get: function () {
            return this._handler;
        },
        set: function (value) {
            this._handler = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpenRest.prototype, "routes", {
        get: function () {
            return this._routes;
        },
        set: function (rotas) {
            this._routes = rotas;
        },
        enumerable: true,
        configurable: true
    });
    return OpenRest;
}(BasicRest_1.BasicRest));
exports.OpenRest = OpenRest;
