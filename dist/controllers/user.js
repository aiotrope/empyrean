"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("../utils/config"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = _interopRequireDefault(require("../models/user"));
require('express-async-errors');
var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var _req$body, email, password, foundUser, saltRounds, hashed, newUser, response;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return _user.default.findOne({
            email: email
          });
        case 4:
          foundUser = _context.sent;
          if (!foundUser) {
            _context.next = 7;
            break;
          }
          throw Error('Email already in use');
        case 7:
          saltRounds = 10;
          _context.next = 10;
          return _bcrypt.default.hash(password, saltRounds);
        case 10:
          hashed = _context.sent;
          newUser = new _user.default({
            email: email,
            password: hashed
          });
          _context.next = 14;
          return _user.default.create(newUser);
        case 14:
          response = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            id: response.id,
            email: response.email
          }));
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          res.status(403).json({
            error: _context.t0.message
          });
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 18]]);
  }));
  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var signin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var _req$body2, email, password, user, correctPassword, payload, token;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return _user.default.findOne({
            email: email
          });
        case 4:
          user = _context2.sent;
          if (!(user === null)) {
            _context2.next = 9;
            break;
          }
          _context2.t0 = false;
          _context2.next = 12;
          break;
        case 9:
          _context2.next = 11;
          return _bcrypt.default.compare(password, user.password);
        case 11:
          _context2.t0 = _context2.sent;
        case 12:
          correctPassword = _context2.t0;
          if (user && correctPassword) {
            _context2.next = 15;
            break;
          }
          throw Error('Invalid credentials');
        case 15:
          payload = {
            email: user.email,
            id: user.id
          };
          token = _jsonwebtoken.default.sign(payload, _config.default.secret, {
            expiresIn: '1h'
          });
          res.status(200).json({
            success: true,
            token: token,
            email: payload.email
          });
          _context2.next = 23;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t1 = _context2["catch"](1);
          res.status(400).json({
            error: _context2.t1.message
          });
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 20]]);
  }));
  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var privateRoute = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var currentUser;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          try {
            currentUser = req.user;
            res.status(200).json({
              email: currentUser.email
            });
          } catch (err) {
            res.status(422).json({
              error: err.message
            });
          }
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function privateRoute(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var _default = {
  signup: signup,
  signin: signin,
  privateRoute: privateRoute
};
exports.default = _default;