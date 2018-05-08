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
var Source_1 = require("../events/Source");
var OpenRest_1 = require("./apis/OpenRest");
var LoggedRest_1 = require("./apis/LoggedRest");
var Restfuls = {
    open_rest: OpenRest_1.OpenRest,
    logged_rest: LoggedRest_1.LoggedRest
};
/**
 * Inicia todos os restfulls.
 */
var InitRestful = (function (_super) {
    __extends(InitRestful, _super);
    function InitRestful(router) {
        var _this = _super.call(this) || this;
        _this.restfuls = Restfuls;
        for (var restful in _this.restfuls) {
            if (_this.restfuls.hasOwnProperty(restful)) {
                new _this.restfuls[restful](router);
            }
        }
        process.nextTick(function () {
            _this.hub.send(_this, 'restfuls.ready', { success: null, error: null });
        });
        return _this;
    }
    Object.defineProperty(InitRestful.prototype, "restfuls", {
        get: function () {
            return this._restfuls;
        },
        set: function (restful) {
            this._restfuls = restful;
        },
        enumerable: true,
        configurable: true
    });
    return InitRestful;
}(Source_1.Source));
exports.InitRestful = InitRestful;
