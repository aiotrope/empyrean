"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionStrategy = exports.jwtStrategy = exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("./config"));
var _passportJwt = require("passport-jwt");
var passportLocal = _interopRequireWildcard(require("passport-local"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _user = _interopRequireDefault(require("../models/user"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var options = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: _config.default.secret,
  passReqToCallback: true
};
//options.issuer = ???;
//options.audience = ???;

var jwtStrategy = function jwtStrategy(passport) {
  passport.use(new _passportJwt.Strategy(options, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, payload, done) {
      var user;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user.default.findOne({
              email: payload.email
            });
          case 2:
            user = _context.sent;
            if (!user) {
              _context.next = 6;
              break;
            }
            req.user = user; // current user Obj
            return _context.abrupt("return", done(null, user));
          case 6:
            return _context.abrupt("return", done(null, false));
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }()));
};
exports.jwtStrategy = jwtStrategy;
var sessionStrategy = function sessionStrategy(passport, getUserByEmail, getUserById) {
  var authenticateUser = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(email, password, done) {
      var user;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            user = getUserByEmail(email);
            if (!(user === null)) {
              _context2.next = 3;
              break;
            }
            return _context2.abrupt("return", done(null, false, {
              message: 'User not found!'
            }));
          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return _bcrypt.default.compare(password, user.password);
          case 6:
            if (!_context2.sent) {
              _context2.next = 10;
              break;
            }
            return _context2.abrupt("return", done(null, user));
          case 10:
            return _context2.abrupt("return", done(null, false, {
              message: 'Incorrect login credentials!'
            }));
          case 11:
            _context2.next = 16;
            break;
          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](3);
            return _context2.abrupt("return", done(_context2.t0));
          case 16:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[3, 13]]);
    }));
    return function authenticateUser(_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();
  var LocalStrategy = passportLocal.Strategy;
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, authenticateUser));
  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    return done(null, getUserById(id));
  });
};
exports.sessionStrategy = sessionStrategy;
var _default = jwtStrategy;
exports.default = _default;