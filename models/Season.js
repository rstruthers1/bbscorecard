const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  leagues: [ {type : mongoose.Schema.ObjectId, ref : 'league'} ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Season = mongoose.model('season', SeasonSchema);
