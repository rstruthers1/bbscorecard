const mongoose = require('mongoose');

const LeagueSchema = new mongoose.Schema({
  name: {
    type: String
  },
  seasonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'season'
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

module.exports = League = mongoose.model('league', LeagueSchema);
