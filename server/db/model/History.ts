import {model, Schema} from "mongoose";
import {BaseSchema} from "../BaseSchema";
import * as path from "path";

const messages = require(path.resolve("util/messages.json")).history;
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
  history_theme: {
    type: Schema.Types.String,
    trim: true,
    required: [true, messages.history_theme.REQUIRED],
    unique: true
  },
  history_like_one: {
    type: Schema.Types.String,
    required: [true, messages.history_like_one.REQUIRED]
  },
  history_want_can: {
    type: Schema.Types.String,
    required: [true, messages.history_want_can.REQUIRED],
  },
  history_need_to_do: {
    type: Schema.Types.String,
    required: [true, messages.history_need_to_do.REQUIRED],
  },
  history_tasks: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'task',
    }],
    required: [true, messages.history_tasks.REQUIRED]
  },
  removed: {
    type: Schema.Types.Boolean,
    default: false
  },
}, BaseSchema), schema_options);

let HistoryModel = model("history", schema);
export {HistoryModel as Model};