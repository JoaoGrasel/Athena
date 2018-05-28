import {CommonHandler} from "./CommonHandler";
import {QueryObject} from "./util_handler/QueryObject";
import {UpdateObject} from "./util_handler/UpdateObject";
import {Util} from "../util/Util";
import {Types} from "mongoose";

export class AdminHandler extends CommonHandler {

  //SCRUM CRUD

  public async create_scrum(scrum) {
    let _id = new Types.ObjectId();
    let new_scrum_data = {
      _id: _id,
      project_name: scrum.project_name,
      scrum_description: scrum.scrum_description,
      scrum_status: scrum.scrum_status,
      scrum_beginning_date: scrum.scrum_beginning_date,
      scrum_end_date: scrum.scrum_end_date,
      scrum_team_members: scrum.scrum_team_members,
      scrum_history_backlog: await this.create_history_backlog(_id),
      scrum_sprint_duration: scrum.scrum_sprint_duration,
      scrum_sprints: scrum.scrum_sprints,
      scrum_product_backlog: scrum.scrum_product_backlog
    }

    let devolution = await this.emit_to_server('db.scrum.create', new_scrum_data);
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'create_scrum', devolution.data.error);
      return await this.retorno(devolution.data);
    }

    this.add_scrum_to_team_member(new_scrum_data.scrum_team_members, new_scrum_data._id)

    return this.retorno(devolution.data);
  }

  private async create_history_backlog(scrum_id) {
    let new_history_backlog = {
      histories: [],
      scrum: scrum_id
    }
    let devolution = await this.emit_to_server('db.history_backlog.create', new_history_backlog);
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'create_history_backlog', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return devolution.data.success[0].id;
  }

  public async get_scrum_by_id(scrum_id) {
    let devolution = await this.emit_to_server('db.scrum.read', new QueryObject(scrum_id));
    return this.retorno(devolution.data);
  }

  public async edit_scrum(data) {
    //todo sincronia de quando editar em uma ponta tambem editar em outra (scrums e team members)
    delete data.edited_scrum.history_backlog;
    let devolution = await this.emit_to_server('db.scrum.update', new UpdateObject(data.actual_scrum.id, data.edited_scrum));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrum', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async edit_scrum_team_members(data){
    if(data.edited_scrum_team_members.removed_team_members.length){
      this.remove_team_member_of_scrum(data.edited_scrum_team_members.removed_team_members, data.scrum);
    };
    if(data.edited_scrum_team_members.added_team_members.length){
      this.add_team_member_to_scrum(data.edited_scrum_team_members.added_team_members, data.scrum);
      this.add_scrum_to_team_member(data.edited_scrum_team_members.added_team_members, data.scrum._id);
    };
    return true;
  }



  private async add_scrum_to_team_member(added_team_members, scrum_id){
    let query = {
      _id: {
        $in: added_team_members
      }
    };
    let update = {
      $addToSet: {
        scrums: scrum_id
      }
    };
    let update_team_member_scrums = await this.emit_to_server('db.team_member.update', new UpdateObject(query, update));
    if (update_team_member_scrums.data.error) {
      update_team_member_scrums.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member', update_team_member_scrums.data.error);
      return await this.retorno(update_team_member_scrums.data);
    }
    return this.retorno(update_team_member_scrums.data)
  }

  private async add_team_member_to_scrum(added_team_members, scrum){
    let query = {
      _id: scrum.id
    };
    let update = {
      $addToSet: {
        scrum_team_members: {
          $each: added_team_members
        }
      }
    };
    let update_team_member_scrums = await this.emit_to_server('db.scrum.update', new UpdateObject(query, update));
    if (update_team_member_scrums.data.error) {
      update_team_member_scrums.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrum', update_team_member_scrums.data.error);
      return await this.retorno(update_team_member_scrums.data);
    }
    return this.retorno(update_team_member_scrums.data)
  }

  private async remove_team_member_of_scrum(removed_team_members, scrum){


  }
  // async bind_scrum_to_team_member(edited_team_members, actual_scrum, scrum_id) {
  //   let arraydepromessa = [];
  //   for (let i = 0; i < 100; i++) {
  //     arraydepromessa.push(this.emit_to_server('db.team_member.read', new QueryObject(
  //       scrum_id,
  //       '',
  //       {
  //         path: 'scrum_sprints',
  //         select: 'sprint_name sprint_beginning_date sprint_end_date sprint_tasks sprint_status'
  //       }
  //     )))
  //   }
  //   let rets = await Promise.all(arraydepromessa);
  //   return rets;
  //
  //
  // }

  async delete_scrum_by_id(data) {
    let devolution = await this.emit_to_server('db.scrum.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrum', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }


  // SPRINT CRUD

  async create_sprint(sprint) {
    let new_sprint_data = {
      sprint_name: sprint.sprint_name,
      sprint_beginning_date: sprint.sprint_beginning_date,
      sprint_end_date: sprint.sprint_end_date,
      sprint_tasks: sprint.sprint_tasks,
      sprint_status: sprint.sprint_status
    }

    let devolution = await this.emit_to_server('db.sprint.create', new_sprint_data);
    return this.retorno(devolution.data);
  }

  async get_sprint_by_id(sprint_id) {
    let devolution = await this.emit_to_server('db.sprint.read', new QueryObject(sprint_id));
    return this.retorno(devolution.data);
  }

  async edit_sprint(data) {
    let devolution = await this.emit_to_server('db.sprint.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_sprint', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  async delete_sprint_by_id(data) {
    let devolution = await this.emit_to_server('db.sprint.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_sprint', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  // HISTORY CRUD
  async create_history(history) {
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

  async get_history_by_id(history_id) {
    let devolution = await this.emit_to_server('db.history.read', new QueryObject(history_id));
    return this.retorno(devolution.data);
  }

  async edit_history(data) {
    let devolution = await this.emit_to_server('db.history.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_history', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  async delete_history_by_id(data) {
    let devolution = await this.emit_to_server('db.history.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_history', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  // STATUS CRUD

  async create_status(status) {
    let new_status_data = {
      status_name: status.status_name,
      previous_status: status.previous_status,
      next_status: status.next_status,
      completed: status.completed
    }
    let devolution = await this.emit_to_server('db.status.create', new_status_data);
    return this.retorno(devolution.data);
  }

  async get_status_by_id(status_id) {
    let devolution = await this.emit_to_server('db.status.read', new QueryObject(status_id));
    return this.retorno(devolution.data);
  }

  async edit_status(data) {
    let devolution = await this.emit_to_server('db.status.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_status', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  async delete_status_by_id(data) {
    let devolution = await this.emit_to_server('db.status.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_status', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  //TAREFAS CRUD

  async create_task(task) {
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

  async get_task_by_id(task_id) {
    let devolution = await this.emit_to_server('db.task.read', new QueryObject(task_id));
    return this.retorno(devolution.data);
  }

  async edit_task(data) {
    let devolution = await this.emit_to_server('db.task.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_task', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  async delete_task_by_id(data) {
    let devolution = await this.emit_to_server('db.task.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_task', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  // TEAM MEMBER CRUD

  async create_team_member(team_member) {
    let new_task_data = {
      first_name: team_member.first_name,
      surname: team_member.surname,
      birthdate: team_member.birthdate,
      username: team_member.username,
      email: team_member.email,
      password: team_member.password,
      horary: team_member.horary,
      scrums: team_member.scrums
    }
    let devolution = await this.emit_to_server('db.team_member.create', new_task_data);
    return this.retorno(devolution.data);
  }

  async get_team_member_by_id(team_member_id) {
    let devolution = await this.emit_to_server('db.team_member.read', new QueryObject(team_member_id));
    return this.retorno(devolution.data);
  }

  async edit_team_member(data) {
    let devolution = await this.emit_to_server('db.team_member.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  async delete_team_member_by_id(data) {
    let devolution = await this.emit_to_server('db.team_member.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }
}