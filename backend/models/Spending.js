const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spendingSchema = new Schema({
  title: {
    type: String
  },
  type: {
    type: String,
    enum: [ 
      'housing', 
      'transportation', 
      'food', 
      'insurance-health', 
      'saving', 
      'personal-spending'
    ]
  },
  details: {
    type: String
  },
  amount: {
    type: Number
  },
  date: {
    type: String  // format: 'yyyy-mm-dd'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

spendingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Spending', spendingSchema);

