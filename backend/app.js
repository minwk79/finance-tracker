// imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const middleware = require('./utils/middleware');

const usersRouter = require('./controllers/users');

const app = express();

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log('connected to mongodb!');
  })
  .catch(err => {
    console.log(err);
  });

// middlewares
app.use(express.json());
app.use(cors());

app.use(middleware.tokenExtractor);


app.get('/', (request, response) => {
  response.send({ message: 'Hello from backend server!' });
});

// route handlers

app.use('/api/users', usersRouter);


// public assets
// app.use(express.static())

// unknown route(404), error handler
app.use(middleware.unknownEndpoints);
app.use(middleware.errorHandler);


module.exports = app;