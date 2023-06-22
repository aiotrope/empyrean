"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
var Users = new _mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  collection: 'users'
});
Users.virtual('id').get(function () {
  return this._id.toHexString();
});
var User = (0, _mongoose.model)('User', Users);
var _default = User;
exports.default = _default;