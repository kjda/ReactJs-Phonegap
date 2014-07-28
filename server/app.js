var models = require('./models');

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();


function setupRoutes(app, dir) {
  fs.readdirSync(dir).forEach(function(fileName) {
    if (fs.lstatSync(dir + '/' + fileName).isDirectory()) {
      setupRoutes(app, dir + '/' + fileName);
      return;
  }
  var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
  if (ext !== 'js') {
      return;
  }
  var name = fileName.substr(0, fileName.indexOf('.'));
  var module = require(dir + '/' + name);
  if ( !!module.injectRoutes ) {
      module.injectRoutes(app);
  }
});
}



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
 });

setupRoutes(app, './routes');

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.json(err.status, {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render(err.status, {
        message: err.message,
        error: {}
    });
});

module.exports = app;
