import {model, Schema} from "mongoose";
import {BaseSchema} from "../BaseSchema";
import * as path from "path";

const messages = require(path.resolve("util/messages.json")).status;
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
  status_name: {
    type: Schema.Types.String,
    trim: true,
    required: [true, messages.status_name.REQUIRED],
    unique: true,
  },
  previous_status: {
    type:[{
      type: Schema.Types.ObjectId,
      ref: 'status',
    }],
    default: [],
  },
  next_status: {
    type:[{
      type: Schema.Types.ObjectId,
      ref: 'status'
    }],
    completed: {
      type: Schema.Types.Boolean,
      default: false
    },
    default: []
  },
  removed: {
    type: Schema.Types.Boolean,
    default: false
  },
}, BaseSchema), schema_options);

let StatusModel = model("status", schema);
export {StatusModel as Model};