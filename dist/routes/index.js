"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _middlewares = _interopRequireDefault(require("../utils/middlewares"));
var _user = _interopRequireDefault(require("../controllers/user"));
var router = _express.default.Router();
router.get('/register.html', _middlewares.default.preAuthMiddleware, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          res.render('register', {
            title: 'Empyrean | Registration',
            subTitle: 'Registration page'
          });
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/register.html', _middlewares.default.preAuthMiddleware, _user.default.signup);
router.get('/login.html', _middlewares.default.preAuthMiddleware, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          res.render('login', {
            title: 'Empyrean | login',
            subTitle: 'Login page'
          });
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/login.html', _middlewares.default.preAuthMiddleware, _passport.default.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login.html',
  failureFlash: true
}), _user.default.signin);
router.get('', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          res.render('index', {
            title: 'Empyrean',
            subTitle: 'Home page'
          });
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;