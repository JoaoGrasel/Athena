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
      'add_team_member_in_task': this.add_team_member_in_task.bind(this),
      'edit_task': this.edit_task.bind(this),
      'edit_task_status': this.edit_task_status.bind(this),
      'edit_needed_tasks': this.edit_needed_tasks.bind(this),
      'complete_task': this.complete_task.bind(this),
      'delete_task_by_id': this.delete_task_by_id.bind(this),
      'increase_worked_minutes': this.increase_worked_minutes.bind(this),
      'decrease_worked_minutes': this.decrease_worked_minutes.bind(this),
      'get_justifications_by_team_member_id': this.get_justifications_by_team_member_id.bind(this),
      'create_team_member': this.create_team_member.bind(this),
      'get_team_member_by_id': this.get_team_member_by_id.bind(this),
      'get_timetable_by_team_member_id': this.get_timetable_by_team_member_id.bind(this),
      'get_questions_by_team_member_id': this.get_questions_by_team_member_id.bind(this),
      'edit_team_member': this.edit_team_member.bind(this),
      'edit_scrum_team_members': this.edit_scrum_team_members.bind(this),
      'delete_team_member_by_id': this.delete_team_member_by_id.bind(this),
      'add_task_in_sprint': this.add_task_in_sprint.bind(this),
      'add_task_in_history': this.add_task_in_history.bind(this),
      'edit_team_member_scrums': this.edit_team_member_scrums.bind(this),
      'create_admin': this.create_admin.bind(this),
      'get_admin_by_id': this.get_admin_by_id.bind(this),
      'edit_admin': this.edit_admin.bind(this),
      'edit_admin_scrums': this.edit_admin_scrums.bind(this),
      'delete_admin_by_id': this.delete_admin_by_id.bind(this),
    };
    this.loggedUser = msg.datas.data;
    this.emit_to_browser(msg);
    this.wiring();
  }

  public set loggedUser(loggedUser){
    this._loggedUser = loggedUser;
  }

  public get loggedUser(){
    return this._loggedUser;
  }

  public set handler(handler: AdminHandler) {
    this._handler = handler;
  }

  public get handler(): AdminHandler {
    return this._handler;
  }

  public set interfaceListeners(interfaceListeners: object) {
    this._interfaceListeners = interfaceListeners;
  }

  public get interfaceListeners(): object {
    return this._interfaceListeners;
  }

  public async logout(msg) {
    msg.datas = await this.handler.logout();
    new OpenRTC(this.config);
    this.emit_to_browser(msg);
    this.destroy();
  }

  // SCRUM CRUD

  public async create_scrum(msg) {
    msg.datas = await this.handler.create_scrum(msg.datas);
    this.emit_to_browser(msg);
  }

  public async get_scrum_by_id(msg){
    msg.datas = await this.handler.get_scrum_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  public async edit_scrum(msg){
    msg.datas = await this.handler.edit_scrum(msg.datas);
    this.emit_to_browser(msg);
  }

  public async delete_scrum_by_id(msg){
    msg.datas = await this.handler.delete_scrum_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  // SPRINT CRUD

  public async create_sprint(msg){
    msg.datas = await this.handler.create_sprint(msg.datas);
    this.emit_to_browser(msg);
  }

  public async get_sprint_by_id(msg){
    msg.datas = await this.handler.get_sprint_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  public async edit_sprint(msg){
    msg.datas = await this.handler.edit_sprint(msg.datas);
    this.emit_to_browser(msg);
  }

  public async delete_sprint_by_id(msg){
    msg.datas = await this.handler.delete_sprint_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  // HISTORY CRUD

  public async create_history(msg){
    msg.datas = await this.handler.create_history(msg.datas);
    this.emit_to_browser(msg);
  }

  public async get_history_by_id(msg){
    msg.datas = await this.handler.get_history_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  public async edit_history(msg){
    msg.datas = await this.handler.edit_history(msg.datas);
    this.emit_to_browser(msg);
  }

  public async delete_history_by_id(msg){
    msg.datas = await this.handler.delete_history_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  //STATUS CRUD

  public async create_status(msg){
    msg.datas = await this.handler.create_status(msg.datas);
    this.emit_to_browser(msg);
  }

  public async get_status_by_id(msg){
    msg.datas = await this.handler.get_status_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  public async edit_status(msg){
    msg.datas = await this.handler.edit_status(msg.datas);
    this.emit_to_browser(msg);
  }

  public async delete_status_by_id(msg){
    msg.datas = await this.handler.delete_status_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  //TAREFAS CRUD

  public async create_task(msg){
    msg.datas = await this.handler.create_task(msg.datas);
    this.emit_to_browser(msg);
  }

  public async get_task_by_id(msg){
    msg.datas = await this.handler.get_task_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  public async edit_task(msg){
    msg.datas = await this.handler.edit_task(msg.datas);
    this.emit_to_browser(msg);
  }

  public async edit_task_status(msg){
    msg.datas = await this.handler.edit_task_status(msg.datas);
    this.emit_to_browser(msg);
  }

  public async edit_needed_tasks(msg){
    msg.datas = await this.handler.edit_needed_tasks(msg.datas);
    this.emit_to_browser(msg);
  }

  public async complete_task(msg){
    msg.datas = await this.handler.complete_task(msg.datas);
    this.emit_to_browser(msg);
  }


  public async add_team_member_in_task(msg){
    msg.datas = await this.handler.add_team_member_in_task(msg.datas);
    this.emit_to_browser(msg);
  }

  public async delete_task_by_id(msg) {
    msg.datas = await this.handler.delete_task_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  public async add_task_in_sprint(msg){
    msg.datas = await this.handler.add_task_in_sprint(msg.datas);
    this.emit_to_browser(msg);
  }

  public async add_task_in_history(msg){
    msg.datas = await this.handler.add_task_in_history(msg.datas);
    this.emit_to_browser(msg);
  }

  // JUSTIFICATION CRUD

  public async increase_worked_minutes(msg){
    msg.datas = await this.handler.increase_worked_minutes(msg.datas, this.loggedUser);
    this.emit_to_browser(msg);
  }

  public async decrease_worked_minutes(msg){
    msg.datas = await this.handler.decrease_worked_minutes(msg.datas, this.loggedUser);
    this.emit_to_browser(msg);
  }
  public async get_justifications_by_team_member_id(msg){
    msg.datas = await this.handler.get_justifications_by_team_member_id(msg.datas, this.loggedUser);
    this.emit_to_browser(msg);
  }


    // TEAM MEMBER CRUD

  public async create_team_member(msg){
    msg.datas = await this.handler.create_team_member(msg.datas);
    this.emit_to_browser(msg);
  }

  public async get_team_member_by_id(msg){
    msg.datas = await this.handler.get_team_member_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  public  async get_timetable_by_team_member_id(msg){
    msg.datas = await this.handler.get_timetable_by_team_member_id(msg.datas);
    this.emit_to_browser(msg);
  }

  public  async get_questions_by_team_member_id(msg){
    msg.datas = await this.handler.get_questions_by_team_member_id(msg.datas);
    this.emit_to_browser(msg);
  }

  public async edit_team_member(msg){
    msg.datas = await this.handler.edit_team_member(msg.datas);
    this.emit_to_browser(msg);
  }

  public async edit_team_member_scrums(msg){
    msg.datas = await this.handler.edit_team_member_scrums(msg.datas);
    this.emit_to_browser(msg);
  }

  public async delete_team_member_by_id(msg){
    msg.datas = await this.handler.delete_team_member_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  public async edit_scrum_team_members(msg){
    msg.datas = await this.handler.edit_scrum_team_members(msg.datas);
    this.emit_to_browser(msg);
  }

  // ADMIN CRUD

  public async create_admin(msg){
    msg.datas = await this.handler.create_admin(msg.datas);
    this.emit_to_browser(msg);
  }

  public async get_admin_by_id(msg){
    msg.datas = await this.handler.get_admin_by_id(msg.datas);
    this.emit_to_browser(msg);
  }

  public async edit_admin(msg){
    msg.datas = await this.handler.edit_admin(msg.datas);
    this.emit_to_browser(msg);
  }

  public async edit_admin_scrums(msg){
    msg.datas = await this.handler.edit_admin_scrums(msg.datas);
    this.emit_to_browser(msg);
  }

  public async delete_admin_by_id(msg){
    msg.datas = await this.handler.delete_admin_by_id(msg.datas);
    this.emit_to_browser(msg);
  }
}
