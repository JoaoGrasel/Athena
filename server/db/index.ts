import {User} from "./managers/User";
import {Admin} from './managers/Admin';
import {History} from './managers/History';
import {HistoryBacklog} from './managers/HistoryBacklog';
import {Horary} from './managers/Horary';
import {Scrum} from './managers/Scrum';
import {Sprint} from './managers/Sprint';
import {Status} from './managers/Status';
import {Task} from './managers/Task';
import {TeamMember} from './managers/TeamMember';
import {Justification} from './managers/Justification';

import {ManagerMap} from "../interfaces/ManagerMap";

/**
 * Inicia todos os managers.
 */
let managers: ManagerMap = {
  "user": new User(),
  "admin": new Admin(),
  "history": new History(),
  "history_backlog": new HistoryBacklog(),
  "horary": new Horary(),
  "scrum": new Scrum(),
  "sprint": new Sprint(),
  "status": new Status(),
  "task": new Task(),
  "team_member": new TeamMember(),
  "justification": new Justification(),

};

export {managers};