const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  gameDateTime: {
    type: Date
  },
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'team'
  },
  visitingTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'team'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Game = mongoose.model('game', GameSchema);
