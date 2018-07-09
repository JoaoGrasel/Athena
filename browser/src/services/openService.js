import axios from 'axios';
import localForage from "localforage";
import LFM from "../utils/LocalForageManager";
import UserService from "./userService";
const countryCodes = {
  'BR': 'pt-Br',
  'US': 'en'
};

class OpenService {
  constructor() {

  }
  /**
   * @author Bernardo Schveitzer
   * Verifica as autorizações do usuário para entrar em uma rota.
   * @param destinyRoute
   * @returns {Promise<boolean>}
   */
  async checkUserAuthorization(destinyRoute){
    const user = await localForage.getItem(LFM.getKey('user'));

      if(user === null) return false;

      let userEntities = user.user.entities;
      for(let entityIndex = 0; entityIndex < userEntities.length; entityIndex++){
        if(userEntities[entityIndex].entity.name === destinyRoute.params.entityName){

          if(destinyRoute.name === "entity") return true;

          let userModules = userEntities[entityIndex].role.modules;
          for(let moduleIndex = 0; moduleIndex < userModules.length; moduleIndex++){
            if(userModules[moduleIndex].name === destinyRoute.name){
              return true;
            }
          }
        }
      }
      return false;
  }

}

export default new OpenService();