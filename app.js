var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var fileUpload = require('express-fileupload');
var cors = require('cors');

var index = require('./routes/index');
var authFacebook = require('./routes/authFacebook');

var app = express();
var http = require('http').createServer(app);
var io = require("socket.io").listen(http);

http.listen(8887);

io.on('connection', function (socket) {

    socket.on('join', function(data) {
        console.log('Id of connected user - ' + socket.id);
        console.log(JSON.parse(data));
    });

    socket.on('message', function (data) {
        const msg = JSON.parse(data);
        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', function () {
        console.log('Id of disconnected user - ' + socket.id);
    });
});


var corsOptions = {
    origin: ['http://localhost:4200'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};
app.use(cors(corsOptions));
app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());


app.use('/api', index);
app.use('/auth/facebook', authFacebook);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
