import {CommonHandler} from "./CommonHandler";
import {Util} from "../util/Util";
import {UpdateObject} from "./util_handler/UpdateObject";
import {QueryObject} from "./util_handler/QueryObject";
import {Types} from "mongoose";

export class TeamMemberHandler extends CommonHandler {

  //todo nao esta funcionando
  public async add_day_answers(data, loggedUser) {
    let current_date = new Date();
    let current_day = current_date.getDate();
    let current_month = current_date.getMonth();
    let current_year = current_date.getFullYear();

    if (current_month === loggedUser.horary.month && current_year === loggedUser.horary.year) {

      let exist = false;


      for (let i = 0; loggedUser.horary.questions.length > i; i++) {
        if (loggedUser.horary.questions[i].day === current_day) {
          exist = true;
        }
      }


      if (!exist) {
        let query = {
          __id: loggedUser.horary.id
        };
        let update = {
          $push: {
            questions: data.answers
          }
        };

        let devolution = await this.emit_to_server('db.horary.update', new UpdateObject(query, update));
        if (devolution.data.error) {
          devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
          return await this.retorno(devolution.data);
        }
        return this.retorno(devolution.data);

      } else {
        return
      }


    } else {
      let new_horary = await this.create_horary_for_team_member(loggedUser.id);
      let query = {
        _id: new_horary.data.id
      };
      let update = {
        $push: {
          questions: data.answers
        }
      }
      let devolution =  await this.emit_to_server('db.horary.update',  new UpdateObject(query, update));
      if (devolution.data.error) {
        devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
        return await this.retorno(devolution.data);
      }
      return this.retorno(devolution.data);
    };
  };

  private async create_horary_for_team_member(team_member_id){
    let current_date = new Date();
    let current_month = current_date.getMonth();
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

    // let query = {_id: team_member_id};
    let update = {horary: new_horary.id};
    let options = {
      new: true,
      runValidators: true,
      select: {
        createdAt: 0,
        updatedAt: 0
      }
    };

    let devolution = await this.emit_to_server('db.team_member.update', new UpdateObject(team_member_id, update, options));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  };

  // async update_horary(horary_data, loggedUser) {
  //
  //   let current_date = new Date();
  //   let team_member_current_horary = loggedUser.horary;
  //   let current_day = current_date.getDate();
  //   let current_month = current_date.getMonth();
  //   let current_year = current_date.getFullYear();
  //
  //   if(current_month === loggedUser.horary.month && current_year === loggedUser.horary.year){
  //     let query = {
  //       _id: loggedUser.horary.id
  //     };
  //     let timetable = {
  //       day: current_day,
  //       entry_time: current_date,
  //       exit_time: horary_data.timetable.exit_time
  //     };
  //     let questions = {
  //       day: current_day,
  //       question1: horary_data.questions.question1,
  //       question2: horary_data.questions.question2,
  //       question3: horary_data.questions.question3
  //     };
  //     let update = {
  //       $push: {
  //         timetable: timetable,
  //         questions: questions
  //       }
  //     };
  //     let devolution =  await this.emit_to_server('db.horary.update',  new UpdateObject(query, update));
  //     if (devolution.data.error) {
  //       devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
  //       return await this.retorno(devolution.data);
  //     }
  //     return this.retorno(devolution.data);
  //
  //   } else {
  //
  //     let new_horary_data = {
  //       team_member: horary_data.team_member,
  //       month: current_month,
  //       year: current_year,
  //       worked_hours:,
  //       timetable:[{
  //         day: current_day,
  //         entry_time: current_date,
  //         exit_time: horary_data.timetable.exit_time
  //       }],
  //       questions:[{
  //         day: current_day,
  //         question1: horary_data.questions.question1,
  //         question2: horary_data.questions.question2,
  //         question3: horary_data.questions.question3
  //       }]
  //     };
  //
  //     let query = {_id: loggedUser.id};
  //     let new_horary = await this.emit_to_server('db.horary.create', new_horary_data);
  //     if (new_horary.data.error) {
  //       new_horary.data.error = await Util.getErrorByLocale('pt-Br', 'create_horary', new_horary.data.error);
  //       return await this.retorno(new_horary.data);
  //     }
  //     new_horary = new_horary.data.success[0];
  //
  //     let update = {horary: new_horary.id};
  //     let devolution = await this.emit_to_server('db.team_member.update', new UpdateObject(query, update));
  //     if (devolution.data.error) {
  //       devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
  //       return await this.retorno(devolution.data);
  //     }
  //     return this.retorno({error: null, success: []});
  //   }
  //
  // }

  public async show_horaries(horaryId){
    let devolution = await this.emit_to_server('db.horary.read', new QueryObject(
      horaryId,
      'month timetable.day timetable.entry_time timetable.exit_time year'
      ));
    return this.retorno(devolution.data);
  }

  public async find_horary_by_year_and_month(horary_data, loggedUserId){
    let devolution = await this.emit_to_server('db.horary.read', new QueryObject(
      {
        team_member: loggedUserId,
        month: horary_data.month,
        year: horary_data.year
      },
      'month timetable.day timetable.entry_time timetable.exit_time year'
    ))
    return this.retorno(devolution.data);
  }

  public async show_questions_by_horary_id(horaryId){
    let devolution = await this.emit_to_server('db.horary.read', new QueryObject(
      horaryId,
      'questions.day questions.question1 questions.question2 questions.question3'
    ))
    return this.retorno(devolution.data);
  }

  public async show_scrums(loggedUser){
    let devolution = await this.emit_to_server('db.user.read', new QueryObject(
      loggedUser.id,
      'project_name scrum_description scrum_status',
      {
        path: 'scrums',
        select: 'project_name scrum_description scrum_status'
      }
    ));
    return this.retorno(devolution.data);
  }

  public async show_sprints_by_scrum(scrumId){
    let devolution = await this.emit_to_server('db.scrum.read', new QueryObject(
      scrumId,
      'scrum_sprints',
      {
        path: 'scrum_sprints',
          select: 'sprint_name sprint_beginning_date sprint_end_date sprint_tasks sprint_status'
      }
    ))
    return this.retorno(devolution.data);
  }

  public async show_histories_by_scrum(scrumId){
    let devolution = await this.emit_to_server('db.scrum.read', new QueryObject(
      scrumId,
      'scrum_history_backlog',
      {
        path: 'scrum_history_backlog',
        select: 'histories',
        populate: {
          path: 'histories',
          select: 'history_theme history_want_can',
        }
      }
    ))
    return this.retorno(devolution.data);
  }

  public async show_tasks_by_sprint(sprintId){
    let devolution = await this.emit_to_server('db.sprint.read', new QueryObject(
      sprintId,
      'sprint_tasks',
      {
        path: 'sprint_tasks',
        select: 'task_name task_status task_responsibles',
        populate: {
          path: 'task_status task_responsibles',
          select: 'status_name first_name',
        }
      }
    ))
    return this.retorno(devolution.data);
  }

}