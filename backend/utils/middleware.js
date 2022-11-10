const jwt = require('jsonwebtoken');

const config = require('./config');

const unknownEndpoints = (request, response, next) => {
  response.send({message: "Oops 404!"});
}

const tokenExtractor = (request, response, next) => {
  // JWT will be in the format of 'Bearer ......'
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const authJwt = (request, response, next) => {
  const token = request.token;
  console.log('User Auth: token ', token);

  try {
    jwt.verify(token, config.JWT_KEY);
    next();
  } catch (error) {
    console.log(error);
    response.send({error: "invalid web token"});
  }
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({error: "Validation error"});
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({error: "invalid web token"});
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).send({error: "token expired"});
  } 
  return response.status(401).send({error: "oops something went wrong"});
  
}

module.exports = {
  unknownEndpoints,
  errorHandler,
  authJwt,
  tokenExtractor
}