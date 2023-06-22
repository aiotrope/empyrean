"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtStrategy = exports.authenticateUserLocal = void 0;
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

var customFields = {
  usernameField: 'email',
  passwordField: 'password'
};
var LocalStrategy = passportLocal.Strategy;
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
var verifyAuthCredentialsCallback = function verifyAuthCredentialsCallback(email, password, done) {
  _user.default.findOne({
    email: email
  }).then(function (user) {
    if (!user) {
      return done(null, false, {
        message: 'Invalid credential'
      });
    } else {
      var isCorrectPassword = _bcrypt.default.compareSync(password, user.password);
      if (!isCorrectPassword) {
        return done(null, false, {
          message: 'Invalid credential'
        });
      } else {
        return done(null, user);
      }
    }
  });
};
var authenticateUserLocal = function authenticateUserLocal(passport) {
  passport.use(new LocalStrategy(customFields, verifyAuthCredentialsCallback));
  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    return _user.default.findById(id).then(function (user) {
      return done(null, user);
    }).catch(function (err) {
      return done(err);
    });
  });
};
exports.authenticateUserLocal = authenticateUserLocal;