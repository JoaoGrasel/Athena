import {BasicManager} from "../BasicManager";
import {Model} from "../model/Scrum";
import * as path from "path";
const messages = require(path.resolve("util/messages.json")).srum;

export class Scrum extends BasicManager {
  wire_custom_listeners() {}

  async afterCreate(data: any[]) {
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].toJSON();
      delete data[i].createdAt;
      delete data[i].password;
      delete data[i].removed;
      delete data[i].updatedAt;
    }

    return data;
  }

  get model() {
    return Model;
  }

  get event_name() {
    return 'scrum';
  }
}