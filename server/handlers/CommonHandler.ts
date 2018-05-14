import {BasicHandler} from "./BasicHandler";

export class CommonHandler extends BasicHandler {

  logout() {
    console.log('Deslogar');
    return {
      success: true,
      data: null,
    }
  }

}