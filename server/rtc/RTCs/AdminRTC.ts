import {BasicRTC} from '../BasicRTC';
import {AdminHandler} from '../../handlers/AdminHandler';
import {OpenRTC} from '../OpenRTC';

export class AdminRTC extends BasicRTC {
  private _loggedUser;

  /**
   * Recebe o socketId passado pelo client.
   *
   * @param conf
   */
  constructor(conf, msg, openRTC) {
    super('admin', new AdminHandler(), conf);
    openRTC.destroy();
    this.interfaceListeners = {
      'logout': this.logout.bind(this),
    };
    this.loggedUser = msg.datas.data;
    this.emit_to_browser(msg);
    this.wiring();
  }

  set loggedUser(loggedUser){
    this._loggedUser = loggedUser;
  }

  get loggedUser(){
    return this._loggedUser;
  }

  set handler(handler: AdminHandler) {
    this._handler = handler;
  }

  get handler(): AdminHandler {
    return this._handler;
  }

  set interfaceListeners(interfaceListeners: object) {
    this._interfaceListeners = interfaceListeners;
  }

  get interfaceListeners(): object {
    return this._interfaceListeners;
  }

  async logout(msg) {
    msg.datas = await this.handler.logout();
    new OpenRTC(this.config);
    this.emit_to_browser(msg);
    this.destroy();
  }
}
