import {CommonHandler} from "./CommonHandler";
import {Util} from "../util/Util";
import {UpdateObject} from "./util_handler/UpdateObject";
import {QueryObject} from "./util_handler/QueryObject";
import {Types} from "mongoose";

export class TeamMemberHandler extends CommonHandler {

  public async add_day_answers(data, loggedUser) {
    let current_date = new Date();
    let current_day = current_date.getDate();
    let current_month = current_date.getMonth();
    let current_year = current_date.getFullYear();
    let new_question = {
      question1: data.question1,
      question2: data.question2,
      question3:  data.question3,
      day: current_day
    }
    let horary_questions = await this.emit_to_server('db.horary.read', new QueryObject(
      loggedUser.horary,
      'questions'
    ))

    if (current_month === loggedUser.horary.month && current_year === loggedUser.horary.year) {

      let exist = false;


      for (let i = 0; horary_questions.data.success[0].questions.length > i; i++) {
        if (horary_questions.data.success[0].questions[i].day === current_day) {
          exist = true;
        }
      }



      if (!exist) {
        let update = {
          $push: {
            questions: new_question
          }
        };

        let devolution = await this.emit_to_server('db.horary.update', new UpdateObject(loggedUser.horary.id, update));
        if (devolution.data.error) {
          devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
          return await this.retorno(devolution.data);
        }
        return this.retorno(devolution.data);

      } else {
        return this.retorno({success: false, error: await Util.getErrorByLocale('pt-Br', 'horary', 'daily_questions_already_answered')})
      }


    } else {
      let new_horary = await this.create_horary_for_team_member(loggedUser.id);
      let query = {
        _id: new_horary.data[0].id
      };
      let update = {
        $push: {
          questions: new_question
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

    // let query = {_id: team_member_id};
    let update = {horary: new_horary.data.success[0].id};
    let options = {
      new: true,
      runValidators: true,
      select: {
        createdAt: 0,
        updatedAt: 0
      }
    };

    let updated_team_member = await this.emit_to_server('db.team_member.update', new UpdateObject(team_member_id, update, options));
    if (updated_team_member.data.error) {
      updated_team_member.data.error = await Util.getErrorByLocale('pt-Br', 'update_team_member', updated_team_member.data.error);
      return await this.retorno(updated_team_member.data);
    }
    return this.retorno(new_horary.data);
  };

  public async create_daily_timetable(data){
    let current_date = new Date();
    let current_day = current_date.getDate();
    let new_timetable = {
      day: current_day,
      entry_time: current_date
    }
    let update = {
      $push: {
        timetable: new_timetable
      }
    }
    let devolution =  await this.emit_to_server('db.horary.update',  new UpdateObject(data.horary.id, update));
    if (devolution.data.error) {
      devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
      return await this.retorno(devolution.data);
    }
    return this.retorno(devolution.data);
  }

  public async update_daily_exit_time(data, loggedUser){
    let current_date = new Date();
    let current_day = current_date.getDate();

    let horary_timetable = await this.emit_to_server('db.horary.read', new QueryObject(
      loggedUser.horary,
      'timetable'
    ))
    for (let i = 0; horary_timetable.data.success[0].timetable.length > i; i++) {
      if (horary_timetable.data.success[0].timetable[i].day === current_day) {
        if(horary_timetable.data.success[0].timetable[i].exit_time === null){
          horary_timetable.data.success[0].timetable[i].exit_time = data.exit_time;

          let update = {
            timetable: horary_timetable.data.success[0].timetable
          };

          let devolution =  await this.emit_to_server('db.horary.update',  new UpdateObject(loggedUser.horary, update));
          if (devolution.data.error) {
            devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
            return await this.retorno(devolution.data);
          }
          return this.retorno(devolution.data);
        }
      }
    }
  }

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