const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db/db');

const IndexController = require('./api/controllers/indexController');
const UtcController = require('./api/controllers/utcController');
const LocationsController = require('./api/controllers/locationsController');

const UTCService = require('./api/services/UTCService');

const app = express();

const utcService = UTCService(db);

const indexController = IndexController(db);
const utcController = UtcController(utcService);
const locationsController = LocationsController(db);

// all middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', indexController.index);

app.get('/utcs', utcController.index);
app.post('/utcs', utcController.save);
app.get('/utcs/:utcId', utcController.findOne);
app.patch('/utcs/:utcId', utcController.update);
app.delete('/utcs/:utcId', utcController.destroy);

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
