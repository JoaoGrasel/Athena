import {model, Schema} from "mongoose";
import {BaseSchema} from "../BaseSchema";
import * as path from "path";

const messages = require(path.resolve("util/messages.json")).scrum;
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
  project_name: {
    type: Schema.Types.String,
    trim: true,
    required: [true, messages.project_name.REQUIRED],
    unique: true,
  },
  scrum_description: {
    type: Schema.Types.String,
    trim: true,
    required: false,
  },
  scrum_status: {
    type: Schema.Types.String,
    required: [true, messages.scrum_status.REQUIRED],
  },
  scrum_beginning_date: {
    type: Schema.Types.Date,
    required: [true, messages.scrum_beginning_date.REQUIRED],
  },
  scrum_end_date: {
    type: Schema.Types.Date,
    required: [true, messages.scrum_end_date.REQUIRED],
  },
  scrum_team_members:{
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'team_member'
    }],
    required: [true, messages.scrum_team_members.REQUIRED]
  },
  scrum_history_backlog: {
    type: Schema.Types.ObjectId,
    ref: 'history_backlog',
    required: [true, messages.scrum_history_backlog.REQUIRED],
  },
  scrum_sprint_duration: {
    type: Schema.Types.Number,
    required: [true, messages.scrum_sprint_duration.REQUIRED],
  },
  scrum_sprints: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'sprint'
    }],
    required: [true, messages.scrum_sprints.REQUIRED],
  },
  scrum_product_backlog: {
    type:[{
      type: Schema.Types.ObjectId,
      ref: 'task'
    }],
    required: [true, messages.scrum_product_backlog.REQUIRED],
  },
  removed: {
    type: Schema.Types.Boolean,
    default: false
  },
}, BaseSchema), schema_options);

let ScrumModel = model("scrum", schema);
export {ScrumModel as Model};