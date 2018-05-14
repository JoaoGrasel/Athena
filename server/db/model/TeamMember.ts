import * as path from "path";
import {Model as User} from "./User";
import {BaseSchema} from "../BaseSchema";
import {Schema, model} from "mongoose";

const messages = require(path.resolve("util/messages.json")).team_member;
const config = require(path.resolve("config.json"));


let schema_options = {
  toObject: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  minimize: true,
  timestamps: true
  // http://mongoosejs.com/docs/guide.html#options
};

//noinspection SpellCheckingInspection,JSNonASCIINames
let schema = new Schema(Object.assign({
  horary:{
    type: Schema.Types.ObjectId,
    ref: 'horary'
  }
}, BaseSchema), schema_options);

let discriminated = User.discriminator("team_member", schema);

let TeamMemberModel = model("team_member", discriminated.schema);
export {TeamMemberModel as Model};