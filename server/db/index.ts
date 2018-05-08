import {User} from "./managers/User";
import {Admin} from './managers/Admin';
import {ManagerMap} from "../interfaces/ManagerMap";

/**
 * Inicia todos os managers.
 */
let managers: ManagerMap = {
  "user": new User(),
  "admin": new Admin(),
};

export {managers};