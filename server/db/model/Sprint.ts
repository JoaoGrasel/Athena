import {model, Schema} from "mongoose";
import {BaseSchema} from "../BaseSchema";
import * as path from "path";

const messages = require(path.resolve("util/messages.json")).sprint;
const config = require(path.resolve("config.json"));

let schema_options = {
  discriminatorKey: "type",
  timestamps: true,
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
  // http://mongoosejs.com/docs/guide.html#options
};


let schema = new Schema(Object.assign({
  sprint_beginning_date: {
    type: Schema.Types.Date,
    required: [true, messages.sprint_beginning_date.REQUIRED],
  },
  sprint_name: {
    type: Schema.Types.String,
    required: [true, messages.sprint_name.REQUIRED],
  },
  sprint_end_date: {
    type: Schema.Types.Date,
    required: [true, messages.sprint_end_date.REQUIRED]
  },
  sprint_tasks: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }],
    required: [true, messages.sprint_tasks.REQUIRED],
  },
  sprint_status: {
    type: Schema.Types.String,
    required: [true, messages.sprint_status.REQUIRED],
  },
  removed: {
    type: Schema.Types.Boolean,
    default: false
  },
}, BaseSchema), schema_options);

let SprintModel = model("sprint", schema);
export {SprintModel as Model};