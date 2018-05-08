import {BasicHandler} from "./BasicHandler";
import {Util} from '../util/Util';

export class OpenHandler extends BasicHandler {

  async logar(dados_login: object) {
    let ret = await this.emit_to_server('db.user.login', dados_login);
    if (ret.data.error) {
      ret.data.error = await Util.getErrorByLocale('pt-Br', 'login', ret.data.error);
      return await this.retorno(ret.data);
    }
    return this.retorno(ret.data);
  }

}