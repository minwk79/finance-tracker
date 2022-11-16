const MonthlyTracker = require('../models/MonthlyTracker');
const monthlyTrackersRouter = require('express').Router();

// return tracker by id
monthlyTrackersRouter.get('/:trackerId', async (req, res, next) => {
  try {
    const {trackerId} = req.params;
    // populate the return value
    const tracker = await MonthlyTracker.findById(trackerId).populate();
    res.status(200).json(tracker);
  } catch (error) {
    next(error);
  }
})

// return all trackers(array) for a user
monthlyTrackersRouter.get('/user/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params;
    // populate the return value
    const trackers = await MonthlyTracker.find({user: userId}).populate();
    res.status(200).json(trackers);
  } catch (error) {
    next(error);
  }
})

// update tracker 
monthlyTrackersRouter.patch('/:trackerId', async (req, res, next) => {
  try {
    const {trackerId} = req.params;
    const updatedTracker = await MonthlyTracker.findByIdAndUpdate(trackerId, req.body, {new: true});
    res.status(200).json(updatedTracker);
  } catch (error) {
    next(error);
  }
})


module.exports = monthlyTrackersRouter;