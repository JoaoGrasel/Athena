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
  description: {
    type: Schema.Types.String,
    trim: true,
    required: false,
  },
  status: {
    type: Schema.Types.String,
    required: [true, messages.status.REQUIRED],
  },
  beginning_date: {
    type: Schema.Types.String,
    required: [true, messages.beginning_date.REQUIRED],
  },
  end_date: {
    type: Schema.Types.String,
    required: [true, messages.end_date.REQUIRED],
  },
  members:{
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'TeamMember'
    }]
  },
  history: {
    type: Schema.Types.ObjectId,
    ref: 'HistoryBacklog',
    required: [true, messages.history_backlog.REQUIRED],
  },
  removed: {
    type: Schema.Types.Boolean,
    default: false
  },
}, BaseSchema), schema_options);

let ScrumModel = model("scrum", schema);
export {ScrumModel as Model};