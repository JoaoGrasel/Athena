import {CommonHandler} from "./CommonHandler";
import {QueryObject} from "./util_handler/QueryObject";

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

  //todo logica do edit scrum
  async edit_scrum(edited_scrum){

  }

}