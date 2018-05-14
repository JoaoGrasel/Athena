import {BasicRTC} from '../BasicRTC';
import {TeamMemberHandler} from '../../handlers/TeamMemberHandler';
import {OpenRTC} from '../OpenRTC';

export class TeamMemberRTC extends BasicRTC {
  private _loggedUser;

  /**
   * Recebe o socketId passado pelo client.
   *
   * @param conf
   */
  constructor(conf, msg, openRTC) {
    super('team_member', new TeamMemberHandler(), conf);
    openRTC.destroy();
    this.interfaceListeners = {
       'logout': this.logout.bind(this),
       'update_horary': this.update_horary.bind(this),
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

  set handler(handler: TeamMemberHandler) {
    this._handler = handler;
  }

  get handler(): TeamMemberHandler {
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

  async update_horary(msg) {
    msg.datas = await this.handler.update_horary(msg.datas, this.loggedUser);
    this.emit_to_browser(msg);
  }

}
