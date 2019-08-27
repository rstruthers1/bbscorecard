const mongoose = require('mongoose');

const PlayerOnTeamSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'player'
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'team'
  },
  birthDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = PlayerOnTeam = mongoose.model('playerOnTeam', PlayerOnTeamSchema);
