import {model, Schema} from "mongoose";
import {BaseSchema} from "../BaseSchema";
import * as path from "path";
import Timetable from "../subSchemas/Timetable";
import Questions from "../subSchemas/Questions";

const messages = require(path.resolve("util/messages.json")).justification;
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
  team_member: {
    type: Schema.Types.ObjectId,
    ref: "team_member",
    trim: true,
    required: [true, messages.team_member.REQUIRED],
  },
  minutes: {
    type: Schema.Types.Number,
    trim: true,
    required: [true, messages.minutes.REQUIRED]
  },
  date: {
    type: Schema.Types.Date,
    trim: true,
    required: [true, messages.date.REQUIRED],
  },
  description: {
    type: Schema.Types.String,
    required: [true, messages.description.REQUIRED]
  },
  removed: {
    type: Schema.Types.Boolean,
    default: false
  },
}, BaseSchema), schema_options);

let JustificationModel = model("justification", schema);
export {JustificationModel as Model};