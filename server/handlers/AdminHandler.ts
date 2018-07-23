import {CommonHandler} from "./CommonHandler";
import {QueryObject} from "./util_handler/QueryObject";
import {UpdateObject} from "./util_handler/UpdateObject";
import {Util} from "../util/Util";
import {Types} from "mongoose";

export class AdminHandler extends CommonHandler {


  public async get_all_users(){
    let devolution = await this.emit_to_server('db.user.read', new QueryObject({}, "first_name surname " +
      "role birthdate username removed scrums", {
      path:'scrums',
      select: 'project_name'
    } ) );
    return this.retorno(devolution.data);
  }

  public async create_user(data){
    if(data.checkbox){
      return this.create_admin(data);
    } else {
      return this.create_team_member(data);
    }
  }

  public async delete_user_by_id(data) {
    let update = {
      removed: true
    };
    let devolution = await this.emit_to_server('db.user.update', new UpdateObject(data.id, update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_user', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

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

    this.add_scrum_to_team_members(new_scrum_data.scrum_team_members, new_scrum_data)

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
    delete data.edited_scrum.history_backlog;
    let devolution = await this.emit_to_server('db.scrum.update', new UpdateObject(data.actual_scrum.id, data.edited_scrum));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrum', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async edit_scrum_team_members(data) {
    if (data.edited_scrum_team_members.added_team_members.length) {
      await this.add_team_members_to_scrum(data.edited_scrum_team_members.added_team_members, data.scrum);
      await this.add_scrum_to_team_members(data.edited_scrum_team_members.added_team_members, data.scrum);
    }
    ;
    if (data.edited_scrum_team_members.removed_team_members.length) {
      await this.remove_team_members_of_scrum(data.edited_scrum_team_members.removed_team_members, data.scrum);
      await this.remove_scrum_of_team_members(data.edited_scrum_team_members.removed_team_members, data.scrum);
    }
    ;

    return true;
  }

  private async add_scrum_to_team_members(added_team_members, scrum) {
    let query = {
      _id: {
        $in: added_team_members
      }
    };
    let update = {
      $addToSet: {
        scrums: scrum.id
      }
    };
    let update_team_member_scrums = await this.emit_to_server('db.team_member.update', new UpdateObject(query, update));
    if (update_team_member_scrums.data.error) {
      update_team_member_scrums.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member', update_team_member_scrums.data.error);
      return await this.retorno(update_team_member_scrums.data);
    }
    return this.retorno(update_team_member_scrums.data)
  }

  private async add_team_members_to_scrum(added_team_members, scrum) {
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

  private async remove_team_members_of_scrum(removed_team_members, scrum) {
    let query = {
      _id: scrum.id
    };
    let update = {
      $pull: {
        scrum_team_members: {
          $in: removed_team_members
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

  private async remove_scrum_of_team_members(removed_team_members, scrum) {
    let query = {
      _id: {
        $in: removed_team_members
      }
    };
    let update = {
      $pull: {
        scrums: scrum.id
      }
    };
    let update_team_member_scrums = await this.emit_to_server('db.team_member.update', new UpdateObject(query, update));
    if (update_team_member_scrums.data.error) {
      update_team_member_scrums.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member', update_team_member_scrums.data.error);
      return await this.retorno(update_team_member_scrums.data);
    }
    return this.retorno(update_team_member_scrums.data)
  }

  public async delete_scrum_by_id(data) {
    let devolution = await this.emit_to_server('db.scrum.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrum', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }


  // SPRINT CRUD

  public async create_sprint(sprint) {
    let _id = new Types.ObjectId();
    let new_sprint_data = {
      _id: _id,
      sprint_name: sprint.sprint_name,
      scrum: sprint.scrum,
      sprint_beginning_date: sprint.sprint_beginning_date,
      sprint_end_date: sprint.sprint_end_date,
      sprint_tasks: sprint.sprint_tasks,
      sprint_status: sprint.sprint_status
    }
    let devolution = await this.emit_to_server('db.sprint.create', new_sprint_data);
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'create_sprint', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    await this.add_sprint_to_scrum(new_sprint_data._id, new_sprint_data.scrum);
    return this.retorno(devolution.data);
  }

  private async add_sprint_to_scrum(sprint_id, scrum_id) {
    let query = {
      _id: scrum_id,
    };
    let update = {
      $addToSet: {
        scrum_sprints: sprint_id,
      }
    };
    let update_scrum = await this.emit_to_server('db.scrum.update', new UpdateObject(query, update));
    if (update_scrum.data.error) {
      update_scrum.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrum', update_scrum.data.error);
      return await this.retorno(update_scrum.data);
    }
    return this.retorno(update_scrum.data)
  }

  public async get_sprint_by_id(sprint_id) {
    let devolution = await this.emit_to_server('db.sprint.read', new QueryObject(sprint_id));
    return this.retorno(devolution.data);
  }

  public async edit_sprint(data) {
    delete data.scrum;
    let devolution = await this.emit_to_server('db.sprint.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_sprint', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async delete_sprint_by_id(data) {
    let devolution = await this.emit_to_server('db.sprint.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_sprint', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }


  // HISTORY CRUD
  public async create_history(history) {
    let _id = new Types.ObjectId();
    let new_history_data = {
      _id: _id,
      history_theme: history.history_theme,
      history_like_one: history.history_like_one,
      history_want_can: history.history_want_can,
      history_need_to_do: history.history_need_to_do,
      history_tasks: history.history_tasks,
      history_backlog: history.history_backlog,
    }

    let devolution = await this.emit_to_server('db.history.create', new_history_data);
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'create_history', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    await this.add_history_to_history_backlog(new_history_data._id, new_history_data.history_backlog);
    return this.retorno(devolution.data);
  }

  private async add_history_to_history_backlog(history_id, history_backlog_id) {
    let query = {
      _id: history_backlog_id,
    };
    let update = {
      $addToSet: {
        histories: history_id,
      }
    };
    let update_history_backlog = await this.emit_to_server('db.history_backlog.update', new UpdateObject(query, update));
    if (update_history_backlog.data.error) {
      update_history_backlog.data.error = await Util.getErrorByLocale('pt-Br', 'update_history_backlog', update_history_backlog.data.error);
      return await this.retorno(update_history_backlog.data);
    }
    return this.retorno(update_history_backlog.data)
  }

  public async get_history_by_id(history_id) {
    let devolution = await this.emit_to_server('db.history.read', new QueryObject(history_id));
    return this.retorno(devolution.data);
  }

  public async edit_history(data) {
    delete data.history_backlog;
    let devolution = await this.emit_to_server('db.history.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_history', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async delete_history_by_id(data) {
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

  public async create_task(task) {
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
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'create_task', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async get_task_by_id(task_id) {
    let devolution = await this.emit_to_server('db.task.read', new QueryObject(task_id));
    return this.retorno(devolution.data);
  }

  public async edit_task(data) {
    delete data.update.task_status;
    delete data.update.needed_tasks;
    delete data.update.completed;
    let devolution = await this.emit_to_server('db.task.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_task', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async edit_task_status(data) {
    let status = await this.get_status_by_id(data.edited_status.task_status);
    let update;
    if(status.data.completed){
      let new_end_date = new Date();
      update = {
        task_end_date: new_end_date,
        task_status: status.data.id
      }
    } else {
      update = {
        task_status: status.data.id
      }
    }

    let devolution = await this.emit_to_server('db.task.update', new UpdateObject(data.id, update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_task_status', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async edit_needed_tasks(data) {
    let devolution
    if (data.edited_tasks_needed.added_tasks_needed ) {
      let update = {
        $addToSet: {
          needed_tasks: {
            $each: data.edited_tasks_needed.added_tasks_needed
          }
        }
      }
      devolution = await this.emit_to_server('db.task.update', new UpdateObject(data.id, update));
      if (devolution.data.error) {
        devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_task_status', devolution.data.error);
        return await this.retorno(devolution.data);
      }
    };

    if (data.edited_tasks_needed.removed_tasks_needed) {
      let update = {
        $pull: {
          needed_tasks: {
            $in: data.edited_tasks_needed.removed_tasks_needed
          }
        }
      }
      devolution = await this.emit_to_server('db.task.update', new UpdateObject(data.id, update));
      if (devolution.data.error) {
        devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_task_status', devolution.data.error);
        return await this.retorno(devolution.data);
      }
    };
    return this.retorno(devolution.data);
  }

  public async complete_task(data){
    for(let i = 0; i < data.task.needed_tasks.length; i++){
      if(!data.task.needed_tasks[i].completed){
        return await Util.getErrorByLocale('pt-Br', 'task', 'not_all_completed');
      }
    }
    let update = {
      completed: true
    }
    let devolution = await this.emit_to_server('db.task.update', new UpdateObject(data.task.id, update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_task_completed', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async delete_task_by_id(data) {
    let devolution = await this.emit_to_server('db.task.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_task', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async add_task_in_sprint(data) {
    let query = {
      _id: data.sprint_id,
    };
    let update = {
      $addToSet: {
        sprint_tasks: data.task_id,
      }
    };
    let update_sprint = await this.emit_to_server('db.sprint.update', new UpdateObject(query, update));
    if (update_sprint.data.error) {
      update_sprint.data.error = await Util.getErrorByLocale('pt-Br', 'update_sprint', update_sprint.data.error);
      return await this.retorno(update_sprint.data);
    }
    return this.retorno(update_sprint.data)
  }

  public async add_task_in_history(data) {
    let query = {
      _id: data.history_id,
    };
    let update = {
      $addToSet: {
        sprint_tasks: data.task_id,
      }
    };
    let update_history = await this.emit_to_server('db.history.update', new UpdateObject(query, update));
    if (update_history.data.error) {
      update_history.data.error = await Util.getErrorByLocale('pt-Br', 'update_history', update_history.data.error);
      return await this.retorno(update_history.data);
    }
    return this.retorno(update_history.data)
  }

  public async add_team_member_in_task(data) {
    let query = {
      _id: data.task.id,
    };
    let update = {
      $addToSet: {
        task_responsibles: data.team_member_id,
      }
    };
    let update_task_team_members = await this.emit_to_server('db.task.update', new UpdateObject(query, update));
    if (update_task_team_members.data.error) {
      update_task_team_members.data.error = await Util.getErrorByLocale('pt-Br', 'update_task_team_members', update_task_team_members.data.error);
      return await this.retorno(update_task_team_members.data);
    }
    return this.retorno(update_task_team_members.data)
  }

  // TEAM MEMBER CRUD

  public async create_team_member(team_member) {
    let _id = new Types.ObjectId();
    let new_team_member = {
      _id: _id,
      id: _id,
      first_name: team_member.first_name,
      surname: team_member.surname,
      birthdate: team_member.birthdate,
      username: team_member.username,
      email: team_member.email,
      password: team_member.password,
      role: team_member.role,
      scrums: team_member.scrums
    }
    delete team_member.horary;
    let devolution = await this.emit_to_server('db.team_member.create', new_team_member);
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'create_team_member', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    await this.add_team_member_to_scrums(new_team_member.scrums, new_team_member);
    await this.create_horary_for_team_member(new_team_member.id);
    return this.retorno(devolution.data);
  }

  private async create_horary_for_team_member(team_member_id) {
    let current_date = new Date();
    let current_month = current_date.getMonth() + 1;
    let current_year = current_date.getFullYear();
    let _id = new Types.ObjectId();

    let horary = {
      _id: _id,
      team_member: team_member_id,
      month: current_month,
      year: current_year,
      worked_hours: 0,
      timetable: [],
      questions: []
    };

    let new_horary = await this.emit_to_server('db.horary.create', horary);
    if (new_horary.data.error) {
      new_horary.data.error = await Util.getErrorByLocale('pt-Br', 'create_horary', new_horary.data.error);
      return await this.retorno(new_horary.data);
    }

    new_horary = new_horary.data.success[0];

    let query = {_id: team_member_id};
    let update = {horary: new_horary.id};

    let devolution = await this.emit_to_server('db.team_member.update', new UpdateObject(query, update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async get_team_member_by_id(team_member_id) {
    let devolution = await this.emit_to_server('db.team_member.read', new QueryObject(team_member_id));
    return this.retorno(devolution.data);
  }

  public async get_timetable_by_team_member_id(team_member_id) {
    let populate = {
      path: "horary",
      select: "timetable",
    }
    let timetable = await this.emit_to_server('db.team_member.read', new QueryObject(team_member_id, "horary", populate));
    return this.retorno(timetable.data);
  }

  public async get_questions_by_team_member_id(team_member_id) {
      let populate = {
        path: "horary",
        select: "questions",
      }
      let questions = await this.emit_to_server('db.team_member.read', new QueryObject(team_member_id, "horary", populate));
      return this.retorno(questions.data);
    }

  public async edit_team_member(data) {
    let devolution = await this.emit_to_server('db.team_member.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async edit_team_member_scrums(data) {
    if (data.edited_team_member_scrums.added_scrums.length) {
      await this.add_team_member_to_scrums(data.edited_team_member_scrums.added_scrums, data.team_member);
      await this.add_scrums_to_team_member(data.edited_team_member_scrums.added_scrums, data.team_member);
    }
    ;
    if (data.edited_team_member_scrums.removed_scrums.length) {
      await this.remove_team_member_of_scrums(data.edited_team_member_scrums.removed_scrums, data.team_member);
      await this.remove_scrums_of_team_member(data.edited_team_member_scrums.removed_scrums, data.team_member);
    }
    ;

    return true;
  }

  private async add_team_member_to_scrums(added_scrums, team_member) {
    let query = {
      _id: {
        $in: added_scrums
      }
    };
    let update = {
      $addToSet: {
        scrum_team_members: team_member.id
      }
    };
    let update_scrum_team_members = await this.emit_to_server('db.scrum.update', new UpdateObject(query, update));
    if (update_scrum_team_members.data.error) {
      update_scrum_team_members.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrum_team_members', update_scrum_team_members.data.error);
      return await this.retorno(update_scrum_team_members.data);
    }
    return this.retorno(update_scrum_team_members.data)
  }

  private async add_scrums_to_team_member(added_scrums, team_member) {
    let query = {
      _id: team_member.id
    };
    let update = {
      $addToSet: {
        scrums: {
          $each: added_scrums
        }
      }
    };
    let update_team_member_scrums = await this.emit_to_server('db.team_member.update', new UpdateObject(query, update));
    if (update_team_member_scrums.data.error) {
      update_team_member_scrums.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member_scrums', update_team_member_scrums.data.error);
      return await this.retorno(update_team_member_scrums.data);
    }
    return this.retorno(update_team_member_scrums.data)
  }

  private async remove_scrums_of_team_member(removed_scrums, team_member) {
    let query = {
      _id: team_member.id
    };
    let update = {
      $pull: {
        scrums: {
          $in: removed_scrums
        }
      }
    };
    let update_team_member_scrums = await this.emit_to_server('db.team_member.update', new UpdateObject(query, update));
    if (update_team_member_scrums.data.error) {
      update_team_member_scrums.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member_scrums', update_team_member_scrums.data.error);
      return await this.retorno(update_team_member_scrums.data);
    }
    return this.retorno(update_team_member_scrums.data)
  }

  private async remove_team_member_of_scrums(removed_scrums, team_member) {
    let query = {
      _id: {
        $in: removed_scrums
      }
    };
    let update = {
      $pull: {
        scrum_team_members: team_member.id
      }
    };
    let update_scrums_team_member = await this.emit_to_server('db.scrum.update', new UpdateObject(query, update));
    if (update_scrums_team_member.data.error) {
      update_scrums_team_member.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrums_team_member', update_scrums_team_member.data.error);
      return await this.retorno(update_scrums_team_member.data);
    }
    return this.retorno(update_scrums_team_member.data)
  }

  public async delete_team_member_by_id(data) {
    let devolution = await this.emit_to_server('db.team_member.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  // JUSTIFICATION CRUD

  public async create_justification(data){
    let _id = new Types.ObjectId();
    let new_justification = {
      _id: _id,
      id: _id,
      date: data.date,
      description: data.description,
      minutes: data.minutes,
      team_member: data.team_member,
      add_minutes: data.add_minutes
    }
    let justification = await this.emit_to_server('db.justification.create', new_justification);
    if (justification.data.error) {
      justification.data.error = await Util.getErrorByLocale('pt-Br', 'create_justification', justification.data.error);
      return await this.retorno(justification.data);
    }
    let updated_worked_minutes;
    if(data.add_minutes){
      updated_worked_minutes = await this.increase_worked_minutes(justification);
    } else {
      updated_worked_minutes = await this.decrease_worked_minutes(justification);
    }

    await this.add_justification_to_horary(justification);

    if(updated_worked_minutes.success){
      return this.retorno(justification.data);
    } else {
      justification.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member_minutes', justification.data.error);
      return await this.retorno(justification.data);
    }
  }

  private async increase_worked_minutes(data){
    let justification_month = new Date(data._data.success[0].date).getMonth() + 1;
    let justification_year = new Date(data._data.success[0].date).getFullYear();
    let query = {
      month: justification_month,
      year: justification_year,
      team_member: data._data.success[0].team_member
    };
    let update = {
      $inc: {
        worked_minutes: data._data.success[0].minutes
      },
      $push: {
        justifications: data._data.success[0].id
      }
    }
    let devolution = await this.emit_to_server('db.horary.update', new UpdateObject(query, update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  private async decrease_worked_minutes(data){
    let justification_month = new Date(data._data.success[0].date).getMonth() + 1;
    let justification_year = new Date(data._data.success[0].date).getFullYear();
    let query = {
      month: justification_month,
      year: justification_year,
      team_member: data._data.success[0].team_member
    };
    let update = {
      $inc: {
        worked_minutes: - data._data.success[0].minutes
      }
    }
    let devolution = await this.emit_to_server('db.horary.update', new UpdateObject(query, update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  private async add_justification_to_horary(data){
    let justification_month = new Date(data._data.success[0].date).getMonth() + 1;
    let justification_year = new Date(data._data.success[0].date).getFullYear();
    let query = {
      month: justification_month,
      year: justification_year,
      team_member: data._data.success[0].team_member
    };
    let update = {
      $push: {
        justifications: data._data.success[0].id
      }
    };
    let devolution = await this.emit_to_server('db.horary.update', new UpdateObject(query, update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async get_justifications_by_team_member_id(data){
    let query = {
      team_member: data
    }
    let devolution = await this.emit_to_server('db.justification.read', new QueryObject(query));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'read_justifications', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async edit_justification(data) {

    if (data.current_justification.add_minutes && data.edited_justification.add_minutes) {
      await this.decrease_horary_worked_minutes(data.current_justification);
      await this.increase_horary_worked_minutes(data.edited_justification);
    }
    if (data.current_justification.add_minutes && !data.edited_justification.add_minutes){
      await this.decrease_horary_worked_minutes(data.current_justification);
      await this.decrease_horary_worked_minutes(data.edited_justification);
    }
    if(!data.current_justification.add_minutes && data.edited_justification.add_minutes){
        await this.increase_horary_worked_minutes(data.current_justification);
        await this.increase_horary_worked_minutes(data.edited_justification);
    }
    if(!data.current_justification.add_minutes && !data.edited_justification.add_minutes){
      await this.increase_horary_worked_minutes(data.current_justification);
      await this.decrease_horary_worked_minutes(data.edited_justification);
    }

    let update = {
        date: data.edited_justification.date,
        description: data.edited_justification.description,
        minutes: data.edited_justification.minutes,
        add_minutes: data.edited_justification.add_minutes
    }

    let devolution = await this.emit_to_server('db.justification.update', new UpdateObject(data.current_justification.id, update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_admin', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async delete_justification_by_id(data){
    if(data.justification.add_minutes){
      await this.decrease_horary_worked_minutes(data.justification);
    } else {
      await this.increase_horary_worked_minutes(data.justification);
    }
    let update = {
      removed: true
    }

    let devolution = await this.emit_to_server('db.justification.update', new UpdateObject(data.justification.id, update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  private async increase_horary_worked_minutes(data){
    let justification_month = new Date(data.date).getMonth() + 1;
    let justification_year = new Date(data.date).getFullYear();
    let query = {
      month: justification_month,
      year: justification_year,
      team_member: data.team_member
    };
    let update = {
      $inc: {
        worked_minutes: data.minutes
      },
      $push: {
        justifications: data.id
      }
    }
    let devolution = await this.emit_to_server('db.horary.update', new UpdateObject(query, update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  private async decrease_horary_worked_minutes(data){
    let justification_month = new Date(data.date).getMonth() + 1;
    let justification_year = new Date(data.date).getFullYear();
    let query = {
      month: justification_month,
      year: justification_year,
      team_member: data.team_member
    };
    let update = {
      $inc: {
        worked_minutes: - data.minutes
      }
    }
    let devolution = await this.emit_to_server('db.horary.update', new UpdateObject(query, update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  // ADMIN CRUD

  public async create_admin(admin) {
    let _id = new Types.ObjectId();
    let new_admin = {
      _id: _id,
      id: _id,
      first_name: admin.first_name,
      surname: admin.surname,
      birthdate: admin.birthdate,
      username: admin.username,
      role: admin.role,
      email: admin.email,
      password: admin.password,
      scrums: admin.scrums
    }
    let devolution = await this.emit_to_server('db.admin.create', new_admin);
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'create_admin', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    await this.add_admin_to_scrums(admin.scrums, admin);
    return this.retorno(devolution.data);
  }

  public async get_admin_by_id(admin_id) {
    let devolution = await this.emit_to_server('db.admin.read', new QueryObject(admin_id));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'read_admin', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async edit_admin(data) {
    let devolution = await this.emit_to_server('db.admin.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_admin', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async edit_admin_scrums(data) {
    if (data.edited_admin_scrums.added_scrums.length) {
      await this.add_admin_to_scrums(data.edited_admin_scrums.added_scrums, data.current_admin);
      await this.add_scrums_to_admin(data.edited_admin_scrums.added_scrums, data.current_admin);
    }
    ;
    if (data.edited_admin_scrums.removed_scrums.length) {
      await this.remove_admin_of_scrums(data.edited_admin_scrums.removed_scrums, data.current_admin);
      await this.remove_scrums_of_admin(data.edited_admin_scrums.removed_scrums, data.current_admin);
    }
    ;

    return true;
  }

  private async add_admin_to_scrums(added_scrums, admin) {
    let query = {
      _id: {
        $in: added_scrums
      }
    };
    let update = {
      $addToSet: {
        scrum_team_members: admin.id
      }
    };
    let update_scrum_admins = await this.emit_to_server('db.scrum.update', new UpdateObject(query, update));
    if (update_scrum_admins.data.error) {
      update_scrum_admins.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrum_admins', update_scrum_admins.data.error);
      return await this.retorno(update_scrum_admins.data);
    }
    return this.retorno(update_scrum_admins.data)
  }

  private async add_scrums_to_admin(added_scrums, admin) {
    let query = {
      _id: admin.id
    };
    let update = {
      $addToSet: {
        scrums: {
          $each: added_scrums
        }
      }
    };
    let update_admin_scrums = await this.emit_to_server('db.admin.update', new UpdateObject(query, update));
    if (update_admin_scrums.data.error) {
      update_admin_scrums.data.error = await Util.getErrorByLocale('pt-Br', 'update_admin_scrums', update_admin_scrums.data.error);
      return await this.retorno(update_admin_scrums.data);
    }
    return this.retorno(update_admin_scrums.data)
  }

  private async remove_scrums_of_admin(removed_scrums, admin) {
    let query = {
      _id: admin.id
    };
    let update = {
      $pull: {
        scrums: {
          $in: removed_scrums
        }
      }
    };
    let update_admin_scrums = await this.emit_to_server('db.admin.update', new UpdateObject(query, update));
    if (update_admin_scrums.data.error) {
      update_admin_scrums.data.error = await Util.getErrorByLocale('pt-Br', 'update_admin_scrums', update_admin_scrums.data.error);
      return await this.retorno(update_admin_scrums.data);
    }
    return this.retorno(update_admin_scrums.data)
  }

  private async remove_admin_of_scrums(removed_scrums, admin) {
    let query = {
      _id: {
        $in: removed_scrums
      }
    };
    let update = {
      $pull: {
        scrum_team_members: admin.id
      }
    };
    let update_scrums_admin = await this.emit_to_server('db.scrum.update', new UpdateObject(query, update));
    if (update_scrums_admin.data.error) {
      update_scrums_admin.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrums_admin', update_scrums_admin.data.error);
      return await this.retorno(update_scrums_admin.data);
    }
    return this.retorno(update_scrums_admin.data)
  }

  public async delete_admin_by_id(data) {
    let devolution = await this.emit_to_server('db.admin.update', new UpdateObject(data.id, data.update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_admin', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }
}