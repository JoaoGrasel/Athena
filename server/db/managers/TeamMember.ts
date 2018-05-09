import {User} from "./User";
import {Model} from "../model/TeamMember";

export class TeamMember extends User {
  wire_custom_listeners() {
    super.wire_custom_listeners();
  }

  get model() {
    return Model;
  }

  get event_name() {
    return 'team_member';
  }
}