import {BasicRest} from "../BasicRest";
import {LoggedHandler} from "../../handlers/LoggedHandler";
import * as httpStatus from "http-status-codes";

export class LoggedRest extends BasicRest{
  protected _handler : LoggedHandler;

  constructor(router) {
    super(router, new LoggedHandler());

    this.routes = {};

    this.wiring();
  }

  set handler(value: LoggedHandler) {
    this._handler = value;
  }

  get handler(): LoggedHandler {
    return this._handler;
  }

  set routes(rotas) {
    this._routes = rotas;
  }

  get routes() {
    return this._routes;
  }

}