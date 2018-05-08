import {BasicHandler} from "./BasicHandler";

export class CommonHandler extends BasicHandler {

  logout() {
    console.log('desolgar');
    return {
      success: true,
      data: null,
    }
  }

}