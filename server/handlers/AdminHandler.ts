import {CommonHandler} from "./CommonHandler";
import {QueryObject} from "./util_handler/QueryObject";
import {UpdateObject} from "./util_handler/UpdateObject";
import {Util} from "../util/Util";

export class AdminHandler extends CommonHandler {

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

  async edit_scrum(edited_scrum){

    let query = {_id: edited_scrum.id};
    let update = {scrum: edited_scrum};
    let update_scrum = await this.emit_to_server('db.scrum.update', new UpdateObject(query, update));
    if (update_scrum.data.error) {
      update_scrum.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrum', update_scrum.data.error);
      return await this.retorno(update_scrum.data);
    }
    let devolution = await this.emit_to_server('db.scrum.read', new QueryObject(edited_scrum.id));
    return this.retorno(devolution.data);
  }

  // async delete_scrum_by_id(scrumId){
  //   let query = {_id: scrumId};
  //   let removed = true;
  //   let update = {scrum: removed};
  //   let update_scrum = await this.emit_to_server('db.scrum.update', new UpdateObject(query, update));
  //   if (update_scrum.data.error) {
  //     update_scrum.data.error = await Util.getErrorByLocale('pt-Br', 'update_scrum', update_scrum.data.error);
  //     return await this.retorno(update_scrum.data);
  //   }
  //   let devolution = await this.emit_to_server('db.scrum.read', new QueryObject(scrumId));
  //   return this.retorno(devolution.data);
  // }



}