const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const auth = require('../middleware/auth');

// Get all matches (only own tournaments)
router.get('/', auth, async (req, res) => {
  try {
    const matches = await Match.find({})
      .populate({ path: 'tournament', match: { organizer: req.userId } })
      .populate('team1', 'name logo')
      .populate('team2', 'name logo')
      .populate('result.winner', 'name');
    res.json(matches.filter((m) => m.tournament));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tournament matches (only own tournament)
router.get('/tournament/:tournamentId', auth, async (req, res) => {
  try {
    const matches = await Match.find({ tournament: req.params.tournamentId })
      .populate({ path: 'tournament', match: { organizer: req.userId } })
      .populate('team1', 'name logo')
      .populate('team2', 'name logo')
      .sort({ round: 1 });
    res.json(matches.filter((m) => m.tournament));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create match
router.post('/', auth, async (req, res) => {
  try {
    const { tournament, team1, team2, scheduledDate, round } = req.body;
    
    const match = new Match({
      tournament,
      team1,
      team2,
      scheduledDate,
      round
    });
    
    await match.save();
    await match.populate(['team1', 'team2']);
    
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update match result
router.put('/:id', auth, async (req, res) => {
  try {
    const { status, result } = req.body;
    
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { status, result },
      { new: true }
    ).populate(['team1', 'team2']);
    
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
