const Spending = require('../models/Spending');
const MonthlyTracker = require('../models/MonthlyTracker');
const User = require('../models/User');

const spendingsRouter = require('express').Router();


spendingsRouter.get('/:spendingId', async (req, res, next) => {
  try {
    const {spendingId} = req.params;
    const spending = await Spending.findById(spendingId);
    res.status(200).json(spending);
  } catch (error) {
    next(error);
  }
})

spendingsRouter.post('/', async (req, res, next) => {
  try {
    const {title, type, details, amount, user} = req.body;
    // Create a monthly tracker, if not exists already
    
    // date: 'yyyy-mm-dd' format
    const currentDate = new Date().toISOString().split('T')[0];
    const month = currentDate.substring(0, 7);
    const newSpending = new Spending({
      title,
      type,
      details,
      amount,
      user,
      date: currentDate
    })
    const createdSpending = await newSpending.save();

    // check if tracker for the month already exists
    let tracker;
    tracker = await MonthlyTracker.findOne({user, month});
    if (tracker) {
      // tracker exists, append it to spendings array
      tracker.spendings.push(createdSpending._id);
    } else {
      // tracker does not exist, create one and add to array
      tracker = new MonthlyTracker({
        user, 
        month,
        spendings: [createdSpending._id]
      });
      // add tracker to user's trackers array
      const spentUser = await User.findById(user);
      spentUser.trackers.push(tracker._id);
      await spentUser.save();

    }
    await tracker.save();

    res.status(201).json(createdSpending);
  } catch (error) {
    next(error);
  }
})

spendingsRouter.patch('/:spendingId', async (req, res, next) => {
  try {
    const {spendingId} = req.params;
    const updatedSpending = await Spending.findByIdAndUpdate(spendingId, req.body, {new: true});
    res.status(200).json(updatedSpending);
  } catch (error) {
    next(error);
  }
})

spendingsRouter.delete('/:spendingId', async (req, res, next) => {
  try {
    // identify the spending from one of the monthly trackers and delete
    const {spendingId} = req.params;
    const spending = await Spending.findById(spendingId);
    const month = spending.date.substring(0, 7);

    const user = await User.findById(spending.user);
    const tracker = await MonthlyTracker.findOne({user, month});

    if (!tracker) return new Error('cannot delete spending..');

    tracker.spendings = tracker.spendings.filter(id => id.toString() !== spendingId);
    await tracker.save();

    await Spending.findByIdAndDelete(spendingId);
    res.status(200).send({id: spendingId});
  } catch (error) {
    next(error);
  }
})

module.exports = spendingsRouter;