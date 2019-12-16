const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');

const graphqlRoutes = require('./routes/graphql');
const indexRoute = require('./routes/index');
const restRoutes = require('./routes/rest');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRoute);
app.use('/api/employees', restRoutes);
app.use('/graphql', graphqlRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  if (!err) {
    return next();
  }
  res.status(err.status || 500);
  res.send({message: err.message});
  return res;
});

module.exports = app;
