import {model, Schema} from "mongoose";
import {BaseSchema} from "../BaseSchema";
import * as path from "path";
import {Questions} from "inquirer";

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
    required: [true, messages.day.REQUIRED],
  },
  question1: {
    type: Schema.Types.String,
    trim: true,
    required: [true, messages.question1.REQUIRED],
  },
  question2: {
    type: Schema.Types.String,
    trim: true,
    required: [true, messages.question2.REQUIRED],
  },
  question3: {
    type: Schema.Types.String,
    trim: true,
    required: [true, messages.question3.REQUIRED],
  },
}), schema_options);

export default Questions;