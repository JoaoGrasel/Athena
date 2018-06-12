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
        'add_day_answers': this.add_day_answers.bind(this),

        'show_horaries': this.show_horaries.bind(this),
        'find_horary_by_year_and_month': this.find_horary_by_year_and_month.bind(this),
        'show_questions_by_horary_id': this.show_questions_by_horary_id.bind(this),
        'show_scrums': this.show_scrums.bind(this),
        'show_sprints_by_scrum': this.show_sprints_by_scrum.bind(this),
        'show_histories_by_scrum': this.show_histories_by_scrum.bind(this),
        'show_tasks_by_sprint': this.show_tasks_by_sprint.bind(this)
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

  async add_day_answers(msg) {
    msg.datas = await this.handler.add_day_answers(msg.datas, this._loggedUser);
    this.emit_to_browser(msg);
  }

  async show_horaries(msg) {
    msg.datas = await this.handler.show_horaries(this.loggedUser.horary.id);
    this.emit_to_browser(msg);
  }

  async find_horary_by_year_and_month(msg){
    msg.datas = await this.handler.find_horary_by_year_and_month(msg.datas, this.loggedUser.id);
    this.emit_to_browser(msg);
  }

  async show_questions_by_horary_id(msg){
    msg.datas = await this.handler.show_questions_by_horary_id(msg.datas);
    this.emit_to_browser(msg);
  }

  async show_scrums(msg){
    msg.datas = await this.handler.show_scrums(this.loggedUser);
    this.emit_to_browser(msg);
  }

  async show_sprints_by_scrum(msg){
    msg.datas = await this.handler.show_sprints_by_scrum(msg.datas);
    this.emit_to_browser(msg);
  }

  async show_histories_by_scrum(msg){
    msg.datas = await this.handler.show_histories_by_scrum(msg.datas);
    this.emit_to_browser(msg);
  }

  async show_tasks_by_sprint(msg){
    msg.datas = await this.handler.show_tasks_by_sprint(msg.datas);
    this.emit_to_browser(msg);
  }
}
