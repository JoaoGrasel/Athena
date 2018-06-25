import {model, Schema} from "mongoose";
import {BaseSchema} from "../BaseSchema";
import * as path from "path";

const messages = require(path.resolve("util/messages.json")).timetable;
const config = require(path.resolve("config.json"));

let schema_options = {
  id: false,
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

const Timetable = new Schema(Object.assign({
  day: {
    type: Schema.Types.Number,
    trim: true,
  },
  entry_time: {
    type: Schema.Types.Date,
    trim: true,

  },
  real_exit_time: {
    type: Schema.Types.Date,
    trim: true,
    default: null
  },
  expected_exit_time: {
    type: Schema.Types.Date,
    trim: true,
    default: null
  },
}), schema_options);

export default Timetable;