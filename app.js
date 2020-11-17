var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//**************************************************
var session = require('express-session');
//**************************************************
var indexRouter = require('./routes/index');
var carrosRouter = require('./routes/carros');
var clientesRouter = require('./routes/clientes');
var fabricantesRouter = require('./routes/fabricantes');
var loginRouter = require('./routes/login');
var registrarseRouter = require('./routes/registrarse');
var logoutRouter = require('./routes/logout');

var app = express();
//**************************************************
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
//*************************************************
// Configuración de las vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/carros', carrosRouter);
app.use('/clientes', clientesRouter);
app.use('/fabricantes', fabricantesRouter);
app.use('/login', loginRouter);
app.use('/registrarse', registrarseRouter);
app.use('/logout', logoutRouter);
// manipulacion de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});
// Manejo de errores
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
