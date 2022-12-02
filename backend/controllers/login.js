const loginRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

loginRouter.post('/', async (req, res, next) => {
  try {
    const {username, password, rememberMe} = req.body;
    // check for username
    const userExists = await User.findOne({username});
    if (!userExists) {
      throw new Error('invalid user credential');
    } 
    // check for password
    const pwMatch = await bcrypt.compare(password, userExists.password);
    if (!pwMatch) {
      throw new Error('invalid user credential');
    }

    // verified user, assign jwt
    const payload = {
      username, 
      id: userExists._id
    }
    const token = rememberMe ? jwt.sign(payload, config.JWT_KEY) : jwt.sign(payload, config.JWT_KEY, {expiresIn: '3h'});
    res.status(200).json({...userExists.toObject(), token})
    // ref: https://stackoverflow.com/questions/48014504/es6-spread-operator-mongoose-result-copy
  } catch (error) {
    next(error);
  }
})

module.exports = loginRouter;