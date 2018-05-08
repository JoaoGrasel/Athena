import {BasicRest} from "../BasicRest";
import {OpenHandler} from "../../handlers/OpenHandler";
import * as HTTPStatus from "http-status-codes";

export class OpenRest extends BasicRest {
  protected _handler: OpenHandler;

  constructor(router) {
    super(router, new OpenHandler());

    this.routes = {
      post:{},
    };

    this.wiring();
  }

  set handler(value: OpenHandler) {
    this._handler = value;
  }

  get handler(): OpenHandler {
    return this._handler;
  }

  set routes(rotas) {
    this._routes = rotas;
  }

  get routes() {
    return this._routes;
  }


}