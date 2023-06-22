"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _todo = _interopRequireDefault(require("../models/todo"));
require('express-async-errors');
var createTodo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var currentUser, createOrUpdateUserTodos;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          currentUser = req.user;
          _context.prev = 1;
          _context.next = 4;
          return _todo.default.findOneAndUpdate({
            user: currentUser.id
          }, {
            $push: {
              items: {
                $each: req.body.items
              }
            }
          }, {
            new: true,
            upsert: true
          });
        case 4:
          createOrUpdateUserTodos = _context.sent;
          if (!createOrUpdateUserTodos) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(200).json(createOrUpdateUserTodos));
        case 7:
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          res.status(422).json({
            error: _context.t0.message
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 9]]);
  }));
  return function createTodo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var fetchAllTodos = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var allTodos;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _todo.default.find({}).populate('user', {
            id: 1,
            email: 1
          });
        case 3:
          allTodos = _context2.sent;
          if (!allTodos) {
            _context2.next = 8;
            break;
          }
          res.status(200).json(allTodos);
          _context2.next = 9;
          break;
        case 8:
          return _context2.abrupt("return", null);
        case 9:
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          res.status(422).json({
            error: _context2.t0.message
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return function fetchAllTodos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var _default = {
  createTodo: createTodo,
  fetchAllTodos: fetchAllTodos
};
exports.default = _default;