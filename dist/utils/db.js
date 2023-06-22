"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("./config.js"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _logger = _interopRequireDefault(require("./logger.js"));
var opts = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};
var MongoDatabase = function MongoDatabase() {
  _mongoose.default.set('strictQuery', false);
  var dbURL = _config.default.mongo_url;
  _mongoose.default.connect(dbURL, opts);
  var conn = _mongoose.default.connection;
  conn.once('open', function () {
    _logger.default.info("Database connected: ".concat(dbURL));
  });
  conn.on('error', function (error) {
    _logger.default.error("connection error: ".concat(error));
  });
};
var _default = MongoDatabase;
exports.default = _default;