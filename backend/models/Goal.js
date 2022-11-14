const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  monthly: {
    type: Number
  },
  weekly: {
    type: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

goalSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Goal', goalSchema);