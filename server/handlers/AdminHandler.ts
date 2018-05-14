import {CommonHandler} from "./CommonHandler";

export class AdminHandler extends CommonHandler {

  async teste(msg) {
    return this.retorno(msg);
  }

}