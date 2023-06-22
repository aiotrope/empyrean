"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signupSchema = exports.signinSchema = exports.createTodoSchema = void 0;
var yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable-next-line no-useless-escape */
var password_regex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
/* eslint-enable-next-line no-useless-escape */

var signupSchema = yup.object({
  email: yup.string().trim().required().email(),
  password: yup.string().min(8).matches(password_regex, 'Password is not strong enough')
}).required();
exports.signupSchema = signupSchema;
var signinSchema = yup.object({
  email: yup.string().trim().required().email(),
  password: yup.string().trim().required()
}).required();
exports.signinSchema = signinSchema;
var createTodoSchema = yup.object({
  items: yup.array().of(yup.string()).min(1).required()
}).required();
exports.createTodoSchema = createTodoSchema;