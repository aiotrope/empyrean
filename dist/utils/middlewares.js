"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _logger = _interopRequireDefault(require("./logger"));
var stream = {
  write: function write(message) {
    return _logger.default.http(message);
  }
};
var skip = function skip() {
  var env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};
var loggingMiddleware = (0, _morgan.default)(':method :url :status :res[content-length] - :response-time ms', {
  stream: stream,
  skip: skip
});
var validateAuthObject = function validateAuthObject(schema) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
      var resource;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            resource = req.body;
            _context.prev = 1;
            _context.next = 4;
            return schema.validate(resource);
          case 4:
            next();
            _context.next = 11;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            _logger.default.error(_context.t0);
            res.status(400).json({
              error: _context.t0.errors.join(', ')
            });
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 7]]);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};
var endPoint404 = function endPoint404(req, res, next) {
  next((0, _httpErrors.default)(404));
};
var errorHandler = function errorHandler(error, req, res, next) {
  _logger.default.error(error.message);
  _logger.default.debug(error.errors);
  if (error.name === 'CastError') {
    return res.status(400).json({
      error: "".concat(error.name, ": invalid ").concat(error.path, " using ").concat(error.value)
    });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    });
  }
  if (error.name === 'NotFoundError') {
    return res.status(404).json({
      error: error.message
    });
  }
  if (error.name === 'MongoServerError') {
    return res.status(400).json({
      error: "duplicate username ".concat(req.body.username, " cannot be registered!")
    });
  }
  if (error.name === 'TypeError') {
    return res.status(400).json({
      error: error.message
    });
  }
  if (error.name === 'JsonWebTokenError' || error.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'unauthorize: token maybe incorrect or missing!'
    });
  }
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired!'
    });
  }
  if (error.message === 'Email already in use') {
    return res.status(403).json({
      error: error.message
    });
  }
  if (error.message === 'Invalid credentials') {
    return res.status(401).json({
      error: error.message
    });
  }
  next(error);
};
var middlewares = {
  loggingMiddleware: loggingMiddleware,
  endPoint404: endPoint404,
  errorHandler: errorHandler,
  validateAuthObject: validateAuthObject
};
var _default = middlewares;
exports.default = _default;