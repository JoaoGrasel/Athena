import {CommonHandler} from "./CommonHandler";
import {Util} from "../util/Util";
import {TeamMember} from "../interfaces/TeamMember";
import {UpdateObject} from "./util_handler/UpdateObject";

export class TeamMemberHandler extends CommonHandler {

  async update_horary(horary_data, loggedUser) {

    let current_date = new Date();
    let team_member_current_horary = loggedUser.horary;
    let current_day = current_date.getDate();
    let current_month = current_date.getMonth();
    let current_year = current_date.getFullYear();

    if(current_month === loggedUser.horary.month && current_year === loggedUser.horary.year){
      let query = {
        _id: loggedUser.horary.id
      };
      let timetable = {
        day: current_day,
        entry_time: current_date,
        exit_time: horary_data.timetable.exit_time
      };
      let questions = {
        day: current_day,
        question1: horary_data.questions.question1,
        question2: horary_data.questions.question2,
        question3: horary_data.questions.question3
      };
      let update = {
        $push: {
          timetable: timetable,
          questions: questions
        }
      };
      let devolution =  await this.emit_to_server('db.horary.update',  new UpdateObject(query, update));
      if (devolution.data.error) {
        devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
        return await this.retorno(devolution.data);
      }
      return this.retorno(devolution.data);

    } else {

      let new_horary_data = {
        team_member: horary_data.team_member,
        month: current_month,
        year: current_year,
        timetable:[{
          day: current_day,
          entry_time: current_date,
          exit_time: horary_data.timetable.exit_time
        }],
        questions:[{
          day: current_day,
          question1: horary_data.questions.question1,
          question2: horary_data.questions.question2,
          question3: horary_data.questions.question3
        }]
      };

      let query = {_id: loggedUser.id};
      let new_horary = await this.emit_to_server('db.horary.create', new_horary_data);
      if (new_horary.data.error) {
        new_horary.data.error = await Util.getErrorByLocale('pt-Br', 'create_horary', new_horary.data.error);
        return await this.retorno(new_horary.data);
      }
      new_horary = new_horary.data.success[0];

      let update = {horary: new_horary.id};
      let devolution = await this.emit_to_server('db.team_member.update', new UpdateObject(query, update));
      if (devolution.data.error) {
        devolution.data.error = await Util.getErrorByLocale('pt-Br', 'update_horary', devolution.data.error);
        return await this.retorno(devolution.data);
      }
      return this.retorno({error: null, success: []});
    }

  }

  async show_all_histories(loggedUser){
    let histories

  }
}