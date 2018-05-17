import {model, Schema} from "mongoose";
import {BaseSchema} from "../BaseSchema";
import * as path from "path";

const messages = require(path.resolve("util/messages.json")).task;
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
  task_name: {
    type: Schema.Types.String,
    trim: true,
    required: [true, messages.task_name.REQUIRED],
  },
  task_status: {
    type: Schema.Types.ObjectId,
    ref: 'status',
    required: [true, messages.task_status.REQUIRED]
  },
  task_artefact: {
    type: Schema.Types.String,
    trim: true,
    required: [true, messages.task_artefact.REQUIRED],
  },
  task_description: {
    type: Schema.Types.String,
    required: [true, messages.task_description.REQUIRED],
  },
  task_responsibles: {
    type:[{
      type: Schema.Types.ObjectId,
      ref: 'team_member'
    }]    ,
    required: [true, messages.task_responsibles.REQUIRED]
  },
  removed: {
    type: Schema.Types.Boolean,
    default: false
  },
}, BaseSchema), schema_options);

let TaskModel = model("task", schema);
export {TaskModel as Model};