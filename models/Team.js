const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  province: {
    type: String
  },
  stadium: {
    type: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Team = mongoose.model('team', TeamSchema);
