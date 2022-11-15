const User = require('../models/User');
const Goal = require('../models/Goal');
const usersRouter = require('express').Router();

const config = require('../utils/config');
const bcrypt = require('bcrypt');

// return a single user by id
usersRouter.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
})

// return all users
usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
})

// sign up new user
usersRouter.post('/', async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
    // check for unique username
    const usernameExists = await User.find({username});
    if (!usernameExists) {
      res.status(400).send({error: "invalid username"});
    }
    // if valid, hash the password
    const hashed = await bcrypt.hash(password, Number(config.SALT));
    const newUser = new User({
      username,
      email,
      password: hashed
    });
    const createdUser = await newUser.save();

    // create a new goal model
    const goal = new Goal({
      monthly: 0,
      weekly: 0,
      user: createdUser._id
    })
    const createdGoal = await goal.save();
    // attach newly created goal to user
    createdUser.goal = createdGoal._id;
    await createdUser.save();
    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
})

// update user info
usersRouter.patch('/:userId', async (req, res, next) => {
  try {
    // TODO: need more validation
    // e.g.) should not be able to update username, password should be hashed, etc
    const {userId} = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true});
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
})

module.exports = usersRouter;