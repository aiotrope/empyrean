"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
var TodoSchema = new _mongoose.Schema({
  items: [String],
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
TodoSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
var Todo = (0, _mongoose.model)('Todo', TodoSchema);
var _default = Todo;
exports.default = _default;