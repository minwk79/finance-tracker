const Goal = require('../models/Goal');
const goalsRouter = require('express').Router();

// return a goal by id
goalsRouter.get('/:goalId', async (req, res, next) => {
  try {
    const {goalId} = req.params;
    const goal = await Goal.findById(goalId);
    res.status(200).json(goal);
  } catch (error) {
    next(error);
  }
})

// update a goal
goalsRouter.patch('/:goalId', async (req, res, next) => {
  try {
    const {goalId} = req.params;
    const updatedGoal = await Goal.findByIdAndUpdate(goalId, req.body, { new: true});
    res.status(200).json(updatedGoal);
  } catch (error) {
    next(error);
  }
})

module.exports = goalsRouter;

