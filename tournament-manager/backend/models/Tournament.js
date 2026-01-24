const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
  gameName: {
    type: String,
    required: true,
    trim: true
  },
  gameCover: String,
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  maxTeams: {
    type: Number,
    required: true,
    default: 16
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  status: {
    type: String,
    enum: ['planning', 'registration', 'active', 'completed', 'cancelled'],
    default: 'planning'
  },
  format: {
    type: String,
    enum: ['single-elimination', 'double-elimination', 'round-robin', 'swiss'],
    default: 'single-elimination'
  },
  prizePool: {
    type: Number,
    default: 0
  },
  prizes: [{
    position: String,
    reward: String
  }],
  rules: String,
  banner: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tournament', tournamentSchema);
