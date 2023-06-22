"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _config = _interopRequireDefault(require("./utils/config"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _passport = _interopRequireDefault(require("passport"));
var _expressFlash = _interopRequireDefault(require("express-flash"));
var _expressEjsLayouts = _interopRequireDefault(require("express-ejs-layouts"));
var _db = _interopRequireDefault(require("./utils/db"));
var _middlewares = _interopRequireDefault(require("./utils/middlewares"));
var _logger = _interopRequireDefault(require("./utils/logger"));
var _passport2 = require("./utils/passport");
var _index = _interopRequireDefault(require("./routes/index"));
var _user = _interopRequireDefault(require("./routes/user"));
var _todo = _interopRequireDefault(require("./routes/todo"));
var app = (0, _express.default)();
(0, _db.default)();
(0, _passport2.jwtStrategy)(_passport.default);
(0, _passport2.authenticateUserLocal)(_passport.default);
app.set('views', _path.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(_expressEjsLayouts.default);
app.use(_express.default.static(_path.default.join(__dirname, '../public')));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use((0, _cors.default)());
app.use((0, _expressFlash.default)());
app.use((0, _expressSession.default)({
  secret: _config.default.session_secret,
  resave: false,
  saveUninitialized: false
}));
app.use(_passport.default.initialize());
app.use(_passport.default.session());
app.use((0, _helmet.default)({
  contentSecurityPolicy: {
    directives: {
      /* eslint-disable-next-line quotes */
      'script-src': ["'self'"]
      /* eslint-enable-next-line quotes */
    }
  }
}));

app.use(_middlewares.default.loggingMiddleware);
app.use('/', _index.default);
app.use('/api', _user.default);
app.use('/api', _todo.default);
app.use(_middlewares.default.endPoint404);
app.use(_middlewares.default.errorHandler);
app.listen(_config.default.port, function () {
  _logger.default.http("Server is running on port ".concat(_config.default.port));
});