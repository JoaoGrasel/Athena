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
      'create_scrum': this.create_scrum.bind(this),
      'get_scrum_by_id': this.get_scrum_by_id.bind(this),
      'edit_scrum': this.edit_scrum.bind(this),
      'delete_scrum_by_id': this.delete_scrum_by_id.bind(this),
      'create_sprint': this.create_sprint.bind(this),
      'get_sprint_by_id': this.get_sprint_by_id.bind(this),
      'edit_sprint': this.edit_sprint.bind(this),
      'delete_sprint_by_id': this.delete_sprint_by_id.bind(this),
      'create_history': this.create_history.bind(this),
      'get_history_by_id': this.get_history_by_id.bind(this),
      'edit_history': this.edit_history.bind(this),
      'delete_history_by_id': this.delete_history_by_id.bind(this),
      'create_status': this.create_status.bind(this),
      'get_status_by_id':this.get_status_by_id.bind(this),
      'edit_status': this.edit_status.bind(this),
      'delete_status_by_id': this.delete_status_by_id.bind(this),
      'create_task': this.create_task.bind(this),
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

  // SCRUM CRUD

  async create_scrum(msg) {
    msg.datas = await this.handler.create_scrum(msg.datas);
    this.emit_to_browser(msg);
  }

  async get_scrum_by_id(msg){
    msg.datas = await this.handler.get_scrum_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  async edit_scrum(msg){
    msg.datas = await this.handler.edit_scrum(msg.datas);
    this.emit_to_browser(msg);
  }

  async delete_scrum_by_id(msg){
    msg.datas = await this.handler.delete_scrum_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  // SPRINT CRUD

  async create_sprint(msg){
    msg.datas = await this.handler.create_sprint(msg.datas);
    this.emit_to_browser(msg);
  }

  async get_sprint_by_id(msg){
    msg.datas = await this.handler.get_sprint_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  async edit_sprint(msg){
    msg.datas = await this.handler.edit_sprint(msg.datas);
    this.emit_to_browser(msg);
  }

  async delete_sprint_by_id(msg){
    msg.datas = await this.handler.delete_sprint_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  // HISTORY CRUD

  async create_history(msg){
    msg.datas = await this.handler.create_history(msg.datas);
    this.emit_to_browser(msg);
  }

  async get_history_by_id(msg){
    msg.datas = await this.handler.get_history_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  async edit_history(msg){
    msg.datas = await this.handler.edit_history(msg.datas);
    this.emit_to_browser(msg);
  }

  async delete_history_by_id(msg){
    msg.datas = await this.handler.delete_history_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  //STATUS CRUD

  async create_status(msg){
    msg.datas = await this.handler.create_status(msg.datas);
    this.emit_to_browser(msg);
  }

  async get_status_by_id(msg){
    msg.datas = await this.handler.get_status_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  async edit_status(msg){
    msg.datas = await this.handler.edit_status(msg.datas);
    this.emit_to_browser(msg);
  }

  async delete_status_by_id(msg){
    msg.datas = await this.handler.delete_status_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  //TAREFAS CRUD

  async create_task(msg){
    msg.datas = await this.handler.create_task(msg.datas);
    this.create_task(msg);
  }
}
