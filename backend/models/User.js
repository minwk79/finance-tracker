const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minLength: 4,
    required: true
  },
  goal: {
    type: Schema.Types.ObjectId,
    ref: 'Goal'
  },
  trackers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MonthlyTracker'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})


module.exports = mongoose.model('User', userSchema);