"use strict";
exports.__esModule = true;
var BasicRest = (function () {
    function BasicRest(router, handler) {
        this.handler = handler;
        this.router = router;
    }
    Object.defineProperty(BasicRest.prototype, "router", {
        get: function () {
            return this._router;
        },
        set: function (router) {
            if (!router) {
                throw new Error('Toda api deve conter o router');
            }
            this._router = router;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Responsavel por ligar as requisicoes get.
     *
     * @param rotas
     */
    BasicRest.prototype.wiringget = function (rotas) {
        for (var name_1 in rotas) {
            if (rotas.hasOwnProperty(name_1)) {
                this.router.route(name_1).get(rotas[name_1]);
            }
        }
    };
    /**
     * Responsavel por ligar as requisicoes post.
     *
     * @param rotas
     */
    BasicRest.prototype.wiringpost = function (rotas) {
        for (var name_2 in rotas) {
            if (rotas.hasOwnProperty(name_2)) {
                this.router.route(name_2).post(rotas[name_2]);
            }
        }
    };
    /**
     * Responsavel por ligar as requisicoes put.
     *
     * @param rotas
     */
    BasicRest.prototype.wiringput = function (rotas) {
        for (var name_3 in rotas) {
            if (rotas.hasOwnProperty(name_3)) {
                this.router.route(name_3).put(rotas[name_3]);
            }
        }
    };
    /**
     * Responsavel por ligar as requisicoes delete.
     *
     * @param rotas
     */
    BasicRest.prototype.wiringdelete = function (rotas) {
        for (var name_4 in rotas) {
            if (rotas.hasOwnProperty(name_4)) {
                this.router.route(name_4)["delete"](rotas[name_4]);
            }
        }
    };
    /**
     * Liga as rotas as funções, simulando o evento.
     */
    BasicRest.prototype.wiring = function () {
        for (var name_5 in this.routes) {
            if (this.routes.hasOwnProperty(name_5) && this.routes[name_5]) {
                var method = 'wiring' + name_5;
                this[method](this.routes[name_5]);
            }
        }
    };
    return BasicRest;
}());
exports.BasicRest = BasicRest;
