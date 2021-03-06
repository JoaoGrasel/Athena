import {model, Schema} from "mongoose";
import {BaseSchema} from "../BaseSchema";
import * as path from "path";

const messages = require(path.resolve("util/messages.json")).questions;
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

const Questions = new Schema(Object.assign({
  day: {
    type: Schema.Types.Number,
    trim: true,
  },
  question1: {
    type: Schema.Types.String,
    trim: true,
  },
  question2: {
    type: Schema.Types.String,
    trim: true,
  },
  question3: {
    type: Schema.Types.String,
    trim: true
  }
}), schema_options);

export default Questions;