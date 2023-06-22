"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv.default.config();
var PORT = process.env.PORT || 3000;
var MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/testdb';
var BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
var JWT_KEY = process.env.SECRET || 'Q?=R=%%YC?oOU://Tim&&7HIP33*n';
var SESSION_SECRET = process.env.SESSION_SECRET || 'WAqer16//&&***aggiP';
var config = {
  port: PORT,
  base_url: BASE_URL,
  mongo_url: MONGO_URL,
  secret: JWT_KEY,
  session_secret: SESSION_SECRET
};
var _default = config;
exports.default = _default;