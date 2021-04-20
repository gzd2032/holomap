const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const knex = require('knex');
const knexfile = require('./knexfile');

const db = knex(knexfile[process.env.NODE_ENV || 'development']);

const IndexController = require('./routes/indexController');
const UtcController = require('./routes/utcController');
const LocationsController = require('./routes/locationsController');

const app = express();

const indexController = IndexController(db);
const utcController = UtcController(db);
const locationsController = LocationsController(db);

// all middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', indexController.index);
app.get('/utcs', utcController.index);
app.get('/locations', locationsController.index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
