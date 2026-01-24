const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  igdbId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  cover: String,
  platforms: [String],
  genres: [String],
  releaseDate: Date,
  esportPopular: {
    type: Boolean,
    default: false
  },
  tournaments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament'
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema);
