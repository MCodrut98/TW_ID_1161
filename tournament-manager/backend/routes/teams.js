const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all teams (only own)
router.get('/', auth, async (req, res) => {
  try {
    const teams = await Team.find({ members: req.userId })
      .populate('captain', 'username email')
      .populate('members', 'username email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single team (only own)
router.get('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('captain')
      .populate('members')
      .populate('tournaments');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    const isMember = team.members.some((member) => member._id.toString() === req.userId);
    if (!isMember) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create team
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, logo } = req.body;
    
    const team = new Team({
      name,
      description,
      logo,
      captain: req.userId,
      members: [req.userId]
    });
    
    await team.save();
    await team.populate('captain');
    
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add member to team
router.post('/:id/members', auth, async (req, res) => {
  try {
    const { userId, identifier } = req.body;
    const team = await Team.findById(req.params.id);
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    if (team.captain.toString() !== req.userId) {
      return res.status(403).json({ error: 'Only captain can add members' });
    }
    
    let memberId = userId;
    if (!memberId && identifier) {
      const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }]
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      memberId = user._id.toString();
    }

    if (!memberId) {
      return res.status(400).json({ error: 'User identifier is required' });
    }

    if (!team.members.includes(memberId)) {
      team.members.push(memberId);
      await team.save();
    }
    
    await team.populate('members');
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove member from team (captain only)
router.delete('/:id/members/:memberId', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.captain.toString() !== req.userId) {
      return res.status(403).json({ error: 'Only captain can remove members' });
    }

    const memberId = req.params.memberId;
    team.members = team.members.filter((id) => id.toString() !== memberId);
    await team.save();

    await team.populate('members');
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update team stats (captain only)
router.put('/:id/stats', auth, async (req, res) => {
  try {
    const { wins, losses, draws } = req.body;
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.captain.toString() !== req.userId) {
      return res.status(403).json({ error: 'Only captain can update stats' });
    }

    team.stats.wins = Number.isFinite(wins) ? wins : team.stats.wins;
    team.stats.losses = Number.isFinite(losses) ? losses : team.stats.losses;
    team.stats.draws = Number.isFinite(draws) ? draws : team.stats.draws;
    team.stats.totalMatches = team.stats.wins + team.stats.losses + team.stats.draws;

    await team.save();
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete team (captain only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.captain.toString() !== req.userId) {
      return res.status(403).json({ error: 'Only captain can delete team' });
    }

    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
