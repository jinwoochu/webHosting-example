/* Note: using staging server url, remove .testing() for production
Using .testing() will overwrite the debug flag with true */
var LEX = require('letsencrypt-express');

// Change these two lines!
var DOMAIN = 'localhost';
var EMAIL = 'cjw0672@gmail.com';

// var lex = LEX.create({
//     configDir: require('os').homedir() + '/letsencrypt/etc'
//     , approveRegistration: function (hostname, approve) { // leave `null` to disable automatic registration
//         if (hostname === DOMAIN) { // Or check a database or list of allowed domains
//             approve(null, {
//                 domains: [DOMAIN]
//                 , email: EMAIL
//                 , agreeTos: true
//             });
//         }
//     }
// });

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();








// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// lex.onRequest = app;
//
// lex.listen([80], [443, 5001], function () {
//     var protocol = ('requestCert' in this) ? 'https': 'http';
//     console.log("Listening at " + protocol + '://localhost:' + this.address().port);
// });

app.listen(8000, function () {
  console.log("http://localhost:8000");
})



module.exports = app;
