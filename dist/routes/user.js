"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _user = _interopRequireDefault(require("../controllers/user"));
var _middlewares = _interopRequireDefault(require("../utils/middlewares"));
var _validators = require("../utils/validators");
var router = _express.default.Router();
router.post('/user/register', _middlewares.default.validateAuthObject(_validators.signupSchema), _user.default.signup);
router.post('/user/login', _middlewares.default.validateAuthObject(_validators.signinSchema), _user.default.signin);
router.get('/private', _passport.default.authenticate('jwt', {
  session: false
}), _user.default.privateRoute);
var _default = router;
exports.default = _default;