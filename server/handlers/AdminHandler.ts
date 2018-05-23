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
  async create_history(history){
    let new_history_data = {
      history_theme: history.history_theme,
      history_like_one: history.history_like_one,
      history_want_can: history.history_want_can,
      history_need_to_do: history.history_need_to_do,
      history_tasks: history.history_tasks
    }

    let devolution = await this.emit_to_server('db.history.create', new_history_data);
    return this.retorno(devolution.data);
  }

  async get_history_by_id(historyId){
    let devolution = await this.emit_to_server('db.history.read', new QueryObject(historyId));
    return this.retorno(devolution.data);
  }

  async edit_history(data){
    let devolution = await this.emit_to_server('db.history.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_history', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  async delete_history_by_id(data){
    let devolution = await this.emit_to_server('db.history.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_history', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  // STATUS CRUD

  async create_status(status){
    let new_status_data = {
    status_name: status.status_name,
    previous_status: status.previous_status,
    next_status: status.next_status,
    completed: status.completed
    }
    let devolution = await this.emit_to_server('db.status.create', new_status_data);
    return this.retorno(devolution.data);
  }

  async get_status_by_id(statusId){
    let devolution = await this.emit_to_server('db.status.read', new QueryObject(statusId));
    return this.retorno(devolution.data);
  }

  async edit_status(data){
    let devolution = await this.emit_to_server('db.status.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_status', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  async delete_status_by_id(data){
    let devolution = await this.emit_to_server('db.status.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_status', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  //TAREFAS CRUD

  async create_task(task){
    let new_task_data = {
      task_name: task.task_name,
      task_status: task.task_status,
      task_artefact: task.task_artefact,
      task_description: task.task_description,
      task_responsibles: task.task_responsibles,
      needed_tasks: task.needed_tasks,
      task_beginning_date: task.task_beginning_date,
      task_end_date: task.task_end_date,
      completed: task.completed,
    }
    let devolution = await this.emit_to_server('db.task.create', new_task_data);
    return this.retorno(devolution.data);
  }
}