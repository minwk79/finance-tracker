const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const monthlyTrackerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  month: {
    type: String, // format: 'yyyy-mm'
  },
  spendings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Spending'
    }
  ]

});

monthlyTrackerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})


module.exports = mongoose.model('MonthlyTracker', monthlyTrackerSchema);
