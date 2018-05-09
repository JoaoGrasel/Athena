import {model, Schema} from "mongoose";
import {BaseSchema} from "../BaseSchema";
import * as path from "path";
import Timetable from "../subSchemas/Timetable";
import Questions from "../subSchemas/Questions";

const messages = require(path.resolve("util/messages.json")).horary;
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
    ref: "TeamMember",
    trim: true,
    required: [true, messages.team_member.REQUIRED],
    unique: [true, messages.team_member.UNIQUE]
  },
  month: {
    type: Schema.Types.Number,
    trim: true,
    required: [true, messages.month.REQUIRED]
  },
  year: {
    type: Schema.Types.Number,
    trim: true,
    required: [true, messages.year.REQUIRED],
  },
  timetable: {
    type: [Timetable],
    required: [true, messages.timetable.REQUIRED],
    unique: true,
  },
  questions: {
    type: [Questions],
    required: [true, messages.questions.REQUIRED],
  },
  removed: {
    type: Schema.Types.Boolean,
    default: false
  },
}, BaseSchema), schema_options);

let HoraryModel = model("horary", schema);
export {HoraryModel as Model};