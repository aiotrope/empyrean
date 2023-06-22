"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _todo = _interopRequireDefault(require("../controllers/todo"));
var _middlewares = _interopRequireDefault(require("../utils/middlewares"));
var _validators = require("../utils/validators");
var router = _express.default.Router();
router.post('/todos', _middlewares.default.validateAuthObject(_validators.createTodoSchema), _passport.default.authenticate('jwt', {
  session: false
}), _todo.default.createTodo);
router.get('/todos', _passport.default.authenticate('jwt', {
  session: false
}), _todo.default.fetchAllTodos);
var _default = router;
exports.default = _default;