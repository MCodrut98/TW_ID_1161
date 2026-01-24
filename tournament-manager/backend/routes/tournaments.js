const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const Team = require('../models/Team');
const auth = require('../middleware/auth');

// Get all tournaments (only own)
router.get('/', auth, async (req, res) => {
  try {
    const tournaments = await Tournament.find({ organizer: req.userId })
      .populate('game')
      .populate('organizer', 'username email')
      .populate('teams');
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single tournament (only own)
router.get('/:id', auth, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('game')
      .populate('organizer')
      .populate('teams');
    
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    const organizerId = (tournament.organizer && tournament.organizer._id)
      ? tournament.organizer._id.toString()
      : tournament.organizer.toString();
    if (organizerId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create tournament
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, game, gameName, gameCover, startDate, endDate, maxTeams, format } = req.body;

    const gameIsObjectId = game && require('mongoose').Types.ObjectId.isValid(game);
    const tournament = new Tournament({
      name,
      description,
      game: gameIsObjectId ? game : undefined,
      gameName: gameIsObjectId ? gameName : (gameName || game),
      gameCover,
      organizer: req.userId,
      startDate,
      endDate,
      maxTeams,
      format
    });
    
    await tournament.save();
    await tournament.populate('game');
    
    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update tournament
router.put('/:id', auth, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    const organizerId = (tournament.organizer && tournament.organizer._id)
      ? tournament.organizer._id.toString()
      : tournament.organizer.toString();
    if (organizerId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    const updates = { ...req.body };
    if (typeof updates.game === 'string') {
      const originalGame = updates.game;
      const gameIsObjectId = require('mongoose').Types.ObjectId.isValid(originalGame);
      updates.game = gameIsObjectId ? originalGame : undefined;
      updates.gameName = gameIsObjectId ? updates.gameName : (updates.gameName || originalGame);
    }
    const updated = await Tournament.findByIdAndUpdate(req.params.id, updates, { new: true });
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete tournament
router.delete('/:id', auth, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    
    const organizerId = (tournament.organizer && tournament.organizer._id)
      ? tournament.organizer._id.toString()
      : tournament.organizer.toString();
    if (organizerId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await Tournament.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tournament deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add team to tournament (organizer only)
router.post('/:id/teams', auth, async (req, res) => {
  try {
    const { teamId } = req.body;
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    const organizerId = (tournament.organizer && tournament.organizer._id)
      ? tournament.organizer._id.toString()
      : tournament.organizer.toString();
    if (organizerId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.captain.toString() !== req.userId) {
      return res.status(403).json({ error: 'Only your teams can be added' });
    }

    if (!tournament.teams.includes(team._id)) {
      tournament.teams.push(team._id);
      await tournament.save();
    }

    if (!team.tournaments.includes(tournament._id)) {
      team.tournaments.push(tournament._id);
      await team.save();
    }

    await tournament.populate('teams');
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove team from tournament (organizer only)
router.delete('/:id/teams/:teamId', auth, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    const organizerId = (tournament.organizer && tournament.organizer._id)
      ? tournament.organizer._id.toString()
      : tournament.organizer.toString();
    if (organizerId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const teamId = req.params.teamId;
    tournament.teams = tournament.teams.filter((id) => id.toString() !== teamId);
    await tournament.save();

    await Team.findByIdAndUpdate(teamId, {
      $pull: { tournaments: tournament._id }
    });

    await tournament.populate('teams');
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
