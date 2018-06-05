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
      'get_task_by_id': this.get_task_by_id.bind(this),
      'edit_task': this.edit_task.bind(this),
      'delete_task_by_id': this.delete_task_by_id.bind(this),
      'create_team_member': this.create_team_member.bind(this),
      'get_team_member_by_id': this.get_team_member_by_id.bind(this),
      'edit_team_member': this.edit_team_member.bind(this),
      'edit_scrum_team_members': this.edit_scrum_team_members.bind(this),
      'delete_team_member_by_id': this.delete_team_member_by_id.bind(this),
      'add_task_in_sprint': this.add_task_in_sprint.bind(this),
      'add_task_in_history': this.add_task_in_history.bind(this),
      'edit_team_member_scrums': this.edit_team_member_scrums.bind(this),
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
    this.emit_to_browser(msg);
  }

  async get_task_by_id(msg){
    msg.datas = await this.handler.get_task_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  async edit_task(msg){
    msg.datas = await this.handler.edit_task(msg.datas);
    this.emit_to_browser(msg);
  }

  async delete_task_by_id(msg) {
    msg.datas = await this.handler.delete_task_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  async add_task_in_sprint(msg){
    msg.datas = await this.handler.add_task_in_sprint(msg.datas);
    this.emit_to_browser(msg);
  }

  async add_task_in_history(msg){
    msg.datas = await this.handler.add_task_in_history(msg.datas);
    this.emit_to_browser(msg);
  }
    // TEAM MEMBER CRUD

    async create_team_member(msg){
      msg.datas = await this.handler.create_team_member(msg.datas);
      this.emit_to_browser(msg);
    }

    async get_team_member_by_id(msg){
    msg.datas = await this.handler.get_team_member_by_id(msg.datas);
    this.emit_to_browser(msg);
    }

    async edit_team_member(msg){
    msg.datas = await this.handler.edit_team_member(msg.datas);
    this.emit_to_browser(msg);
    }

    async edit_team_member_scrums(msg){
    msg.datas = await this.handler.edit_team_member_scrums(msg.datas);
    this.emit_to_browser(msg);
    }

    async delete_team_member_by_id(msg){
    msg.datas = await this.handler.delete_team_member_by_id(msg.datas);
    this.emit_to_browser(msg);
    }

    async edit_scrum_team_members(msg){
    msg.datas = await this.handler.edit_scrum_team_members(msg.datas);
    this.emit_to_browser(msg);
  }



}
