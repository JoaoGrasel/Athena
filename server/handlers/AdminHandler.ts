import {CommonHandler} from "./CommonHandler";
import {QueryObject} from "./util_handler/QueryObject";
import {UpdateObject} from "./util_handler/UpdateObject";
import {Util} from "../util/Util";

export class AdminHandler extends CommonHandler {

  //SCRUM CRUD

  async create_scrum(scrum) {
    let new_scrum_data = {
      project_name: scrum.project_name,
      scrum_description: scrum.scrum_description,
      scrum_status: scrum.scrum_status,
      scrum_beginning_date: scrum.scrum_beginning_date,
      scrum_end_date: scrum.scrum_end_date,
      scrum_team_members: scrum.scrum_team_members,
      scrum_history_backlog: scrum.scrum_history_backlog,
      scrum_sprint_duration: scrum.scrum_sprint_duration,
      scrum_sprints:scrum.scrum_sprints,
      scrum_product_backlog: scrum.scrum_product_backlog
    }

    let devolution = await this.emit_to_server('db.scrum.create', new_scrum_data);
      return this.retorno(devolution.data);
  }

  async get_scrum_by_id(scrumId){
    let devolution = await this.emit_to_server('db.scrum.read', new QueryObject(scrumId));
    return this.retorno(devolution.data);
  }

  async edit_scrum(data){
    //todo sincronia de quando editar em uma ponta tambem editar em outra (scrums e team members)
    delete data.scrum_team_members;
    let devolution = await this.emit_to_server('db.scrum.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrum', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  //todo sincronia de quando editar em uma ponta tambem editar em outra (scrums e team members)
  // bind_team_members_to_scrum(teamMembers, scrumId){
  //   teamMembers._data.success.scrum_team_members.forEach(teamMember=>{
  //     teamMembers._data.success.scrum_team_members.scrums.forEach(scrum=>{
  // }

  async delete_scrum_by_id(data){
    let devolution = await this.emit_to_server('db.scrum.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrum', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }


  // SPRINT CRUD

  async create_sprint(sprint){
    let new_sprint_data = {
      sprint_name: sprint.sprint_name,
      sprint_beginning_date:sprint.sprint_beginning_date,
      sprint_end_date:sprint.sprint_end_date,
      sprint_tasks:sprint.sprint_tasks,
      sprint_status: sprint.sprint_status
    }

    let devolution = await this.emit_to_server('db.sprint.create', new_sprint_data);
    return this.retorno(devolution.data);
  }

  async get_sprint_by_id(sprintId){
    let devolution = await this.emit_to_server('db.sprint.read', new QueryObject(sprintId));
    return this.retorno(devolution.data);
  }

  async edit_sprint(data){
    let devolution = await this.emit_to_server('db.sprint.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_sprint', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  async delete_sprint_by_id(data){
    let devolution = await this.emit_to_server('db.sprint.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_sprint', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  // HISTORY CRUD
  async create_history(data){

  }


}